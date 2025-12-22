<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Forms;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use ZipArchive;
use Carbon\Carbon;
use Filament\Notifications\Notification;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

class Backups extends Page
{
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-archive-box-arrow-down';

    protected string $view = 'filament.pages.backups';

    protected static ?string $navigationLabel = 'Full Backup';

    protected static ?string $title = 'System Maintenance';
    
    protected static ?string $slug = 'full-backup';

    protected static ?int $navigationSort = 1;
    
    public static function getNavigationGroup(): ?string
    {
        return 'System';
    }

    public static function canAccess(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('view_system') ?? false;
    }

    public function restoreAction(): Action
    {
        return Action::make('restore')
            ->label('Restore Backup')
            ->color('danger')
            ->icon('heroicon-o-arrow-path')
            ->requiresConfirmation()
            ->modalHeading('Restore System from Backup')
            ->modalDescription('WARNING: This will overwrite your current database and/or files depending on the backup content. This action cannot be undone. Please ensure you have a current backup before proceeding.')
            ->form([
                Forms\Components\FileUpload::make('backup_file')
                    ->label('Upload Backup Zip')
                    ->disk('local')
                    ->directory('temp-restores')
                    ->acceptedFileTypes(['application/zip', 'application/x-zip-compressed'])
                    ->maxSize(102400)
                    ->required(),
                Forms\Components\Checkbox::make('restore_database')
                    ->label('Restore Database (if present)')
                    ->default(true),
                Forms\Components\Checkbox::make('restore_files')
                    ->label('Restore Files (if present)')
                    ->default(true),
            ])
            ->action(function (array $data) {
                $this->processRestore($data);
            });
    }

    protected function processRestore(array $data)
    {
        $backupPath = storage_path('app/' . $data['backup_file']);
        
        if (!file_exists($backupPath)) {
            Notification::make()->title('Error')->body('Backup file not found.')->danger()->send();
            return;
        }

        $tempDir = storage_path('app/temp-restore-' . uniqid());
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $zip = new ZipArchive;
        if ($zip->open($backupPath) === TRUE) {
            $zip->extractTo($tempDir);
            $zip->close();
        } else {
            Notification::make()->title('Error')->body('Failed to open zip file.')->danger()->send();
            return;
        }

        // Restore Database
        if ($data['restore_database']) {
            $this->restoreDatabase($tempDir);
        }

        // Restore Files
        if ($data['restore_files']) {
            $this->restoreFiles($tempDir);
        }

        // Cleanup
        $this->recursiveRemoveDirectory($tempDir);
        unlink($backupPath);

        Notification::make()
            ->title('Restore Completed')
            ->body('System restore process finished.')
            ->success()
            ->send();
    }

    protected function restoreDatabase($tempDir)
    {
        $dbConfig = config('database.connections.' . config('database.default'));
        $driver = $dbConfig['driver'];

        // Look for common dump names
        $dumpFiles = [
            $tempDir . '/database.sql',
            $tempDir . '/database.sqlite',
            $tempDir . '/database.json',
        ];

        $foundDump = null;
        foreach ($dumpFiles as $file) {
            if (file_exists($file)) {
                $foundDump = $file;
                break;
            }
        }

        if (!$foundDump) {
            Notification::make()->title('Warning')->body('No database dump found in backup.')->warning()->send();
            return;
        }

        try {
            if ($driver === 'sqlite') {
                copy($foundDump, $dbConfig['database']);
            } elseif ($driver === 'mysql' && str_ends_with($foundDump, '.sql')) {
                // Determine mysql command path (reuse getMysqldumpPath logic effectively)
                $mysqlPath = str_replace('mysqldump', 'mysql', $this->getMysqldumpPath());
                
                $command = sprintf(
                    '%s --user=%s --password=%s --host=%s --port=%s %s < %s',
                    escapeshellarg($mysqlPath),
                    escapeshellarg($dbConfig['username']),
                    escapeshellarg($dbConfig['password']),
                    escapeshellarg($dbConfig['host']),
                    escapeshellarg($dbConfig['port']),
                    escapeshellarg($dbConfig['database']),
                    escapeshellarg($foundDump)
                );
                
                exec($command, $output, $returnVar);
                
                if ($returnVar !== 0) {
                    throw new \Exception('MySQL import failed.');
                }
            } else {
                 Notification::make()->title('Warning')->body('Automatic restore not supported for this driver/format.')->warning()->send();
            }
        } catch (\Exception $e) {
            Notification::make()->title('Error')->body('Database restore failed: ' . $e->getMessage())->danger()->send();
        }
    }

    protected function restoreFiles($tempDir)
    {
        $sourceStorage = $tempDir . '/storage';
        if (file_exists($sourceStorage)) {
            $destination = storage_path('app/public');
            
            // Simple copy implementation
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($sourceStorage, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::SELF_FIRST
            );
            
            foreach ($iterator as $item) {
                // $subPath = $iterator->getSubPathName(); // Linter error fix
                $subPath = substr($item->getRealPath(), strlen($sourceStorage) + 1);
                $destPath = $destination . '/' . $subPath;
                
                if ($item->isDir()) {
                    if (!file_exists($destPath)) {
                        mkdir($destPath);
                    }
                } else {
                    copy($item, $destPath);
                }
            }
        }
    }

    protected function recursiveRemoveDirectory($directory)
    {
        foreach (glob("{$directory}/*") as $file) {
            if (is_dir($file)) { 
                $this->recursiveRemoveDirectory($file);
            } else {
                unlink($file);
            }
        }
        rmdir($directory);
    }

    public function backupSystemAction(): Action
    {
        return Action::make('backupSystem')
            ->label('Full System Backup')
            ->size('md')
            ->color('primary')
            ->icon('heroicon-o-server-stack')
            ->action(fn () => $this->downloadFullBackup());
    }

    public function backupDatabaseAction(): Action
    {
        return Action::make('backupDatabase')
            ->label('Database Only')
            ->size('md')
            ->color('warning')
            ->icon('heroicon-o-circle-stack')
            ->action(fn () => $this->downloadDatabaseBackup());
    }

    public function backupFilesAction(): Action
    {
        return Action::make('backupFiles')
            ->label('Files Only')
            ->size('md')
            ->color('success')
            ->icon('heroicon-o-folder')
            ->action(fn () => $this->downloadFilesBackup());
    }

    protected function getMysqldumpPath(): string
    {
        // Check if mysqldump is in PATH
        $returnVal = null;
        $output = null;
        exec('mysqldump --version', $output, $returnVal);
        if ($returnVal === 0) {
            return 'mysqldump';
        }

        // Common paths to check
        $paths = [
            '/Applications/XAMPP/xamppfiles/bin/mysqldump',
            '/usr/local/mysql/bin/mysqldump',
            '/usr/local/bin/mysqldump',
            '/opt/homebrew/bin/mysqldump',
            '/Applications/MAMP/Library/bin/mysqldump',
        ];

        foreach ($paths as $path) {
            if (file_exists($path)) {
                return $path;
            }
        }

        return 'mysqldump'; // Fallback to default
    }

    protected function generateDbDump(string $tempDir): ?string
    {
        $dbConfig = config('database.connections.' . config('database.default'));
        $driver = $dbConfig['driver'];
        $dumpFile = null;

        try {
            if ($driver === 'sqlite') {
                $dumpFile = $tempDir . '/database.sqlite';
                copy($dbConfig['database'], $dumpFile);
            } elseif ($driver === 'mysql') {
                $dumpFile = $tempDir . '/database.sql';
                $mysqldumpPath = $this->getMysqldumpPath();
                
                // Try mysqldump
                $command = sprintf(
                    '%s --user=%s --password=%s --host=%s --port=%s %s > %s',
                    escapeshellarg($mysqldumpPath),
                    escapeshellarg($dbConfig['username']),
                    escapeshellarg($dbConfig['password']),
                    escapeshellarg($dbConfig['host']),
                    escapeshellarg($dbConfig['port']),
                    escapeshellarg($dbConfig['database']),
                    escapeshellarg($dumpFile)
                );
                
                exec($command, $output, $returnVar);
                
                if ($returnVar !== 0 || !file_exists($dumpFile) || filesize($dumpFile) === 0) {
                    // Fallback to JSON dump
                    $dumpFile = $tempDir . '/database.json';
                    $tables = DB::select('SHOW TABLES');
                    $data = [];
                    foreach ($tables as $table) {
                        $tableName = reset($table);
                        $data[$tableName] = DB::table($tableName)->get();
                    }
                    file_put_contents($dumpFile, json_encode($data, JSON_PRETTY_PRINT));
                }
            } else {
                 $dumpFile = $tempDir . '/database_fallback.json';
                 file_put_contents($dumpFile, json_encode(['error' => 'Driver not supported for full dump'], JSON_PRETTY_PRINT));
            }
        } catch (\Exception $e) {
            Notification::make()
                ->title('Database Backup Warning')
                ->body('Could not dump database: ' . $e->getMessage())
                ->warning()
                ->send();
            return null;
        }

        return $dumpFile;
    }

    protected function addFilesToZip(ZipArchive $zip, string $sourcePath, string $zipInternalPrefix = '')
    {
        if (!file_exists($sourcePath)) {
            return;
        }

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($sourcePath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                // Make relative path inside zip
                $relativePath = $zipInternalPrefix . substr($filePath, strlen($sourcePath) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }
    }

    public function downloadFullBackup()
    {
        if (!class_exists('ZipArchive')) {
            $this->showZipError();
            return;
        }

        $fileName = 'full-backup-' . Carbon::now()->format('Y-m-d-H-i-s') . '.zip';
        $tempDir = storage_path('app/temp-backups/' . uniqid());
        $zipPath = storage_path('app/' . $fileName);

        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $dumpFile = $this->generateDbDump($tempDir);

        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            // Add DB Dump
            if ($dumpFile && file_exists($dumpFile)) {
                $zip->addFile($dumpFile, basename($dumpFile));
            }

            // Add Public Storage
            $this->addFilesToZip($zip, storage_path('app/public'), 'storage/');
            
            $zip->close();
        } else {
            $this->showZipError();
            return;
        }

        // Cleanup
        if ($dumpFile && file_exists($dumpFile)) unlink($dumpFile);
        rmdir($tempDir);

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    public function downloadDatabaseBackup()
    {
        if (!class_exists('ZipArchive')) {
            $this->showZipError();
            return;
        }

        $fileName = 'db-backup-' . Carbon::now()->format('Y-m-d-H-i-s') . '.zip';
        $tempDir = storage_path('app/temp-backups/' . uniqid());
        $zipPath = storage_path('app/' . $fileName);

        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $dumpFile = $this->generateDbDump($tempDir);

        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            if ($dumpFile && file_exists($dumpFile)) {
                $zip->addFile($dumpFile, basename($dumpFile));
            }
            $zip->close();
        } else {
            $this->showZipError();
            return;
        }

        if ($dumpFile && file_exists($dumpFile)) unlink($dumpFile);
        rmdir($tempDir);

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    public function downloadFilesBackup()
    {
        if (!class_exists('ZipArchive')) {
            $this->showZipError();
            return;
        }

        $fileName = 'files-backup-' . Carbon::now()->format('Y-m-d-H-i-s') . '.zip';
        $zipPath = storage_path('app/' . $fileName);

        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $this->addFilesToZip($zip, storage_path('app/public'), 'storage/');
            $zip->close();
        } else {
            $this->showZipError();
            return;
        }

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    protected function showZipError()
    {
        Notification::make()
            ->title('Error')
            ->body('ZipArchive PHP extension is missing or zip creation failed.')
            ->danger()
            ->send();
    }
}
