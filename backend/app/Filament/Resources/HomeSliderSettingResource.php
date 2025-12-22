<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HomeSliderSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;

class HomeSliderSettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static ?string $navigationLabel = 'Home Slider';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Repeater::make('value.slides')
                ->label('Slides')
                ->reorderable()
                ->schema([
                    Forms\Components\FileUpload::make('src')
                        ->disk('public')
                        ->directory('pages/home/slider')
                        ->visibility('public')
                        ->image()
                        ->acceptedFileTypes(['image/*'])
                        ->maxSize(10240)
                        ->imagePreviewHeight('150')
                        ->openable()
                        ->downloadable(),
                    Forms\Components\TextInput::make('alt')->maxLength(255),
                    Forms\Components\TextInput::make('href')->maxLength(255),
                ])
                ->default([])
                ->columnSpanFull(),

            Section::make('Options')->schema([
                Forms\Components\Toggle::make('value.options.autoPlay')->label('Auto play')->default(true),
                Forms\Components\TextInput::make('value.options.intervalMs')->label('Interval (ms)')->numeric()->minValue(500)->default(4500),
                Forms\Components\Toggle::make('value.options.pauseOnHover')->label('Pause on hover')->default(true),
                Forms\Components\Toggle::make('value.options.showCaptions')->label('Show captions')->default(true),
                Forms\Components\Toggle::make('value.options.showButton')->label('Show button')->default(true),
                Forms\Components\TextInput::make('value.options.buttonText')->label('Button text')->maxLength(50)->default('View'),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('key')->sortable(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->filters([
        ])->actions([
            EditAction::make(),
        ])->bulkActions([
            DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHomeSliderSettings::route('/'),
            'create' => Pages\CreateHomeSliderSetting::route('/create'),
            'edit' => Pages\EditHomeSliderSetting::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('key', 'home.slider');
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) UiSetting::query()->where('key', 'home.slider')->count();
    }

    public static function defaultValue(): array
    {
        return [
            'slides' => [
                ['src' => 'https://images.unsplash.com/photo-1758691463384-771db2f192b3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0', 'alt' => 'Health care'],
                ['src' => 'https://plus.unsplash.com/premium_photo-1663013549676-1eba5ea1d16e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', 'alt' => 'Medical tools and accessories'],
                ['src' => 'https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0', 'alt' => 'Work desk with accessories'],
            ],
            'options' => [
                'autoPlay' => true,
                'intervalMs' => 4500,
                'pauseOnHover' => true,
                'showCaptions' => true,
                'showButton' => true,
                'buttonText' => 'View',
            ],
        ];
    }
}
