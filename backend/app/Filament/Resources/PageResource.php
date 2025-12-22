<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;
use Illuminate\Support\Str;
use Filament\Schemas\Components\Utilities\Set;


use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationLabel = 'Pages';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-document-text';
    protected static ?int $navigationSort = 2;

    protected static function iconOptions(): array
    {
        return [
            'ArrowRight' => 'ArrowRight',
            'CheckCircle2' => 'CheckCircle2',
            'HeartPulse' => 'HeartPulse',
            'Stethoscope' => 'Stethoscope',
            'Pill' => 'Pill',
            'Baby' => 'Baby',
            'Activity' => 'Activity',
            'Heart' => 'Heart',
            'ShieldCheck' => 'ShieldCheck',
            'Microscope' => 'Microscope',
            'UserPlus' => 'UserPlus',
            'Calendar' => 'Calendar',
            'Clock' => 'Clock',
            'User' => 'User',
            'Mail' => 'Mail',
            'Phone' => 'Phone',
            'FileText' => 'FileText',
            'Check' => 'Check',
            'MapPin' => 'MapPin',
            'Search' => 'Search',
            'Filter' => 'Filter',
            'Star' => 'Star',
            'Menu' => 'Menu',
            'X' => 'X',
            'Facebook' => 'Facebook',
            'Twitter' => 'Twitter',
            'Instagram' => 'Instagram',
            'Linkedin' => 'Linkedin',
            'Youtube' => 'Youtube',
            'Globe' => 'Globe',
            'Truck' => 'Truck',
            'Leaf' => 'Leaf',
            'Droplet' => 'Droplet',
            'Thermometer' => 'Thermometer',
            'Syringe' => 'Syringe',
            'FlaskConical' => 'FlaskConical',
            'Dna' => 'Dna',
            'Brain' => 'Brain',
            'Bone' => 'Bone',
            'Eye' => 'Eye',
            'Ear' => 'Ear',
            'Smile' => 'Smile',
            'Frown' => 'Frown',
            'Meh' => 'Meh',
            'ThumbsUp' => 'ThumbsUp',
            'ThumbsDown' => 'ThumbsDown',
            'MessageCircle' => 'MessageCircle',
            'MessageSquare' => 'MessageSquare',
            'Send' => 'Send',
            'Paperclip' => 'Paperclip',
            'Image' => 'Image',
            'Camera' => 'Camera',
            'Video' => 'Video',
            'Mic' => 'Mic',
            'MicOff' => 'MicOff',
            'Volume2' => 'Volume2',
            'VolumeX' => 'VolumeX',
            'Settings' => 'Settings',
            'HelpCircle' => 'HelpCircle',
            'Info' => 'Info',
            'AlertCircle' => 'AlertCircle',
            'AlertTriangle' => 'AlertTriangle',
            'Bell' => 'Bell',
            'BellOff' => 'BellOff',
            'Lock' => 'Lock',
            'Unlock' => 'Unlock',
            'Key' => 'Key',
            'CreditCard' => 'CreditCard',
            'DollarSign' => 'DollarSign',
            'ShoppingCart' => 'ShoppingCart',
            'Briefcase' => 'Briefcase',
            'File' => 'File',
            'Folder' => 'Folder',
            'Home' => 'Home',
            'Layout' => 'Layout',
            'Grid' => 'Grid',
            'List' => 'List',
            'MoreHorizontal' => 'MoreHorizontal',
            'MoreVertical' => 'MoreVertical',
            'Plus' => 'Plus',
            'Minus' => 'Minus',
            'Edit' => 'Edit',
            'Trash' => 'Trash',
            'RefreshCw' => 'RefreshCw',
            'Download' => 'Download',
            'Upload' => 'Upload',
            'Share' => 'Share',
            'Printer' => 'Printer',
            'ChevronRight' => 'ChevronRight',
            'ChevronLeft' => 'ChevronLeft',
            'ChevronDown' => 'ChevronDown',
            'ChevronUp' => 'ChevronUp',
            'ExternalLink' => 'ExternalLink',
            'LogOut' => 'LogOut',
            'LogIn' => 'LogIn',
            'Smartphone' => 'Smartphone',
            'Monitor' => 'Monitor',
            'Database' => 'Database',
            'BarChart3' => 'BarChart3',
            'Lightbulb' => 'Lightbulb',
            'Rocket' => 'Rocket',
            'ArrowUpRight' => 'ArrowUpRight',
            'Store' => 'Store',
            'HandHeart' => 'HandHeart',
            'School' => 'School',
            'Megaphone' => 'Megaphone',
            'TrendingUp' => 'TrendingUp',
            'Ambulance' => 'Ambulance',
            'Building' => 'Building',
            'Building2' => 'Building2',
            'Users' => 'Users',
            'GraduationCap' => 'GraduationCap',
        ];
    }

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Group::make()
                ->schema([
                    Section::make('Page Details')
                        ->schema([
                            Forms\Components\TextInput::make('title')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                                ->maxLength(255),
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->maxLength(255),
                            Forms\Components\Toggle::make('is_active')
                                ->label('Active')
                                ->default(true)
                                ->helperText('Disable to hide this page from the frontend.'),
                        ])->columns(2),

                    Section::make('Hero Section')
                        ->schema([
                            Forms\Components\FileUpload::make('hero_image')
                                ->label('Hero Image')
                                ->image()
                                ->directory('pages/hero')
                                ->maxSize(2048)
                                ->columnSpanFull(),
                        ]),
                        
                    Section::make('Content Builder')
                        ->schema([
                            Forms\Components\Builder::make('content')
                                ->blocks([
                                    Forms\Components\Builder\Block::make('hero_section')
                                        ->label('Hero Section')
                                        ->icon('heroicon-o-star')
                                        ->schema([
                                            Forms\Components\TextInput::make('title')->required(),
                                            Forms\Components\Textarea::make('subtitle')->rows(3),
                                            Forms\Components\RichEditor::make('description'),
                                            Forms\Components\FileUpload::make('image')->image()->directory('pages/hero'),
                                            Forms\Components\TextInput::make('badge'),
                                            Forms\Components\TextInput::make('primary_button_text'),
                                            Forms\Components\TextInput::make('primary_button_link'),
                                            Forms\Components\TextInput::make('secondary_button_text'),
                                            Forms\Components\TextInput::make('secondary_button_link'),
                                            Forms\Components\Repeater::make('stats')
                                                ->schema([
                                                    Forms\Components\TextInput::make('value'),
                                                    Forms\Components\TextInput::make('label'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('text_block')
                                        ->label('Text Content')
                                        ->icon('heroicon-o-document-text')
                                        ->schema([
                                            Forms\Components\RichEditor::make('content')->label('Body Text')->required(),
                                        ]),
                                    Forms\Components\Builder\Block::make('features_list')
                                        ->label('Features List')
                                        ->icon('heroicon-o-list-bullet')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Repeater::make('features')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title')->required(),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                    Forms\Components\FileUpload::make('image')->image()->directory('pages/features'),
                                                    Forms\Components\TextInput::make('url'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('features_section')
                                        ->label('Features Section')
                                        ->icon('heroicon-o-list-bullet')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\RichEditor::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title')->required(),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                    Forms\Components\Repeater::make('details')->simple(Forms\Components\TextInput::make('detail')),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('services_section')
                                        ->label('Services Section')
                                        ->icon('heroicon-o-squares-2x2')
                                        ->schema([
                                            Forms\Components\TextInput::make('label'),
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\RichEditor::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title')->required(),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                    Forms\Components\TextInput::make('url'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('about_section')
                                        ->label('About Section')
                                        ->icon('heroicon-o-information-circle')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\RichEditor::make('description'),
                                            Forms\Components\FileUpload::make('images')->image()->multiple()->directory('pages/about'),
                                        ]),
                                    Forms\Components\Builder\Block::make('appointment_section')
                                        ->label('Appointment Section')
                                        ->icon('heroicon-o-calendar')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('subtitle'),
                                        ]),
                                    Forms\Components\Builder\Block::make('call_to_action')
                                        ->label('Call to Action (Legacy)')
                                        ->icon('heroicon-o-megaphone')
                                        ->schema([
                                            Forms\Components\TextInput::make('title')->required(),
                                            Forms\Components\RichEditor::make('description'),
                                            Forms\Components\TextInput::make('button_text')->required(),
                                            Forms\Components\TextInput::make('button_url')->required(),
                                        ]),
                                    Forms\Components\Builder\Block::make('cta_section')
                                        ->label('CTA Section')
                                        ->icon('heroicon-o-megaphone')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\TextInput::make('badge'),
                                            Forms\Components\TextInput::make('buttonText')->label('Button Text (Telemedicine)'),
                                            Forms\Components\TextInput::make('button_text')->label('Button Text (Services)'),
                                            Forms\Components\TextInput::make('primary_button_text')->label('Primary Button Text (About)'),
                                            Forms\Components\TextInput::make('button_url'),
                                            Forms\Components\TextInput::make('primary_button_link'),
                                            Forms\Components\TextInput::make('supportText'),
                                            Forms\Components\Repeater::make('secondary_links')
                                                ->schema([
                                                    Forms\Components\TextInput::make('text'),
                                                    Forms\Components\TextInput::make('link'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                ])->columns(3),
                                        ]),
                                    Forms\Components\Builder\Block::make('online_consultation_section')
                                        ->label('Online Consultation')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                        ]),
                                    Forms\Components\Builder\Block::make('in_clinic_consultation_section')
                                        ->label('In-Clinic Consultation')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                        ]),
                                    Forms\Components\Builder\Block::make('diagnostics_section')
                                        ->label('Diagnostics Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('subtitle'),
                                            Forms\Components\FileUpload::make('image')->image(),
                                            Forms\Components\Repeater::make('benefits')
                                                ->schema([
                                                    Forms\Components\TextInput::make('id'),
                                                    Forms\Components\TextInput::make('text'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('articles_section')
                                        ->label('Articles Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\FileUpload::make('default_image')->image(),
                                        ]),
                                    Forms\Components\Builder\Block::make('testimonials_list')
                                        ->label('Testimonials')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Repeater::make('testimonials')
                                                ->schema([
                                                    Forms\Components\Textarea::make('quote'),
                                                    Forms\Components\TextInput::make('author'),
                                                    Forms\Components\TextInput::make('role'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('download_app_section')
                                        ->label('Download App')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\TextInput::make('cta_text'),
                                            Forms\Components\TextInput::make('google_play_badge'),
                                            Forms\Components\TextInput::make('app_store_badge'),
                                            Forms\Components\FileUpload::make('image')->image(),
                                        ]),
                                    Forms\Components\Builder\Block::make('overview_section')
                                        ->label('Overview Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('label'),
                                                    Forms\Components\TextInput::make('value'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('benefits_section')
                                        ->label('Benefits Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\FileUpload::make('image')->image(),
                                            Forms\Components\TextInput::make('imageCaption'),
                                            Forms\Components\TagsInput::make('items')->placeholder('Add benefit items...'),
                                        ]),
                                    Forms\Components\Builder\Block::make('programs_section')
                                        ->label('Programs Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('tech_platform')
                                        ->label('Tech Platform')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\FileUpload::make('image')->image(),
                                            Forms\Components\TagsInput::make('items'),
                                        ]),
                                    Forms\Components\Builder\Block::make('how_it_works')
                                        ->label('How It Works')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Repeater::make('steps')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('impact_section')
                                        ->label('Impact Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->label('Items (Telemedicine)')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ])->columns(2),
                                            Forms\Components\Repeater::make('stats')
                                                ->label('Stats (About)')
                                                ->schema([
                                                    Forms\Components\TextInput::make('label'),
                                                    Forms\Components\TextInput::make('value'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                ])->columns(3),
                                            Forms\Components\Repeater::make('areas')
                                                ->label('Areas (About)')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('vehicles_list')
                                        ->label('Vehicles List')
                                        ->schema([
                                            Forms\Components\TextInput::make('label'),
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\TextInput::make('features_label'),
                                            Forms\Components\TextInput::make('cta_text'),
                                            Forms\Components\Repeater::make('vehicles')
                                                ->schema([
                                                    Forms\Components\TextInput::make('id'),
                                                    Forms\Components\TextInput::make('name'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\FileUpload::make('image')->image(),
                                                    Forms\Components\TagsInput::make('features'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('pricing_section')
                                        ->label('Pricing Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('label'),
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\TextInput::make('ctaText'),
                                            Forms\Components\TextInput::make('disclaimer'),
                                            Forms\Components\TextInput::make('customPackageTitle'),
                                            Forms\Components\Textarea::make('customPackageDescription'),
                                            Forms\Components\TextInput::make('customPackageButtonText'),
                                            Forms\Components\Repeater::make('tiers')
                                                ->label('Tiers (NEMT)')
                                                ->schema([
                                                    Forms\Components\TextInput::make('name'),
                                                    Forms\Components\TextInput::make('price')
                                                        ->label('Price (USD)')
                                                        ->numeric(),
                                                    Forms\Components\TextInput::make('priceNpr')
                                                        ->label('Price (NPR)')
                                                        ->numeric(),
                                                    Forms\Components\TextInput::make('unit'),
                                                    Forms\Components\TagsInput::make('features'),
                                                    Forms\Components\Toggle::make('highlighted'),
                                                ])->columns(2),
                                            Forms\Components\Repeater::make('plans')
                                                ->label('Plans (Membership)')
                                                ->schema([
                                                    Forms\Components\TextInput::make('id'),
                                                    Forms\Components\TextInput::make('name'),
                                                    Forms\Components\TextInput::make('price')
                                                        ->label('Price (USD)')
                                                        ->numeric(),
                                                    Forms\Components\TextInput::make('priceNpr')
                                                        ->label('Price (NPR)')
                                                        ->numeric(),
                                                    Forms\Components\TextInput::make('period'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\TextInput::make('buttonText'),
                                                    Forms\Components\Repeater::make('features')
                                                        ->schema([
                                                            Forms\Components\TextInput::make('text'),
                                                            Forms\Components\Toggle::make('included')->default(true),
                                                        ])->columns(2),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('booking_section')
                                        ->label('Booking Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            // Complex nested schema for labels/placeholders omitted for brevity, assuming standard keys
                                        ]),
                                    Forms\Components\Builder\Block::make('stats_section')
                                        ->label('Stats Section')
                                        ->schema([
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('value'),
                                                    Forms\Components\TextInput::make('label'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('core_values')
                                        ->label('Core Values')
                                        ->schema([
                                            Forms\Components\TextInput::make('mission.title'),
                                            Forms\Components\Textarea::make('mission.description'),
                                            Forms\Components\Select::make('mission.icon')
                                                ->options(self::iconOptions())
                                                ->searchable()
                                                ->preload()
                                                ->nullable(),
                                            Forms\Components\TextInput::make('vision.title'),
                                            Forms\Components\Textarea::make('vision.description'),
                                            Forms\Components\Select::make('vision.icon')
                                                ->options(self::iconOptions())
                                                ->searchable()
                                                ->preload()
                                                ->nullable(),
                                            Forms\Components\TextInput::make('values.title'),
                                            Forms\Components\Select::make('values.icon')
                                                ->options(self::iconOptions())
                                                ->searchable()
                                                ->preload()
                                                ->nullable(),
                                            Forms\Components\Repeater::make('values.items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ]),
                                        ]),
                                    Forms\Components\Builder\Block::make('our_story')
                                        ->label('Our Story')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Textarea::make('description_1'),
                                            Forms\Components\Textarea::make('description_2'),
                                            Forms\Components\Textarea::make('quote'),
                                            Forms\Components\FileUpload::make('image')->image(),
                                            Forms\Components\TagsInput::make('services'),
                                        ]),
                                    Forms\Components\Builder\Block::make('ecosystem_section')
                                        ->label('Ecosystem Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                    Forms\Components\Select::make('color')
                                                        ->options([
                                                            'blue' => 'blue',
                                                            'green' => 'green',
                                                            'purple' => 'purple',
                                                            'rose' => 'rose',
                                                        ])
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('future_section')
                                        ->label('Future Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('steps')
                                                ->schema([
                                                    Forms\Components\TextInput::make('year'),
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                ])->columns(3),
                                        ]),
                                    Forms\Components\Builder\Block::make('contact_info')
                                        ->label('Contact Info')
                                        ->schema([
                                            Forms\Components\TextInput::make('phone'),
                                            Forms\Components\TextInput::make('email'),
                                            Forms\Components\TextInput::make('address'),
                                            Forms\Components\Textarea::make('hours'),
                                            Forms\Components\TextInput::make('map_url'),
                                        ]),
                                    Forms\Components\Builder\Block::make('form_section')
                                        ->label('Form Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                        ]),
                                    Forms\Components\Builder\Block::make('packages_section')
                                        ->label('Packages Section')
                                        ->schema([
                                            Forms\Components\Repeater::make('packages')
                                                ->schema([
                                                    Forms\Components\TextInput::make('id'),
                                                    Forms\Components\TextInput::make('name'),
                                                    Forms\Components\TextInput::make('price')
                                                        ->label('Price (NPR)')
                                                        ->numeric(),
                                                    Forms\Components\TextInput::make('priceUsd')
                                                        ->label('Price (USD)')
                                                        ->numeric(),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\TagsInput::make('features'),
                                                    Forms\Components\Toggle::make('is_popular'),
                                                    Forms\Components\TextInput::make('category'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('basics_section')
                                        ->label('Basics Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\TagsInput::make('items'),
                                        ]),
                                    Forms\Components\Builder\Block::make('process_section')
                                        ->label('Process Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('steps')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('locations_list')
                                        ->label('Locations List')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('locations')
                                                ->schema([
                                                    Forms\Components\TextInput::make('id'),
                                                    Forms\Components\TextInput::make('name'),
                                                    Forms\Components\TextInput::make('type'),
                                                    Forms\Components\TextInput::make('address'),
                                                    Forms\Components\TextInput::make('phone'),
                                                    Forms\Components\TextInput::make('hours'),
                                                    Forms\Components\FileUpload::make('image')->image(),
                                                    Forms\Components\TagsInput::make('features'),
                                                    Forms\Components\TagsInput::make('tech_specs'),
                                                    Forms\Components\Toggle::make('is_primary'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('infrastructure_highlights')
                                        ->label('Infrastructure Highlights')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Repeater::make('highlights')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\FileUpload::make('image')->image(),
                                                    Forms\Components\Toggle::make('reverse'),
                                                    Forms\Components\TextInput::make('badge'),
                                                    Forms\Components\TagsInput::make('features'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('upload_section')
                                        ->label('Upload Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                        ]),
                                    Forms\Components\Builder\Block::make('coming_soon_section')
                                        ->label('Coming Soon Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                            Forms\Components\Repeater::make('features')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('events_section')
                                        ->label('Events Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\TextInput::make('date'),
                                                    Forms\Components\TextInput::make('time'),
                                                    Forms\Components\TextInput::make('location'),
                                                    Forms\Components\Textarea::make('description'),
                                                    Forms\Components\TextInput::make('type'),
                                                    Forms\Components\TextInput::make('spots_left'),
                                                ])->columns(2),
                                        ]),
                                    Forms\Components\Builder\Block::make('volunteer_section')
                                        ->label('Volunteer Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\Textarea::make('description'),
                                        ]),
                                    Forms\Components\Builder\Block::make('value_prop_section')
                                        ->label('Value Prop Section')
                                        ->schema([
                                            Forms\Components\TextInput::make('title'),
                                            Forms\Components\TextInput::make('subtitle'),
                                            Forms\Components\Repeater::make('items')
                                                ->schema([
                                                    Forms\Components\TextInput::make('title'),
                                                    Forms\Components\Select::make('icon')
                                                        ->options(self::iconOptions())
                                                        ->searchable()
                                                        ->preload()
                                                        ->nullable(),
                                                    Forms\Components\TagsInput::make('points'),
                                                ])->columns(2),
                                        ]),
                                ])
                                ->columnSpanFull(),
                        ]),
                ])->columnSpan(2),

            Group::make()
                ->schema([
                    Section::make('SEO Settings')
                        ->schema([
                            Forms\Components\TextInput::make('seo_title')
                                ->label('SEO Title')
                                ->placeholder('Browser Tab Title')
                                ->maxLength(255),
                            Forms\Components\Textarea::make('seo_description')
                                ->label('Meta Description')
                                ->placeholder('Search engine summary...')
                                ->rows(3)
                                ->maxLength(500),
                        ]),
                    Section::make('Settings')
                        ->schema([
                            Forms\Components\TextInput::make('sort_order')
                                ->numeric()
                                ->default(0)
                                ->label('Sort Order'),
                            Forms\Components\Placeholder::make('created_at')
                                ->label('Created at')
                                ->content(fn (Page $record): ?string => $record->created_at?->diffForHumans()),
                            Forms\Components\Placeholder::make('updated_at')
                                ->label('Last modified')
                                ->content(fn (Page $record): ?string => $record->updated_at?->diffForHumans()),
                        ]),
                ])->columnSpan(1),
        ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')
                ->searchable()
                ->sortable()
                ->weight('bold'),
            Tables\Columns\TextColumn::make('slug')
                ->searchable()
                ->color('gray'),
            Tables\Columns\IconColumn::make('is_active')
                ->boolean()
                ->label('Active')
                ->sortable(),
            Tables\Columns\TextColumn::make('updated_at')
                ->dateTime()
                ->sortable()
                ->label('Last Updated'),
        ])->filters([
            //
        ])->actions([
            EditAction::make(),
            DeleteAction::make(),
        ])->bulkActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
