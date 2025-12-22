<?php

namespace App\Filament\Resources\PatientResource\RelationManagers;

use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class NemtRequestsRelationManager extends RelationManager
{
    protected static string $relationship = 'nemtRequests';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\TextInput::make('pickup_address')->required(),
                Forms\Components\TextInput::make('dropoff_address')->required(),
                Forms\Components\DateTimePicker::make('scheduled_at')->required(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->default('pending')
                    ->required(),
                Forms\Components\TextInput::make('driver_name'),
                Forms\Components\TextInput::make('vehicle_type'),
                Forms\Components\Textarea::make('notes')->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('pickup_address')
            ->columns([
                Tables\Columns\TextColumn::make('pickup_address')->label('Pickup'),
                Tables\Columns\TextColumn::make('dropoff_address')->label('Dropoff'),
                Tables\Columns\TextColumn::make('scheduled_at')->dateTime()->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'completed' => 'success',
                        'cancelled' => 'danger',
                        'confirmed' => 'primary',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('driver_name'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}
