<?php

namespace App\Filament\Pages;

use App\Models\PackageRequest;
use Filament\Pages\Page;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Filament\Tables;
use Filament\Forms;
use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class HealthPackages extends Page implements HasTable
{
    use InteractsWithTable;

    protected static ?string $navigationLabel = 'Health Packages';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cube';
    protected static ?int $navigationSort = 7;
    protected string $view = 'filament.pages.health-packages';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Main';
    }

    public static function canAccess(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('view_packages') ?? false;
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(PackageRequest::query())
            ->columns([
                Tables\Columns\TextColumn::make('request_id')
                    ->label('Request ID')
                    ->searchable()
                    ->sortable()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('patient_name')
                    ->weight('bold')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('package_name')
                    ->label('Package')
                    ->searchable(),
                Tables\Columns\TextColumn::make('contact')
                    ->label('Contact')
                    ->getStateUsing(function (PackageRequest $record) {
                        return $record->email ?: $record->phone;
                    })
                    ->description(fn (PackageRequest $record) => $record->email && $record->phone ? $record->phone : null)
                    ->icon(fn (PackageRequest $record) => $record->email ? 'heroicon-m-envelope' : 'heroicon-m-phone'),
                Tables\Columns\TextColumn::make('requested_date')
                    ->label('Requested Date')
                    ->date('Y-m-d')
                    ->description(fn (PackageRequest $record) => 'Created: ' . $record->created_at->format('Y-m-d'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'confirmed' => 'success',
                        'pending' => 'warning',
                        'cancelled' => 'danger',
                        'completed' => 'info',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),
                Tables\Filters\Filter::make('requested_date')
                    ->form([
                        Forms\Components\DatePicker::make('requested_date')
                            ->label('Requested Date'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['requested_date'],
                                fn (Builder $query, $date): Builder => $query->whereDate('requested_date', $date),
                            );
                    }),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Request New Package')
                    ->modalHeading('Request New Health Package')
                    ->form([
                        Forms\Components\Select::make('patient_id')
                            ->relationship('patient', 'name')
                            ->label('Select Patient')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, Set $set) {
                                if ($state) {
                                    $patient = \App\Models\Patient::find($state);
                                    if ($patient) {
                                        $set('patient_name', $patient->name);
                                        $set('email', $patient->email);
                                        $set('phone', $patient->phone);
                                    }
                                }
                            }),
                        Forms\Components\TextInput::make('request_id')
                            ->default(fn () => '#PKG-' . strtoupper(uniqid()))
                            ->disabled()
                            ->dehydrated(),
                        Forms\Components\Select::make('package_name')
                            ->label('Package')
                            ->options([
                                'Basic Wellness' => 'Basic Wellness',
                                'Comprehensive Care' => 'Comprehensive Care',
                                'Senior Citizen' => 'Senior Citizen',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('patient_name')
                            ->label('Name on Request')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->email(),
                        Forms\Components\TextInput::make('phone'),
                        Forms\Components\DatePicker::make('requested_date')
                            ->default(now())
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                            ])
                            ->default('pending'),
                    ]),
            ])
            ->actions([
                EditAction::make()
                    ->form([
                        Forms\Components\Select::make('patient_id')
                            ->relationship('patient', 'name')
                            ->label('Select Patient')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, Set $set) {
                                if ($state) {
                                    $patient = \App\Models\Patient::find($state);
                                    if ($patient) {
                                        $set('patient_name', $patient->name);
                                        $set('email', $patient->email);
                                        $set('phone', $patient->phone);
                                    }
                                }
                            }),
                        Forms\Components\TextInput::make('request_id')
                            ->disabled()
                            ->dehydrated(),
                        Forms\Components\Select::make('package_name')
                            ->label('Package')
                            ->options([
                                'Basic Wellness' => 'Basic Wellness',
                                'Comprehensive Care' => 'Comprehensive Care',
                                'Senior Citizen' => 'Senior Citizen',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('patient_name')
                            ->label('Name on Request')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->email(),
                        Forms\Components\TextInput::make('phone'),
                        Forms\Components\DatePicker::make('requested_date')
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                            ])
                            ->required(),
                    ]),
                DeleteAction::make(),
            ]);
    }
}
