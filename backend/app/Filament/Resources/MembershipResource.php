<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MembershipResource\Pages;
use App\Models\Membership;
use Filament\Forms;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class MembershipResource extends Resource
{
    protected static ?string $model = Membership::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Memberships';
    protected static string | \UnitEnum | null $navigationGroup = 'Main';
    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Booking Details')
                    ->schema([
                        Forms\Components\Toggle::make('is_for_self')
                            ->label('Booking for Self')
                            ->default(true)
                            ->live(),
                        Forms\Components\TextInput::make('booking_name')
                            ->label('Booking Person Name')
                            ->maxLength(255)
                            ->hidden(fn (Get $get) => $get('is_for_self')),
                        Forms\Components\TextInput::make('booking_email')
                            ->label('Booking Person Email')
                            ->email()
                            ->maxLength(255)
                            ->hidden(fn (Get $get) => $get('is_for_self')),
                        Forms\Components\TextInput::make('booking_phone')
                            ->label('Booking Person Phone')
                            ->tel()
                            ->maxLength(255)
                            ->hidden(fn (Get $get) => $get('is_for_self')),
                        Forms\Components\TextInput::make('relation')
                            ->label('Relation to Member')
                            ->maxLength(255)
                            ->hidden(fn (Get $get) => $get('is_for_self')),
                    ]),

                Section::make('Member Details')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Member Name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label('Member Email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->label('Member Phone')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('address')
                            ->label('Address')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),

                Section::make('Plan Details')
                    ->schema([
                        Forms\Components\Select::make('plan_type')
                            ->options([
                                'individual' => 'Individual',
                                'family' => 'Family',
                                'senior' => 'Senior',
                            ])
                            ->required(),
                        Forms\Components\DatePicker::make('start_date')
                            ->required(),
                        Forms\Components\DatePicker::make('end_date')
                            ->required()
                            ->after('start_date'),
                        Forms\Components\Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'pending' => 'Pending',
                                'expired' => 'Expired',
                                'cancelled' => 'Cancelled',
                            ])
                            ->default('active')
                            ->required(),
                        Forms\Components\Textarea::make('notes')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->icon('heroicon-m-envelope')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('plan_type')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'pending' => 'warning',
                        'expired' => 'danger',
                        'cancelled' => 'gray',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('plan_type')
                    ->options([
                        'individual' => 'Individual',
                        'family' => 'Family',
                        'senior' => 'Senior',
                    ]),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'pending' => 'Pending',
                        'expired' => 'Expired',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
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
            'index' => Pages\ListMemberships::route('/'),
            'create' => Pages\CreateMembership::route('/create'),
            'edit' => Pages\EditMembership::route('/{record}/edit'),
        ];
    }
}
