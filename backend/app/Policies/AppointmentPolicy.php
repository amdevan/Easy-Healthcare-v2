<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Appointment;
use Illuminate\Auth\Access\Response;

class AppointmentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view_appointments');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Appointment $model): bool
    {
        return $user->hasPermission('view_appointments');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('create_appointments');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Appointment $model): bool
    {
        return $user->hasPermission('edit_appointments');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Appointment $model): bool
    {
        return $user->hasPermission('delete_appointments');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Appointment $model): bool
    {
        return $user->hasPermission('edit_appointments');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Appointment $model): bool
    {
        return $user->hasPermission('delete_appointments');
    }
}