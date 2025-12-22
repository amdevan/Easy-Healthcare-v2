@extends('install.layout')

@section('content')
<h2 class="text-2xl font-semibold mb-6">Admin Account</h2>

<form action="{{ route('install.admin.process') }}" method="POST">
    @csrf
    
    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Full Name</label>
        <input type="text" name="name" value="{{ old('name') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>
        <input type="email" name="email" value="{{ old('email') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input type="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <div class="flex justify-end mt-8">
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Create Admin</button>
    </div>
</form>
@endsection
