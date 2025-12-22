<?php

namespace App\Filament\Resources\PatientResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class AppointmentsRelationManager extends RelationManager
{
    protected static string $relationship = 'appointments';
    protected static ?string $label = 'Appointments';

    public function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Select::make('doctor_id')->relationship('doctor', 'name')->required(),
            Forms\Components\DateTimePicker::make('scheduled_at')->required(),
            Forms\Components\Select::make('status')
                ->options([
                    'pending' => 'Pending',
                    'confirmed' => 'Confirmed',
                    'cancelled' => 'Cancelled',
                    'completed' => 'Completed',
                ])->required(),
            Forms\Components\Textarea::make('notes'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('doctor.name')->label('Doctor')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('scheduled_at')->dateTime()->sortable(),
            Tables\Columns\TextColumn::make('status')->badge(),
        ])->headerActions([
            CreateAction::make(),
        ])->actions([
            EditAction::make(),
            DeleteAction::make(),
        ])->bulkActions([
            DeleteBulkAction::make(),
        ]);
    }
}

