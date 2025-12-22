<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Media;
use Illuminate\Auth\Access\Response;

class MediaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view_media');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Media $model): bool
    {
        return $user->hasPermission('view_media');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('create_media');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Media $model): bool
    {
        return $user->hasPermission('edit_media');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Media $model): bool
    {
        return $user->hasPermission('delete_media');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Media $model): bool
    {
        return $user->hasPermission('edit_media');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Media $model): bool
    {
        return $user->hasPermission('delete_media');
    }
}