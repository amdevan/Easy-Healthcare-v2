@extends('install.layout')

@section('content')
<div class="text-center">
    <div class="mb-6">
        <svg class="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    
    <h2 class="text-2xl font-semibold mb-4">Installation Complete!</h2>
    <p class="mb-6 text-gray-600">
        Easy Healthcare 101 has been successfully installed. You can now access your administration panel and website.
    </p>
    
    <div class="flex justify-center space-x-4">
        <a href="{{ url('/') }}" class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">Go to Website</a>
        <a href="{{ url('/admin') }}" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Go to Admin Panel</a>
    </div>
</div>
@endsection
