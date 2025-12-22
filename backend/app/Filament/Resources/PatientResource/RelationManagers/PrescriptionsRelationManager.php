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
use Illuminate\Support\Facades\Storage;
use App\Models\Doctor;

class PrescriptionsRelationManager extends RelationManager
{
    protected static string $relationship = 'prescriptions';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\Select::make('doctor_id')
                    ->label('Doctor')
                    ->options(Doctor::all()->pluck('name', 'id'))
                    ->searchable(),
                Forms\Components\DatePicker::make('prescribed_at')
                    ->default(now())
                    ->required(),
                Forms\Components\FileUpload::make('file_path')
                    ->label('Prescription File')
                    ->disk('public')
                    ->directory('prescriptions')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('doctor.name')->label('Doctor'),
                Tables\Columns\TextColumn::make('prescribed_at')->date()->sortable(),
                Tables\Columns\ImageColumn::make('file_path')
                    ->label('Prescription')
                    ->disk('public')
                    ->visibility('private'),
                Tables\Columns\TextColumn::make('notes')->limit(50),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('view')
                    ->label('View File')
                    ->icon('heroicon-m-eye')
                    ->url(fn ($record) => Storage::disk('public')->url($record->file_path))
                    ->openUrlInNewTab()
                    ->visible(fn ($record) => $record->file_path),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}
