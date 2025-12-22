<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Auth;

class EditUi extends Page
{
    protected static ?string $navigationLabel = 'Instant UI Edit';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-pencil-square';
    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.edit-ui';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function canAccess(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        return $user?->hasPermission('view_ui_settings') ?? false;
    }

    protected function getHeaderActions(): array
    {
        $frontend = env('FRONTEND_URL');
        $base = rtrim($frontend ?: 'http://localhost:3000', '/');
        $url = $base . '/?enableAdmin=1';
        $resetUrl = $base . '/?resetAdmin=1';

        return [
            Action::make('open_frontend')
                ->label('Open Frontend Editor')
                ->url($url)
                ->openUrlInNewTab()
                ->color('primary')
                ->icon('heroicon-o-link'),

            Action::make('reset_admin')
                ->label('Reset Admin Mode')
                ->url($resetUrl)
                ->openUrlInNewTab()
                ->color('secondary')
                ->icon('heroicon-o-arrow-path'),
        ];
    }
}
