@extends('install.layout')

@section('content')
<h2 class="text-2xl font-semibold mb-6">Server Requirements</h2>

<div class="space-y-3 mb-8">
    @foreach($requirements as $label => $met)
    <div class="flex items-center justify-between p-3 rounded {{ $met ? 'bg-green-50' : 'bg-red-50' }}">
        <span class="font-medium {{ $met ? 'text-green-800' : 'text-red-800' }}">{{ $label }}</span>
        @if($met)
            <span class="text-green-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
        @else
            <span class="text-red-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </span>
        @endif
    </div>
    @endforeach
</div>

<div class="flex justify-between">
    <a href="{{ route('install.index') }}" class="text-gray-600 hover:text-gray-800 px-4 py-2">Back</a>
    @if($allMet)
        <a href="{{ route('install.database') }}" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Next: Database</a>
    @else
        <button disabled class="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed">Fix Requirements to Continue</button>
    @endif
</div>
@endsection
