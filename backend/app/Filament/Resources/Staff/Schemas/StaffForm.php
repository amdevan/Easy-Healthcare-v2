<?php

namespace App\Filament\Resources\Staff\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class StaffForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        TextInput::make('role')
                            ->required()
                            ->default('attendant'),
                        TextInput::make('phone')
                            ->tel(),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email(),
                        Select::make('status')
                            ->options(['active' => 'Active', 'inactive' => 'Inactive'])
                            ->default('active')
                            ->required(),
                        DatePicker::make('joining_date')
                            ->native(false),
                    ]),

                Section::make('Additional Details')
                    ->columns(2)
                    ->schema([
                        Textarea::make('address')
                            ->columnSpanFull(),
                        TextInput::make('emergency_contact_name'),
                        TextInput::make('emergency_contact_phone')
                            ->tel(),
                        Textarea::make('notes')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
