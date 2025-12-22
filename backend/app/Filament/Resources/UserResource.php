<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use App\Models\Role;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationLabel = 'Users';
    protected static ?string $modelLabel = 'User';
    protected static ?string $pluralModelLabel = 'Users';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Users/Roles';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->placeholder('e.g., Jane Doe'),
            Forms\Components\TextInput::make('email')
                ->email()
                ->required()
                ->maxLength(255)
                ->placeholder('jane@example.com'),
            Forms\Components\Select::make('role_id')
                ->label('Role')
                ->relationship('role', 'name')
                ->searchable()
                ->preload()
                ->nullable(),
            Forms\Components\TextInput::make('password')
                ->password()
                ->dehydrateStateUsing(fn ($state) => $state)
                ->required(fn (string $operation) => $operation === 'create')
                ->columnSpanFull()
                ->helperText('On edit, leave blank to keep the current password.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('email')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('role.name')->label('Role')->toggleable(isToggledHiddenByDefault: false),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->defaultSort('created_at', 'desc')
            ->filters([])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) User::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'email'];
    }
}