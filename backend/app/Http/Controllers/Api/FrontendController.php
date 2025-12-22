<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UiSetting;
use App\Models\Article;
use App\Models\Doctor;
use App\Models\Specialty;
use App\Models\LabTest;
use App\Models\Banner;
use App\Models\Faq;
use App\Models\Testimonial;
use App\Models\Media;
use App\Models\BoardMember;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        $header = UiSetting::query()->where('key', 'header')->value('value');
        $footer = UiSetting::query()->where('key', 'footer')->value('value');

        $pages = UiSetting::query()
            ->where('key', 'like', 'page.%')
            ->orderBy('key')
            ->get(['key', 'value']);

        $articles = Article::query()->orderByDesc('created_at')->get();
        $doctors = Doctor::query()->orderByDesc('id')->get();
        $specialties = Specialty::query()->orderBy('name')->get();
        $labTests = LabTest::query()->orderBy('name')->get();
        $banners = Banner::query()->orderByDesc('id')->get();
        $faqs = Faq::query()->orderBy('order')->get();
        $testimonials = Testimonial::query()->orderBy('order')->get();
        $media = Media::query()->orderByDesc('id')->get();
        $boardMembers = BoardMember::query()->where('is_active', true)->orderBy('order')->orderBy('name')->get();

        return response()->json([
            'header' => $header,
            'footer' => $footer,
            'pages' => $pages,
            'articles' => $articles,
            'doctors' => $doctors,
            'specialties' => $specialties,
            'labTests' => $labTests,
            'banners' => $banners,
            'faqs' => $faqs,
            'testimonials' => $testimonials,
            'media' => $media,
            'boardMembers' => $boardMembers,
        ]);
    }
}
