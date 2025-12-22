<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class InstallController extends Controller
{
    public function index()
    {
        return view('install.welcome');
    }

    public function requirements()
    {
        $requirements = [
            'PHP >= 8.2' => version_compare(phpversion(), '8.2.0', '>='),
            'BCMath Extension' => extension_loaded('bcmath'),
            'Ctype Extension' => extension_loaded('ctype'),
            'JSON Extension' => extension_loaded('json'),
            'Mbstring Extension' => extension_loaded('mbstring'),
            'OpenSSL Extension' => extension_loaded('openssl'),
            'PDO Extension' => extension_loaded('pdo'),
            'Tokenizer Extension' => extension_loaded('tokenizer'),
            'XML Extension' => extension_loaded('xml'),
        ];

        $allMet = !in_array(false, $requirements);

        return view('install.requirements', compact('requirements', 'allMet'));
    }

    public function database()
    {
        return view('install.database');
    }

    public function processDatabase(Request $request)
    {
        $request->validate([
            'host' => 'required',
            'port' => 'required',
            'database' => 'required',
            'username' => 'required',
        ]);

        try {
            // Test connection
            $connection = new \PDO(
                "mysql:host={$request->host};port={$request->port};dbname={$request->database}",
                $request->username,
                $request->password
            );
            $connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\Exception $e) {
            return back()->withErrors(['connection' => 'Could not connect to database: ' . $e->getMessage()])->withInput();
        }

        // Write to .env
        $this->updateEnv([
            'DB_HOST' => $request->host,
            'DB_PORT' => $request->port,
            'DB_DATABASE' => $request->database,
            'DB_USERNAME' => $request->username,
            'DB_PASSWORD' => $request->password ?? '',
            'APP_URL' => $request->app_url ?? url('/'),
            'FRONTEND_URL' => $request->frontend_url ?? 'http://localhost:3000',
            'CORS_ALLOWED_ORIGINS' => $request->frontend_url ?? 'http://localhost:3000',
            'SANCTUM_STATEFUL_DOMAINS' => parse_url($request->frontend_url ?? 'http://localhost:3000', PHP_URL_HOST) . ':' . (parse_url($request->frontend_url ?? 'http://localhost:3000', PHP_URL_PORT) ?? '80'),
        ]);

        // Run migrations
        try {
             // We need to clear config cache to pick up new env vars, 
             // but artisan config:clear might not be enough in the same request.
             // However, for the next request it will work.
             // We can temporarily set config for this request to run migrations.
             config([
                'database.connections.mysql.host' => $request->host,
                'database.connections.mysql.port' => $request->port,
                'database.connections.mysql.database' => $request->database,
                'database.connections.mysql.username' => $request->username,
                'database.connections.mysql.password' => $request->password,
             ]);
             
             Artisan::call('migrate:fresh', ['--force' => true]);
             Artisan::call('db:seed', ['--force' => true]);
             Artisan::call('storage:link');
        } catch (\Exception $e) {
             return back()->withErrors(['migration' => 'Migration failed: ' . $e->getMessage()]);
        }

        return redirect()->route('install.admin');
    }

    public function admin()
    {
        return view('install.admin');
    }

    public function processAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Create Admin
        $role = Role::where('slug', 'admin')->first();
        if (!$role) {
             $role = Role::create(['name' => 'Admin', 'slug' => 'admin']);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
            'email_verified_at' => now(),
        ]);

        // Create installed file
        File::put(storage_path('installed'), 'Installed on ' . now());

        return redirect()->route('install.finish');
    }

    public function finish()
    {
        return view('install.finish');
    }

    protected function updateEnv($data)
    {
        $path = base_path('.env');
        if (!file_exists($path)) {
            copy(base_path('.env.example'), $path);
        }

        $envContent = file_get_contents($path);

        foreach ($data as $key => $value) {
            $value = '"' . trim($value) . '"'; // Wrap in quotes
            if (strpos($envContent, "{$key}=") !== false) {
                $envContent = preg_replace("/^{$key}=.*/m", "{$key}={$value}", $envContent);
            } else {
                $envContent .= "\n{$key}={$value}";
            }
        }

        file_put_contents($path, $envContent);
    }
}
