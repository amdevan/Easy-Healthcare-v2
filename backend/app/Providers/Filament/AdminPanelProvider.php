<?php

namespace App\Providers\Filament;

use Filament\Panel;
use Filament\PanelProvider;
use Filament\Pages;
use Filament\Widgets;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;
use Filament\Navigation\NavigationGroup;
use Filament\View\PanelsRenderHook;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->favicon(asset('favicon.png'))
            ->brandLogo(fn () => view('filament.admin.logo'))
            ->brandLogoHeight('0.9rem')
            ->authGuard('web')
            ->middleware(['web'])
            ->authMiddleware([
                FilamentAuthenticate::class,
            ])
            ->login()
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->navigationGroups([
                NavigationGroup::make()->label('Main'),
                NavigationGroup::make()->label('NEMT (Transport)'),
                NavigationGroup::make()->label('UI Setting'),
                NavigationGroup::make()->label('Home Slider Setting'),
                NavigationGroup::make()->label('Settings'),
                NavigationGroup::make()->label('Users/Roles'),
                NavigationGroup::make()->label('System'),
            ])
            ->renderHook(
                PanelsRenderHook::FOOTER,
                fn (): string => view('filament.footer')->render(),
            )
            ->default();
    }
}
