<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BoardMemberResource\Pages;
use App\Models\BoardMember;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class BoardMemberResource extends Resource
{
    protected static ?string $model = BoardMember::class;
    protected static ?string $navigationLabel = 'Board Members';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-group';
    protected static ?int $navigationSort = 12;

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('name')->required()->maxLength(255),
            Forms\Components\TextInput::make('role')->maxLength(255),
            Forms\Components\FileUpload::make('photo_path')
                ->label('Photo')
                ->image()
                ->disk('public')
                ->directory('pages/board/members')
                ->maxSize(2048)
                ->acceptedFileTypes(['image/jpeg','image/png','image/webp'])
                ->imagePreviewHeight('150')
                ->helperText('PNG/JPG/WebP up to 2 MB. Recommend portrait image.')
                ->downloadable()
                ->openable(),
            Forms\Components\RichEditor::make('bio')->label('Bio')->columnSpanFull(),
            Forms\Components\TextInput::make('email')->email()->maxLength(255),
            Forms\Components\TextInput::make('phone')->maxLength(50),
            Forms\Components\Repeater::make('links')->label('Links')
                ->schema([
                    Forms\Components\TextInput::make('label')->maxLength(50),
                    Forms\Components\TextInput::make('href')->maxLength(255),
                ])->default([]),
            Forms\Components\TextInput::make('order')
                ->numeric()
                ->minValue(0)
                ->default(0)
                ->dehydrateStateUsing(fn ($state) => (int) ($state ?? 0)),
            Forms\Components\Toggle::make('is_active')->label('Active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\ImageColumn::make('photo_path')->label('Photo')->circular(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('role')->sortable(),
            Tables\Columns\TextColumn::make('order')->sortable(),
            Tables\Columns\ToggleColumn::make('is_active')->label('Active'),
            Tables\Columns\TextColumn::make('updated_at')->dateTime()->label('Updated'),
        ])->defaultSort('order', 'asc')
            ->reorderable('order')
            ->filters([])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBoardMembers::route('/'),
            'create' => Pages\CreateBoardMember::route('/create'),
            'edit' => Pages\EditBoardMember::route('/{record}/edit'),
        ];
    }
}
