<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Models\Media;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static ?string $modelLabel = 'Media file';
    protected static ?string $pluralModelLabel = 'Media files';
    protected static ?string $navigationLabel = 'Media';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\FileUpload::make('file_path')
                ->label('File')
                ->disk('public')
                ->directory('media')
                ->visibility('public')
                ->imagePreviewHeight('200')
                ->openable()
                ->downloadable()
                ->required(),
            Forms\Components\TextInput::make('alt_text')->label('Alt text')->maxLength(255),
            Forms\Components\Textarea::make('caption')->label('Caption')->columnSpanFull(),
            Forms\Components\Toggle::make('is_active')->label('Active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('file_path')->disk('public')->visibility('public')->label('Preview')->square(),
            Tables\Columns\TextColumn::make('alt_text')->label('Alt text')->wrap()->searchable(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->filters([
        ])->actions([
            EditAction::make(),
            DeleteAction::make(),
        ])->bulkActions([
            DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMedia::route('/'),
            'create' => Pages\CreateMedia::route('/create'),
            'edit' => Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}