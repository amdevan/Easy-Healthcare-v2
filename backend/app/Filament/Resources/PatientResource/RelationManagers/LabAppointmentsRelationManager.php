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
use App\Models\LabTest;

class LabAppointmentsRelationManager extends RelationManager
{
    protected static string $relationship = 'labAppointments';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\Select::make('lab_test_id')
                    ->label('Lab Test')
                    ->options(LabTest::all()->pluck('name', 'id'))
                    ->searchable()
                    ->helperText('Select from catalog or enter custom name below'),
                Forms\Components\TextInput::make('test_name')
                    ->label('Custom Test Name')
                    ->placeholder('If not in catalog'),
                Forms\Components\DateTimePicker::make('scheduled_at')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->default('pending')
                    ->required(),
                Forms\Components\Toggle::make('home_collection')
                    ->reactive(),
                Forms\Components\TextInput::make('address')
                    ->hidden(fn (Forms\Get $get) => !$get('home_collection')),
                Forms\Components\FileUpload::make('report_file')
                    ->directory('lab-reports')
                    ->downloadable()
                    ->openable(),
                Forms\Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('test_name')
            ->columns([
                Tables\Columns\TextColumn::make('labTest.name')->label('Catalog Test'),
                Tables\Columns\TextColumn::make('test_name')->label('Custom Test'),
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
                Tables\Columns\IconColumn::make('home_collection')->boolean(),
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
