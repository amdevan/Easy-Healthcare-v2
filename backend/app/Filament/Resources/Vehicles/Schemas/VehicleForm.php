<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('make')
                    ->required(),
                TextInput::make('model')
                    ->required(),
                TextInput::make('year')
                    ->required()
                    ->numeric(),
                TextInput::make('license_plate')
                    ->required(),
                TextInput::make('vin'),
                Select::make('type')
                    ->options(['basic' => 'Basic', 'wheelchair' => 'Wheelchair', 'stretcher' => 'Stretcher'])
                    ->default('basic')
                    ->required(),
                Select::make('status')
                    ->options(['active' => 'Active', 'maintenance' => 'Maintenance', 'out_of_service' => 'Out of service'])
                    ->default('active')
                    ->required(),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}
