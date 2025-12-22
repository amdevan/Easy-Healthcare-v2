<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BoardMember;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class BoardMemberController extends Controller
{
    public function index(Request $request)
    {
        $query = BoardMember::query();

        if ($request->boolean('active')) {
            $query->where('is_active', true);
        }

        return response()->json(
            $query->orderBy('order')->orderBy('name')->paginate((int) $request->get('per_page', 20))
        );
    }

    public function show(BoardMember $boardMember)
    {
        return response()->json($boardMember);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'photo_path' => ['nullable', 'string', 'max:1024'],
            'bio' => ['nullable', 'string'],
            'email' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'links' => ['nullable'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data['order'] = (int) Arr::get($data, 'order', 0);
        if (is_string(Arr::get($data, 'links'))) {
            $decoded = json_decode($data['links'], true);
            $data['links'] = is_array($decoded) ? $decoded : [];
        }

        $member = BoardMember::create($data);
        return response()->json($member, 201);
    }

    public function update(Request $request, BoardMember $boardMember)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'photo_path' => ['nullable', 'string', 'max:1024'],
            'bio' => ['nullable', 'string'],
            'email' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'links' => ['nullable'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('order', $data)) {
            $data['order'] = (int) Arr::get($data, 'order', 0);
        }
        if (array_key_exists('links', $data) && is_string($data['links'])) {
            $decoded = json_decode($data['links'], true);
            $data['links'] = is_array($decoded) ? $decoded : [];
        }

        $boardMember->update($data);
        return response()->json($boardMember);
    }

    public function destroy(BoardMember $boardMember)
    {
        $boardMember->delete();
        return response()->noContent();
    }
}
