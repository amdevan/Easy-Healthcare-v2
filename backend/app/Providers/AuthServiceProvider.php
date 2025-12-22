<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\BoardMember;
use App\Policies\BoardMemberPolicy;
use App\Models\Inquiry;
use App\Policies\InquiryPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        BoardMember::class => BoardMemberPolicy::class,
        Inquiry::class => InquiryPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}

