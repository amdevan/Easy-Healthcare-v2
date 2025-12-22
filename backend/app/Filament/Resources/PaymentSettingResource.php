<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class PaymentSettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-credit-card';

    protected static ?string $modelLabel = 'Payment Gateway';
    protected static ?string $pluralModelLabel = 'Payment Gateways';
    protected static ?string $navigationLabel = 'Payment Gateway';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'System';
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('key', 'payment_gateway');
    }

    public static function canViewAny(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('view_payment_settings') ?? false;
    }

    public static function canCreate(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('create_payment_settings') ?? false;
    }

    public static function canEdit(\Illuminate\Database\Eloquent\Model $record): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('edit_payment_settings') ?? false;
    }

    public static function canDelete(\Illuminate\Database\Eloquent\Model $record): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('delete_payment_settings') ?? false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Hidden::make('key')->default('payment_gateway'),
            
            Section::make('eSewa Configuration')
                ->description('Configure eSewa payment gateway credentials.')
                ->schema([
                    Forms\Components\Toggle::make('value.esewa.enabled')
                        ->label('Enable eSewa')
                        ->default(false)
                        ->columnSpanFull()
                        ->reactive(),
                        
                    Forms\Components\TextInput::make('value.esewa.merchant_id')
                        ->label('Merchant ID')
                        ->default('EPAYTEST')
                        ->requiredWith('value.esewa.enabled')
                        ->visible(fn (Get $get) => $get('value.esewa.enabled')),
                        
                    Forms\Components\TextInput::make('value.esewa.secret_key')
                        ->label('Secret Key')
                        ->password()
                        ->requiredWith('value.esewa.enabled')
                        ->visible(fn (Get $get) => $get('value.esewa.enabled')),
                        
                    Forms\Components\Select::make('value.esewa.environment')
                        ->label('Environment')
                        ->options([
                            'test' => 'Test / Sandbox',
                            'live' => 'Live / Production',
                        ])
                        ->default('test')
                        ->requiredWith('value.esewa.enabled')
                        ->visible(fn (Get $get) => $get('value.esewa.enabled')),
                ])->columns(2),

            Section::make('Khalti Configuration')
                ->description('Configure Khalti payment gateway credentials.')
                ->schema([
                    Forms\Components\Toggle::make('value.khalti.enabled')
                        ->label('Enable Khalti')
                        ->default(false)
                        ->columnSpanFull()
                        ->reactive(),
                        
                    Forms\Components\TextInput::make('value.khalti.public_key')
                        ->label('Public Key')
                        ->requiredWith('value.khalti.enabled')
                        ->visible(fn (Get $get) => $get('value.khalti.enabled')),
                        
                    Forms\Components\TextInput::make('value.khalti.secret_key')
                        ->label('Secret Key')
                        ->password()
                        ->requiredWith('value.khalti.enabled')
                        ->visible(fn (Get $get) => $get('value.khalti.enabled')),

                    Forms\Components\Select::make('value.khalti.environment')
                        ->label('Environment')
                        ->options([
                            'test' => 'Test / Sandbox',
                            'live' => 'Live / Production',
                        ])
                        ->default('test')
                        ->requiredWith('value.khalti.enabled')
                        ->visible(fn (Get $get) => $get('value.khalti.enabled')),
                ])->columns(2),

            Section::make('Fonepay Configuration')
                ->description('Configure Fonepay payment gateway credentials.')
                ->schema([
                    Forms\Components\Toggle::make('value.fonepay.enabled')
                        ->label('Enable Fonepay')
                        ->default(false)
                        ->columnSpanFull()
                        ->reactive(),
                        
                    Forms\Components\TextInput::make('value.fonepay.merchant_code')
                        ->label('Merchant Code')
                        ->requiredWith('value.fonepay.enabled')
                        ->visible(fn (Get $get) => $get('value.fonepay.enabled')),
                        
                    Forms\Components\TextInput::make('value.fonepay.secret_key')
                        ->label('Secret Key')
                        ->password()
                        ->requiredWith('value.fonepay.enabled')
                        ->visible(fn (Get $get) => $get('value.fonepay.enabled')),

                    Forms\Components\Select::make('value.fonepay.environment')
                        ->label('Environment')
                        ->options([
                            'test' => 'Test / Sandbox',
                            'live' => 'Live / Production',
                        ])
                        ->default('test')
                        ->requiredWith('value.fonepay.enabled')
                        ->visible(fn (Get $get) => $get('value.fonepay.enabled')),
                ])->columns(2),

            Section::make('Stripe Configuration')
                ->description('Configure Stripe payment gateway credentials.')
                ->schema([
                    Forms\Components\Toggle::make('value.stripe.enabled')
                        ->label('Enable Stripe')
                        ->default(false)
                        ->columnSpanFull()
                        ->reactive(),
                        
                    Forms\Components\TextInput::make('value.stripe.publishable_key')
                        ->label('Publishable Key')
                        ->requiredWith('value.stripe.enabled')
                        ->visible(fn (Get $get) => $get('value.stripe.enabled')),
                        
                    Forms\Components\TextInput::make('value.stripe.secret_key')
                        ->label('Secret Key')
                        ->password()
                        ->requiredWith('value.stripe.enabled')
                        ->visible(fn (Get $get) => $get('value.stripe.enabled')),

                    Forms\Components\Select::make('value.stripe.environment')
                        ->label('Environment')
                        ->options([
                            'test' => 'Test / Sandbox',
                            'live' => 'Live / Production',
                        ])
                        ->default('test')
                        ->requiredWith('value.stripe.enabled')
                        ->visible(fn (Get $get) => $get('value.stripe.enabled')),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('value.esewa.enabled')
                    ->label('eSewa')
                    ->formatStateUsing(fn ($state) => $state ? 'Enabled' : 'Disabled')
                    ->badge()
                    ->color(fn ($state) => $state ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('value.khalti.enabled')
                    ->label('Khalti')
                    ->formatStateUsing(fn ($state) => $state ? 'Enabled' : 'Disabled')
                    ->badge()
                    ->color(fn ($state) => $state ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('value.fonepay.enabled')
                    ->label('Fonepay')
                    ->formatStateUsing(fn ($state) => $state ? 'Enabled' : 'Disabled')
                    ->badge()
                    ->color(fn ($state) => $state ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('value.stripe.enabled')
                    ->label('Stripe')
                    ->formatStateUsing(fn ($state) => $state ? 'Enabled' : 'Disabled')
                    ->badge()
                    ->color(fn ($state) => $state ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('updated_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPaymentSettings::route('/'),
            'create' => Pages\CreatePaymentSetting::route('/create'),
            'edit' => Pages\EditPaymentSetting::route('/{record}/edit'),
        ];
    }
}
