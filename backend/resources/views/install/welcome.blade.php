@extends('install.layout')

@section('content')
<div class="text-center">
    <h2 class="text-2xl font-semibold mb-4">Welcome</h2>
    <p class="mb-6 text-gray-600">
        Welcome to the Easy Healthcare 101 installation wizard. This tool will help you set up your database, admin account, and get your application running in minutes.
    </p>
    
    <div class="space-y-4">
        <a href="{{ route('install.requirements') }}" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Start Installation
        </a>
    </div>
</div>
@endsection
