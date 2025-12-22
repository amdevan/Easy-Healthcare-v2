<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('author_name')
                ->required()
                ->maxLength(255)
                ->placeholder('Author’s full name'),
            Forms\Components\TextInput::make('author_role')
                ->maxLength(255)
                ->placeholder('e.g., CEO at Example Co.'),
            Forms\Components\Textarea::make('content')
                ->required()
                ->columnSpanFull()
                ->rows(8)
                ->placeholder('Add the testimonial content here...'),
            Forms\Components\TextInput::make('rating')
                ->label('Rating (0–5)')
                ->numeric()
                ->minValue(0)
                ->maxValue(5)
                ->helperText('Use whole numbers between 0 and 5.'),
            Forms\Components\TextInput::make('order')
                ->numeric()
                ->minValue(0)
                ->helperText('Controls display order; lower numbers show first.'),
            Forms\Components\Toggle::make('is_active')
                ->label('Active')
                ->helperText('Toggle to show or hide this testimonial.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('author_name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('rating'),
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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) Testimonial::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['author_name', 'content'];
    }
}