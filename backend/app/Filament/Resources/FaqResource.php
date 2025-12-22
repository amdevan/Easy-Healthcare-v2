<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\Faq;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-question-mark-circle';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('question')
                ->required()
                ->maxLength(255)
                ->placeholder('e.g., How do I reset my password?'),
            Forms\Components\Textarea::make('answer')
                ->required()
                ->columnSpanFull()
                ->rows(8)
                ->placeholder('Provide a short, helpful answer.'),
            Forms\Components\TextInput::make('order')
                ->numeric()
                ->minValue(0)
                ->helperText('Controls display order; lower numbers show first.'),
            Forms\Components\Toggle::make('is_active')
                ->label('Active')
                ->helperText('Toggle to show or hide this FAQ.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('question')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('order')->sortable(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->trueLabel('Active')
                    ->falseLabel('Inactive'),
            ])
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
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) Faq::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['question'];
    }
}