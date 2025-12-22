<x-filament-panels::page>
    <div class="space-y-6">
        <!-- Backups Section -->
        <x-filament::section>
            <x-slot name="heading">
                Create Backups
            </x-slot>
            <x-slot name="description">
                Generate and download backups of your system data.
            </x-slot>

            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                <!-- Full System -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                    <div class="flex items-center gap-4">
                        <div class="flex-shrink-0 p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                            <x-heroicon-o-server-stack class="w-6 h-6" style="width: 1.5rem; height: 1.5rem;" />
                        </div>
                        <div>
                            <h4 class="text-base font-medium text-gray-950 dark:text-white">Full System Backup</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Complete archive containing both database and uploaded files.
                            </p>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        {{ $this->backupSystemAction }}
                    </div>
                </div>

                <!-- Database Only -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                    <div class="flex items-center gap-4">
                        <div class="flex-shrink-0 p-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg text-warning-600 dark:text-warning-400">
                            <x-heroicon-o-circle-stack class="w-6 h-6" style="width: 1.5rem; height: 1.5rem;" />
                        </div>
                        <div>
                            <h4 class="text-base font-medium text-gray-950 dark:text-white">Database Only</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                SQL dump of the database (lightweight).
                            </p>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        {{ $this->backupDatabaseAction }}
                    </div>
                </div>

                <!-- Files Only -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                    <div class="flex items-center gap-4">
                        <div class="flex-shrink-0 p-2 bg-success-50 dark:bg-success-900/20 rounded-lg text-success-600 dark:text-success-400">
                            <x-heroicon-o-folder class="w-6 h-6" style="width: 1.5rem; height: 1.5rem;" />
                        </div>
                        <div>
                            <h4 class="text-base font-medium text-gray-950 dark:text-white">Files Only</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Zip archive of the storage directory.
                            </p>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        {{ $this->backupFilesAction }}
                    </div>
                </div>
            </div>
        </x-filament::section>

        <!-- Restoration Section -->
        <x-filament::section>
            <x-slot name="heading">
                System Restoration
            </x-slot>
            <x-slot name="description">
                Restore your system from a backup file.
            </x-slot>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 p-2 bg-danger-50 dark:bg-danger-900/20 rounded-lg text-danger-600 dark:text-danger-400">
                        <x-heroicon-o-exclamation-triangle class="w-6 h-6" style="width: 1.5rem; height: 1.5rem;" />
                    </div>
                    <div>
                        <h4 class="text-base font-medium text-gray-950 dark:text-white">Restore from Backup</h4>
                        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                            Upload a backup zip file to restore your database and/or files.
                            <span class="block mt-1 font-medium text-danger-600 dark:text-danger-400">
                                Warning: This will overwrite existing data.
                            </span>
                        </p>
                    </div>
                </div>
                <div class="flex-shrink-0">
                    {{ $this->restoreAction }}
                </div>
            </div>
        </x-filament::section>
    </div>
</x-filament-panels::page>
