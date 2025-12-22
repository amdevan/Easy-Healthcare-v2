<div class="rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-sm text-left divide-y divide-gray-200 dark:divide-white/5">
            <thead class="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-400">
                <tr>
                    <th class="px-12 py-6 font-semibold text-gray-900 dark:text-white" style="min-width: 200px; padding: 24px 48px;">Doctor</th>
                    <th class="px-12 py-6 font-semibold text-gray-900 dark:text-white" style="min-width: 250px; padding: 24px 48px;">Date & Time</th>
                    <th class="px-12 py-6 font-semibold text-gray-900 dark:text-white" style="min-width: 150px; padding: 24px 48px;">Status</th>
                    <th class="px-12 py-6 font-semibold text-gray-900 dark:text-white" style="min-width: 300px; padding: 24px 48px;">Notes</th>
                    <th class="px-12 py-6 font-semibold text-gray-900 dark:text-white" style="min-width: 120px; padding: 24px 48px;">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-white/5 bg-white dark:bg-gray-900">
                @forelse($appointments as $appointment)
                    <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition duration-75">
                        <td class="px-12 py-6 font-medium text-gray-900 dark:text-white whitespace-nowrap" style="padding: 24px 48px;">
                            {{ $appointment->doctor->name ?? 'N/A' }}
                        </td>
                        <td class="px-12 py-6 text-gray-600 dark:text-gray-300 whitespace-nowrap" style="padding: 24px 48px;">
                            {{ \Carbon\Carbon::parse($appointment->scheduled_at)->format('M d, Y h:i A') }}
                        </td>
                        <td class="px-12 py-6 whitespace-nowrap" style="padding: 24px 48px;">
                            @php
                                $colorClasses = match ($appointment->status) {
                                    'confirmed', 'completed' => 'text-green-700 bg-green-50 ring-green-600/20 dark:text-green-400 dark:bg-green-500/10 dark:ring-green-500/20',
                                    'cancelled' => 'text-red-700 bg-red-50 ring-red-600/20 dark:text-red-400 dark:bg-red-500/10 dark:ring-red-500/20',
                                    'pending' => 'text-yellow-700 bg-yellow-50 ring-yellow-600/20 dark:text-yellow-400 dark:bg-yellow-500/10 dark:ring-yellow-500/20',
                                    default => 'text-gray-700 bg-gray-50 ring-gray-600/20 dark:text-gray-400 dark:bg-gray-500/10 dark:ring-gray-500/20',
                                };
                            @endphp
                            <div class="flex">
                                <span class="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset {{ $colorClasses }}">
                                    {{ ucfirst($appointment->status) }}
                                </span>
                            </div>
                        </td>
                        <td class="px-12 py-6 text-gray-600 dark:text-gray-300 max-w-xs truncate" style="padding: 24px 48px;">
                            {{ $appointment->notes }}
                        </td>
                        <td class="px-12 py-6" style="padding: 24px 48px;">
                            <a href="{{ \App\Filament\Resources\AppointmentResource::getUrl('edit', ['record' => $appointment]) }}" 
                               class="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-primary-600/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                                <svg class="text-gray-500 dark:text-gray-400" style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Edit
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-12 py-12 text-center text-gray-500 dark:text-gray-400" style="padding: 48px;">
                            <div class="flex flex-col items-center justify-center">
                                <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span class="mt-2 text-sm font-medium">No appointments found</span>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
