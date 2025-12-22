@extends('install.layout')

@section('content')
<h2 class="text-2xl font-semibold mb-6">Database Setup</h2>

<form action="{{ route('install.database.process') }}" method="POST">
    @csrf
    
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="host">Host</label>
            <input type="text" name="host" value="{{ old('host', '127.0.0.1') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="port">Port</label>
            <input type="text" name="port" value="{{ old('port', '3306') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
    </div>

    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="database">Database Name</label>
        <input type="text" name="database" value="{{ old('database') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="easy_healthcare">
    </div>

    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input type="text" name="username" value="{{ old('username', 'root') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input type="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="border-t pt-4 mt-6">
        <h3 class="text-lg font-semibold mb-4">App URL Configuration</h3>
        <p class="text-sm text-gray-600 mb-4">Enter the URLs where your app will be hosted.</p>
        
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="app_url">Backend URL (API)</label>
            <input type="text" name="app_url" value="{{ old('app_url', url('/')) }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="http://api.domain.com">
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="frontend_url">Frontend URL</label>
            <input type="text" name="frontend_url" value="{{ old('frontend_url', 'http://localhost:3000') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="http://domain.com">
        </div>
    </div>

    <div class="flex justify-between mt-8">
        <a href="{{ route('install.requirements') }}" class="text-gray-600 hover:text-gray-800 px-4 py-2">Back</a>
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save & Migrate</button>
    </div>
</form>
@endsection
