<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Login (Local)</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 2rem; }
        form { max-width: 360px; margin: 2rem auto; display: grid; gap: 0.75rem; }
        label { font-weight: 600; }
        input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 6px; }
        button { padding: 0.6rem 1rem; border: none; background: #0ea5e9; color: white; border-radius: 6px; }
        .error { color: #b91c1c; }
    </style>
    @csrf
</head>
<body>
    <h1>Simple Login (Local)</h1>
    @if ($errors->any())
        <div class="error">{{ $errors->first() }}</div>
    @endif
    <form method="POST" action="{{ route('dev.simple-login') }}">
        @csrf
        <label for="email">Email</label>
        <input id="email" name="email" type="email" value="{{ old('email', 'admin@example.com') }}" required>

        <label for="password">Password</label>
        <input id="password" name="password" type="password" value="password" required>

        <button type="submit">Log in</button>
    </form>

    <p>Tip: Uses session guard directly. Redirects to <code>/admin</code> on success.</p>
</body>
</html>