<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::orderByDesc('published_at')->paginate(10));
    }

    public function show(Article $article)
    {
        return response()->json($article);
    }
}