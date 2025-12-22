<?php

namespace App\Policies;

use App\Models\User;
use App\Models\LabAppointment;
use Illuminate\Auth\Access\Response;

class LabAppointmentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view_lab_appointments');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LabAppointment $model): bool
    {
        return $user->hasPermission('view_lab_appointments');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('create_lab_appointments');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LabAppointment $model): bool
    {
        return $user->hasPermission('edit_lab_appointments');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LabAppointment $model): bool
    {
        return $user->hasPermission('delete_lab_appointments');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, LabAppointment $model): bool
    {
        return $user->hasPermission('edit_lab_appointments');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, LabAppointment $model): bool
    {
        return $user->hasPermission('delete_lab_appointments');
    }
}