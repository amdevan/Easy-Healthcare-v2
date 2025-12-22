<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use App\Models\Media;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class ListMedia extends ListRecords
{
    protected static string $resource = MediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('import')
                ->label('Import from storage')
                ->color('primary')
                ->requiresConfirmation()
                ->action(function () {
                    $disk = 'public';
                    $dirs = ['media', 'pages/home/slider'];
                    $imported = 0;
                    foreach ($dirs as $dir) {
                        $files = Storage::disk($disk)->allFiles($dir);
                        foreach ($files as $path) {
                            // Only import typical image files
                            if (!preg_match('/\.(jpe?g|png|gif|webp)$/i', $path)) continue;
                            if (!Media::query()->where('file_path', $path)->exists()) {
                                Media::create([
                                    'file_path' => $path,
                                    'disk' => $disk,
                                    'alt_text' => basename($path),
                                    'caption' => null,
                                    'is_active' => true,
                                ]);
                                $imported++;
                            }
                        }
                    }
                    Notification::make()
                        ->title($imported > 0 ? "Imported {$imported} file(s)" : 'No new files found')
                        ->success()
                        ->send();
                    $this->redirect(MediaResource::getUrl('index'));
                }),
        ];
    }

    protected function getTableEmptyStateActions(): array
    {
        return [
            Actions\Action::make('import')
                ->label('Import from storage')
                ->color('primary')
                ->requiresConfirmation()
                ->action(function () {
                    $disk = 'public';
                    $dirs = ['media', 'pages/home/slider'];
                    $imported = 0;
                    foreach ($dirs as $dir) {
                        $files = Storage::disk($disk)->allFiles($dir);
                        foreach ($files as $path) {
                            if (!preg_match('/\.(jpe?g|png|gif|webp)$/i', $path)) continue;
                            if (!Media::query()->where('file_path', $path)->exists()) {
                                Media::create([
                                    'file_path' => $path,
                                    'disk' => $disk,
                                    'alt_text' => basename($path),
                                    'caption' => null,
                                    'is_active' => true,
                                ]);
                                $imported++;
                            }
                        }
                    }
                    Notification::make()
                        ->title($imported > 0 ? "Imported {$imported} file(s)" : 'No new files found')
                        ->success()
                        ->send();
                    $this->redirect(MediaResource::getUrl('index'));
                }),
        ];
    }
}
