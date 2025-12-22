<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NemtRequestResource\Pages;
use App\Models\NemtRequest;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class NemtRequestResource extends Resource
{
    protected static ?string $model = NemtRequest::class;

    protected static ?string $navigationLabel = 'Requests';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-truck';
    protected static ?int $navigationSort = 1;
    
    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'NEMT (Transport)';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\Select::make('patient_id')
                    ->relationship('patient', 'name')
                    ->label('Patient')
                    ->searchable()
                    ->preload()
                    ->required(),
                Forms\Components\DateTimePicker::make('scheduled_at')
                    ->label('Scheduled Time')
                    ->required()
                    ->native(false),
                Forms\Components\TextInput::make('pickup_address')
                    ->label('Pickup Address')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('dropoff_address')
                    ->label('Dropoff Address')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\Select::make('vehicle_type')
                    ->label('Requested Vehicle Type')
                    ->options([
                        'basic' => 'Basic NEMT Van',
                        'wheelchair' => 'Wheelchair Van',
                        'stretcher' => 'Stretcher / BLS Van',
                    ]),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->default('pending')
                    ->required(),
                Forms\Components\Select::make('vehicle_id')
                    ->label('Assigned Vehicle')
                    ->relationship('vehicle', 'license_plate')
                    ->getOptionLabelFromRecordUsing(fn (Model $record) => "{$record->make} {$record->model} ({$record->license_plate})")
                    ->searchable()
                    ->preload(),
                Forms\Components\Select::make('driver_id')
                    ->label('Assigned Driver')
                    ->relationship('driver', 'name')
                    ->searchable()
                    ->preload(),
                Forms\Components\Select::make('staff')
                    ->label('Assigned Staff')
                    ->relationship('staff', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),
                Forms\Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('patient.name')
                    ->label('Patient')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('scheduled_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('pickup_address')
                    ->label('Pickup')
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('dropoff_address')
                    ->label('Dropoff')
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('vehicle_type')
                    ->label('Type')
                    ->formatStateUsing(fn (?string $state): string => $state ? ucfirst($state) : '-')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'confirmed' => 'success',
                        'completed' => 'info',
                        'cancelled' => 'danger',
                        default => 'warning',
                    }),
                Tables\Columns\TextColumn::make('driver.name')
                    ->label('Driver')
                    ->searchable(),
                Tables\Columns\TextColumn::make('staff.name')
                    ->label('Staff')
                    ->listWithLineBreaks()
                    ->bulleted()
                    ->searchable(),
                Tables\Columns\TextColumn::make('vehicle.license_plate')
                    ->label('Vehicle')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->actions([
                EditAction::make(),
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
            'index' => Pages\ListNemtRequests::route('/'),
            'create' => Pages\CreateNemtRequest::route('/create'),
            'edit' => Pages\EditNemtRequest::route('/{record}/edit'),
        ];
    }
}
