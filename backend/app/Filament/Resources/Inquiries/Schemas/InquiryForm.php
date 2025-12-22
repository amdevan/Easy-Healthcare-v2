<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class InquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->maxLength(255),
                TextInput::make('phone')
                    ->tel()
                    ->maxLength(255),
                TextInput::make('address')
                    ->maxLength(255),
                TextInput::make('subject')
                    ->maxLength(255),
                Select::make('status')
                    ->options([
                        'new' => 'New',
                        'read' => 'Read',
                        'replied' => 'Replied',
                    ])
                    ->required()
                    ->default('new'),
                Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
