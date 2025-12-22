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
                DeleteBulkAction::make(),
            ]);
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