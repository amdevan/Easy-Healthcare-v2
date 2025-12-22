<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Page;
use Illuminate\Auth\Access\Response;

class PagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view_pages');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Page $model): bool
    {
        return $user->hasPermission('view_pages');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('create_pages');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Page $model): bool
    {
        return $user->hasPermission('edit_pages');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Page $model): bool
    {
        return $user->hasPermission('delete_pages');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Page $model): bool
    {
        return $user->hasPermission('edit_pages');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Page $model): bool
    {
        return $user->hasPermission('delete_pages');
    }
}