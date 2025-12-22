<?php
/**
 * Easy Healthcare 101 - Modern Advanced Installer
 * 
 * A sleek, powerful installer to set up the application, fix issues, and configure the environment.
 */

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- Configuration & State ---
$step = $_GET['step'] ?? 1;
$action = $_GET['action'] ?? '';
$message = $_GET['message'] ?? '';
$error = $_GET['error'] ?? '';

// --- Helper Functions ---

function getBaseDir() {
    return dirname(__DIR__); // Assumes install.php is in /public, so parent is root
}

function envUpdate($key, $value) {
    $path = getBaseDir() . '/.env';
    if (!file_exists($path)) return false;

    $oldContent = file_get_contents($path);
    
    // Escape special characters if needed, though simple replacement is usually safer for .env
    // We will just do a direct match/replace logic
    if (preg_match("/^$key=/m", $oldContent)) {
        $newContent = preg_replace("/^$key=.*$/m", "$key=\"$value\"", $oldContent);
    } else {
        $newContent = $oldContent . "\n$key=\"$value\"";
    }
    
    return file_put_contents($path, $newContent) !== false;
}

// --- Content for Code Patches (Fixes 500 Error) ---

$patch_InquiriesTable = <<<'EOT'
<?php

namespace App\Filament\Resources\Inquiries\Tables;

use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class InquiriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('address')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('subject')
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'info',
                        'read' => 'warning',
                        'replied' => 'success',
                        default => 'gray',
                    }),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}
EOT;

$patch_RoleResource = <<<'EOT'
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoleResource\Pages;
use App\Models\Role;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Str;

class RoleResource extends Resource
{
    protected static ?string $model = Role::class;
    protected static ?string $navigationLabel = 'Roles';
    protected static ?string $modelLabel = 'Role';
    protected static ?string $pluralModelLabel = 'Roles';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Users/Roles';
    }

    public static function getPermissionOptions(): array
    {
        $resources = [
            'users', 'roles', 'patients', 'doctors', 'appointments',
            'prescriptions', 'lab_appointments', 'nemt_requests',
            'memberships', 'packages', 'media', 'pages',
            'ui_settings', 'board_members', 'testimonials',
            'articles', 'banners', 'specialties', 'payment_settings',
            'system', 'inquiries'
        ];
        $actions = ['view', 'create', 'edit', 'delete'];
        $options = [];
        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                $options["{$action}_{$resource}"] = ucfirst($action) . ' ' . ucwords(str_replace('_', ' ', $resource));
            }
        }
        return $options;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                ->maxLength(255),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(ignoreRecord: true)
                ->disabled(fn (?Role $record) => $record?->slug === 'admin')
                ->dehydrated()
                ->maxLength(255),
            Forms\Components\Textarea::make('description')
                ->rows(3)
                ->maxLength(1000)
                ->columnSpanFull(),
            Section::make('Permissions')
                ->description('Select the permissions for this role.')
                ->schema([
                    Forms\Components\CheckboxList::make('permissions')
                        ->label('')
                        ->options(self::getPermissionOptions())
                        ->columns(3)
                        ->searchable()
                        ->bulkToggleable()
                        ->columnSpanFull(),
                ])
                ->collapsible(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('description')->limit(50)->toggleable(isToggledHiddenByDefault: true),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->filters([])
            ->actions([
                EditAction::make(),
                DeleteAction::make()
                    ->hidden(fn (Role $record) => $record->slug === 'admin'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRoles::route('/'),
            'create' => Pages\CreateRole::route('/create'),
            'edit' => Pages\EditRole::route('/{record}/edit'),
        ];
    }
}
EOT;

// --- Action Handlers ---

if ($action === 'fix_permissions') {
    $dirs = [
        getBaseDir() . '/storage',
        getBaseDir() . '/storage/app',
        getBaseDir() . '/storage/app/public',
        getBaseDir() . '/storage/framework',
        getBaseDir() . '/storage/framework/views',
        getBaseDir() . '/storage/framework/sessions',
        getBaseDir() . '/storage/logs',
        getBaseDir() . '/bootstrap/cache',
    ];
    foreach ($dirs as $dir) {
        if (!file_exists($dir)) mkdir($dir, 0755, true);
        @chmod($dir, 0755);
    }
    header("Location: install.php?step=2&message=File+Permissions+Fixed+Successfully");
    exit;
}

if ($action === 'copy_env') {
    $example = getBaseDir() . '/.env.example';
    $target = getBaseDir() . '/.env';
    if (!file_exists($target) && file_exists($example)) {
        copy($example, $target);
        header("Location: install.php?step=2&message=Environment+File+Created");
    } else {
        header("Location: install.php?step=2&error=Could+not+create+.env+file.+Please+create+it+manually.");
    }
    exit;
}

if ($action === 'update_db') {
    envUpdate('DB_CONNECTION', 'mysql');
    envUpdate('DB_HOST', $_POST['host']);
    envUpdate('DB_DATABASE', $_POST['database']);
    envUpdate('DB_USERNAME', $_POST['username']);
    envUpdate('DB_PASSWORD', $_POST['password']);
    envUpdate('APP_URL', $_POST['app_url']);
    header("Location: install.php?step=3&message=Database+Configuration+Saved");
    exit;
}

if ($action === 'generate_key') {
    $key = 'base64:' . base64_encode(random_bytes(32));
    envUpdate('APP_KEY', $key);
    header("Location: install.php?step=4&message=Application+Key+Generated");
    exit;
}

if ($action === 'patch_code') {
    $path1 = getBaseDir() . '/app/Filament/Resources/Inquiries/Tables/InquiriesTable.php';
    if (file_exists(dirname($path1))) file_put_contents($path1, $patch_InquiriesTable);
    
    $path2 = getBaseDir() . '/app/Filament/Resources/RoleResource.php';
    if (file_exists(dirname($path2))) file_put_contents($path2, $patch_RoleResource);
    
    header("Location: install.php?step=4&message=Code+Fixed+Successfully");
    exit;
}

if ($action === 'symlink') {
    $target = getBaseDir() . '/storage/app/public';
    $link = __DIR__ . '/storage';
    
    if (file_exists($link) && !is_link($link)) {
        rename($link, $link . '_backup_' . time());
    }
    
    if (!file_exists($link)) {
        if (@symlink('../storage/app/public', $link)) {
            $msg = "Storage+Linked+Successfully";
        } elseif (@symlink($target, $link)) {
            $msg = "Storage+Linked+Successfully";
        } else {
            $msg = "Failed+to+create+link";
        }
    } else {
        $msg = "Link+already+exists";
    }
    header("Location: install.php?step=5&message=$msg");
    exit;
}

if ($action === 'save_config') {
    $name = $_POST['app_name'] ?? 'Easy Healthcare 101';
    envUpdate('APP_NAME', $name);
    header("Location: install.php?step=4&message=Application+Name+Updated");
    exit;
}


// --- Data Gathering ---

// Requirements
$phpOk = version_compare(phpversion(), '8.1.0', '>=');
$exts = ['pdo', 'openssl', 'mbstring', 'json'];
$extOk = true;
foreach ($exts as $e) if (!extension_loaded($e)) $extOk = false;

// Permissions
$permDirs = [
    'storage' => getBaseDir() . '/storage',
    'bootstrap/cache' => getBaseDir() . '/bootstrap/cache',
];
$permOk = true;
foreach ($permDirs as $p) if (!is_writable($p)) $permOk = false;

// DB & Env
$envExists = file_exists(getBaseDir() . '/.env');
$dbStatus = 'Unknown';
if ($envExists) {
    $env = file_get_contents(getBaseDir() . '/.env');
    preg_match('/DB_HOST=(.*)/', $env, $h);
    preg_match('/DB_DATABASE=(.*)/', $env, $d);
    preg_match('/DB_USERNAME=(.*)/', $env, $u);
    preg_match('/DB_PASSWORD=(.*)/', $env, $p);
    preg_match('/APP_URL=(.*)/', $env, $url);
    
    $db_host = trim($h[1] ?? '127.0.0.1');
    $db_name = trim($d[1] ?? '');
    $db_user = trim($u[1] ?? '');
    $db_pass = trim($p[1] ?? '');
    $app_url = trim($url[1] ?? 'http://localhost');
    
    try {
        new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
        $dbStatus = 'Connected';
    } catch (Exception $e) {
        $dbStatus = 'Error';
    }
} else {
    $db_host = '127.0.0.1';
    $db_name = ''; $db_user = ''; $db_pass = ''; $app_url = 'https://';
}

// Config
$appName = 'Easy Healthcare 101';
if ($envExists) {
    preg_match('/APP_NAME="(.*)"/', $env, $n);
    if (!empty($n[1])) $appName = $n[1];
}

$hasKey = $envExists && strpos(file_get_contents(getBaseDir() . '/.env'), 'APP_KEY=base64:') !== false;
$hasLink = is_link(__DIR__ . '/storage');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Easy Healthcare Setup</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .step-dot { transition: all 0.3s ease; }
        .step-active .step-dot { background-color: #2563EB; border-color: #2563EB; color: white; }
        .step-completed .step-dot { background-color: #10B981; border-color: #10B981; color: white; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen py-10 px-4">

<div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Easy Healthcare Installer</h1>
        <p class="text-gray-500 mt-2">Setup Wizard & Repair Tool</p>
    </div>

    <!-- Progress Steps -->
    <div class="flex justify-between mb-8 relative">
        <div class="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
        <?php 
        $steps = [
            1 => 'Requirements',
            2 => 'Permissions',
            3 => 'Database',
            4 => 'App Setup',
            5 => 'Finalize'
        ];
        foreach ($steps as $s => $label): 
            $status = $step == $s ? 'step-active' : ($step > $s ? 'step-completed' : '');
        ?>
            <div class="flex flex-col items-center <?php echo $status; ?> bg-gray-50 px-2">
                <div class="step-dot w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white font-semibold text-sm text-gray-500 mb-2">
                    <?php echo $step > $s ? '✓' : $s; ?>
                </div>
                <span class="text-xs font-medium text-gray-500 hidden sm:block"><?php echo $label; ?></span>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        <!-- Alerts -->
        <?php if($message): ?>
            <div class="bg-green-50 border-l-4 border-green-500 p-4 m-6 mb-0">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-green-700"><?php echo htmlspecialchars($message); ?></p>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <?php if($error): ?>
            <div class="bg-red-50 border-l-4 border-red-500 p-4 m-6 mb-0">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700"><?php echo htmlspecialchars($error); ?></p>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <div class="p-8">

            <!-- STEP 1: REQUIREMENTS -->
            <?php if ($step == 1): ?>
                <h2 class="text-xl font-bold text-gray-800 mb-6">Server Requirements</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span class="font-medium text-gray-700">PHP Version (8.1+)</span>
                        <?php if($phpOk): ?>
                            <span class="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full font-medium">Pass (<?php echo phpversion(); ?>)</span>
                        <?php else: ?>
                            <span class="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full font-medium">Fail (<?php echo phpversion(); ?>)</span>
                        <?php endif; ?>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span class="font-medium text-gray-700">Required Extensions</span>
                        <?php if($extOk): ?>
                            <span class="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full font-medium">Pass</span>
                        <?php else: ?>
                            <span class="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full font-medium">Missing</span>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <?php if ($phpOk && $extOk): ?>
                        <a href="?step=2" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">Next Step &rarr;</a>
                    <?php else: ?>
                        <button disabled class="bg-gray-300 text-gray-500 font-medium py-2 px-6 rounded-lg cursor-not-allowed">Fix Requirements to Proceed</button>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <!-- STEP 2: PERMISSIONS & ENV -->
            <?php if ($step == 2): ?>
                <h2 class="text-xl font-bold text-gray-800 mb-6">Permissions & Environment</h2>
                
                <div class="space-y-4 mb-6">
                    <?php foreach($permDirs as $name => $path): ?>
                        <div class="flex items-center justify-between p-3 border-b border-gray-100">
                            <span class="text-gray-600"><?php echo $name; ?></span>
                            <?php if(is_writable($path)): ?>
                                <span class="text-green-600 font-medium text-sm flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Writable
                                </span>
                            <?php else: ?>
                                <span class="text-red-600 font-medium text-sm flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Not Writable
                                </span>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="mb-6">
                    <h3 class="font-medium text-gray-900 mb-2">Environment File</h3>
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span class="text-gray-700">.env File</span>
                        <?php if($envExists): ?>
                            <span class="text-green-600 font-medium text-sm">Exists</span>
                        <?php else: ?>
                            <span class="text-red-600 font-medium text-sm">Missing</span>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="flex justify-between items-center mt-8">
                    <div class="space-x-2">
                        <?php if (!$permOk): ?>
                            <a href="?step=2&action=fix_permissions" class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition">Fix Permissions</a>
                        <?php endif; ?>
                        <?php if (!$envExists): ?>
                            <a href="?step=2&action=copy_env" class="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition">Create .env File</a>
                        <?php endif; ?>
                    </div>
                    
                    <?php if ($permOk && $envExists): ?>
                        <a href="?step=3" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">Next Step &rarr;</a>
                    <?php else: ?>
                         <span class="text-gray-400 text-sm">Complete actions to proceed</span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <!-- STEP 3: DATABASE -->
            <?php if ($step == 3): ?>
                <h2 class="text-xl font-bold text-gray-800 mb-6">Database Configuration</h2>
                
                <form method="POST" action="?step=3&action=update_db" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Database Type</label>
                            <input type="text" value="MySQL" readonly class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">App URL</label>
                            <input type="text" name="app_url" value="<?php echo htmlspecialchars($app_url); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="https://your-domain.com">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">DB Host</label>
                            <input type="text" name="host" value="<?php echo htmlspecialchars($db_host); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">DB Name</label>
                            <input type="text" name="database" value="<?php echo htmlspecialchars($db_name); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">DB Username</label>
                            <input type="text" name="username" value="<?php echo htmlspecialchars($db_user); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">DB Password</label>
                            <input type="password" name="password" value="<?php echo htmlspecialchars($db_pass); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                        </div>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Connection Status:</span>
                        <?php if($dbStatus == 'Connected'): ?>
                            <span class="px-2 py-1 text-xs font-bold text-green-700 bg-green-200 rounded">Connected</span>
                        <?php elseif($dbStatus == 'Error'): ?>
                            <span class="px-2 py-1 text-xs font-bold text-red-700 bg-red-200 rounded">Connection Failed</span>
                        <?php else: ?>
                            <span class="px-2 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded">Unknown</span>
                        <?php endif; ?>
                    </div>

                    <div class="flex justify-between items-center mt-6">
                        <button type="submit" class="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition shadow">Save & Test</button>
                        
                        <?php if ($dbStatus == 'Connected'): ?>
                            <a href="?step=4" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">Next Step &rarr;</a>
                        <?php endif; ?>
                    </div>
                </form>
            <?php endif; ?>

            <!-- STEP 4: CONFIGURATION -->
            <?php if ($step == 4): ?>
                <h2 class="text-xl font-bold text-gray-800 mb-6">Application Setup</h2>
                
                <div class="space-y-6">
                    <!-- General Settings -->
                    <div class="border border-gray-200 rounded-lg p-5">
                        <h3 class="font-medium text-gray-900 mb-4">General Settings</h3>
                        <form method="POST" action="?step=4&action=save_config" class="flex gap-4 items-end">
                            <div class="flex-grow">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
                                <input type="text" name="app_name" value="<?php echo htmlspecialchars($appName); ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                            </div>
                            <button type="submit" class="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition shadow mb-[1px]">Save</button>
                        </form>
                    </div>

                    <!-- App Key Section -->
                    <div class="border border-gray-200 rounded-lg p-5">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-medium text-gray-900">Application Key</h3>
                            <?php if($hasKey): ?>
                                <span class="text-green-600 text-sm font-bold">Configured</span>
                            <?php else: ?>
                                <span class="text-red-600 text-sm font-bold">Missing</span>
                            <?php endif; ?>
                        </div>
                        <p class="text-sm text-gray-500 mb-4">Required for encryption and security.</p>
                        <?php if(!$hasKey): ?>
                            <a href="?step=4&action=generate_key" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded transition">Generate Key</a>
                        <?php else: ?>
                            <button disabled class="bg-gray-100 text-gray-400 text-sm font-medium py-2 px-4 rounded cursor-default">Key Generated</button>
                        <?php endif; ?>
                    </div>

                    <!-- Code Patch Section -->
                    <div class="border border-gray-200 rounded-lg p-5 bg-blue-50 border-blue-100">
                        <h3 class="font-medium text-gray-900 mb-2">Automatic Code Repair</h3>
                        <p class="text-sm text-gray-600 mb-4">Fixes "500 Internal Server Error" by updating Filament resources to the correct namespace.</p>
                        <a href="?step=4&action=patch_code" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm">Apply Code Fixes</a>
                    </div>
                </div>

                <div class="mt-8 flex justify-end">
                    <?php if ($hasKey): ?>
                        <a href="?step=5" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">Next Step &rarr;</a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <!-- STEP 5: FINALIZE -->
            <?php if ($step == 5): ?>
                <h2 class="text-xl font-bold text-gray-800 mb-6">Finalizing Setup</h2>
                
                <div class="mb-8">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                            <h3 class="font-medium text-gray-900">Storage Link</h3>
                            <p class="text-sm text-gray-500">Required for images to display correctly.</p>
                        </div>
                        <?php if($hasLink): ?>
                            <span class="text-green-600 font-bold text-sm">Linked</span>
                        <?php else: ?>
                            <a href="?step=5&action=symlink" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded transition">Create Link</a>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="text-center pt-6 border-t border-gray-100">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Installation Complete!</h3>
                    <p class="text-gray-500 mb-6">Your application has been successfully configured and repaired.</p>
                    
                    <a href="index.php" target="_blank" class="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg transform hover:-translate-y-0.5">
                        Launch Admin Panel
                    </a>
                </div>
            <?php endif; ?>

        </div>
    </div>
    
    <div class="text-center mt-6 text-gray-400 text-sm">
        &copy; <?php echo date('Y'); ?> Easy Healthcare 101 Installer
    </div>
</div>

</body>
</html>
