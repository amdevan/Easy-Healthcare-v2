<?php

namespace App\Filament\Resources\Staff\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class StaffInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('name'),
                        TextEntry::make('role'),
                        TextEntry::make('phone')
                            ->placeholder('-'),
                        TextEntry::make('email')
                            ->label('Email address')
                            ->placeholder('-'),
                        TextEntry::make('status')
                            ->badge(),
                        TextEntry::make('joining_date')
                            ->date()
                            ->placeholder('-'),
                    ]),
                
                Section::make('Additional Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('address')
                            ->placeholder('-')
                            ->columnSpanFull(),
                        TextEntry::make('emergency_contact_name')
                            ->placeholder('-'),
                        TextEntry::make('emergency_contact_phone')
                            ->placeholder('-'),
                        TextEntry::make('notes')
                            ->placeholder('-')
                            ->columnSpanFull(),
                    ]),

                Section::make('Metadata')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->placeholder('-'),
                    ])
                    ->collapsed(),
            ]);
    }
}
