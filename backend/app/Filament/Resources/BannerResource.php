<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
use App\Models\Banner;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;
    protected static ?string $navigationLabel = 'Popup Banner';
    protected static ?string $modelLabel = 'Popup Banner';
    protected static ?string $pluralModelLabel = 'Popup Banners';
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-photo';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Banner Content')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Primary heading for the banner'),
                    Forms\Components\TextInput::make('subtitle')
                        ->maxLength(255)
                        ->placeholder('Optional subheading'),
                    Forms\Components\FileUpload::make('image')
                        ->label('Banner Image')
                        ->image()
                        ->directory('banners')
                        ->required(),
                    Forms\Components\TextInput::make('button_text')
                        ->label('Button Text')
                        ->placeholder('e.g., Learn More')
                        ->maxLength(255),
                    Forms\Components\TextInput::make('link_url')
                        ->label('Button URL')
                        ->maxLength(1024)
                        ->url()
                        ->helperText('Where the button should link to.'),
                ])->columns(2),

            Section::make('Display Settings')
                ->schema([
                    Forms\Components\Toggle::make('show_on_all_pages')
                        ->label('Show on All Pages')
                        ->default(true)
                        ->reactive(),
                    Forms\Components\Select::make('pages')
                        ->label('Show on Specific Pages')
                        ->multiple()
                        ->options([
                            '/' => 'Home Page',
                            '/about' => 'About Page',
                            '/services' => 'Services Page',
                            '/contact' => 'Contact Page',
                            '/find-doctors' => 'Find Doctors',
                            '/video-consult' => 'Video Consult',
                            '/pharmacy' => 'Pharmacy',
                            '/lab-tests' => 'Lab Tests',
                        ])
                        ->hidden(fn ($get) => $get('show_on_all_pages'))
                        ->helperText('Select pages where this banner should appear.'),
                    Forms\Components\TextInput::make('order')
                        ->numeric()
                        ->minValue(0)
                        ->default(0)
                        ->helperText('Lower numbers show first.'),
                    Forms\Components\Toggle::make('is_active')
                        ->label('Active')
                        ->default(true),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
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
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) Banner::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title'];
    }
}