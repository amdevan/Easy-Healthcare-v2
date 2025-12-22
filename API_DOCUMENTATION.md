# Easy Healthcare 101 v2 - API Documentation

## Base URL
All API requests should be prefixed with:
`http://<your-domain>/api`

(For local development: `http://localhost:8000/api`)

## Authentication
The API uses **Bearer Token** authentication (Laravel Sanctum).
Include the token in the header for protected routes:
`Authorization: Bearer <your_access_token>`

### 1. Register Patient
Create a new user account and patient profile.

*   **Endpoint:** `POST /register`
*   **Body Parameters:**
    *   `name` (string, required): Full name of the user.
    *   `email` (string, required): Valid email address (must be unique).
    *   `password` (string, required): Min 8 characters.
    *   `password_confirmation` (string, required): Must match password.
    *   `phone` (string, optional): Contact number.

**Response (201 Created):**
```json
{
    "access_token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz",
    "token_type": "Bearer",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        ...
    },
    "patient": {
        "id": 1,
        "user_id": 1,
        "name": "John Doe",
        ...
    }
}
```

### 2. Login
Authenticate an existing user.

*   **Endpoint:** `POST /login`
*   **Body Parameters:**
    *   `email` (string, required)
    *   `password` (string, required)

**Response (200 OK):**
```json
{
    "access_token": "2|AbCdEfGhIjKlMnOpQrStUvWxYz",
    "token_type": "Bearer",
    "user": { ... },
    "patient": { ... }
}
```

### 3. Get Current User (Me)
Get details of the currently logged-in user.

*   **Endpoint:** `GET /me`
*   **Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "patient": { ... }
}
```

### 4. Logout
Invalidate the current access token.

*   **Endpoint:** `POST /logout`
*   **Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
    "message": "Logged out"
}
```

---

## Patient Panel (Protected)
All endpoints in this section require `Authorization: Bearer <token>`.
Base path: `/api/my`

### 1. Update Profile
Update patient personal details.

*   **Endpoint:** `PUT /my/profile`
*   **Body Parameters:**
    *   `name` (string, optional)
    *   `phone` (string, optional)
    *   `address` (string, optional)
    *   `dob` (date, optional, format: YYYY-MM-DD)
    *   `gender` (string, optional, values: male, female, other)
    *   `blood_type` (string, optional)

**Response (200 OK):**
```json
{
    "user": { ...updated user... },
    "patient": { ...updated patient... }
}
```

### 2. List Appointments
Get a paginated list of the patient's appointments.

*   **Endpoint:** `GET /my/appointments`
*   **Query Parameters:**
    *   `status` (string, optional): Filter by status (pending, confirmed, completed, cancelled).
    *   `page` (int, optional): Page number (default: 1).

**Response (200 OK):**
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 10,
            "doctor": { "name": "Dr. Smith", ... },
            "scheduled_at": "2025-12-25 10:00:00",
            "status": "confirmed",
            ...
        }
    ],
    ...
}
```

### 3. Book Appointment
Schedule a new appointment.

*   **Endpoint:** `POST /my/appointments`
*   **Body Parameters:**
    *   `doctor_id` (int, required): ID of the doctor.
    *   `scheduled_at` (datetime, required): Format `YYYY-MM-DD HH:mm:ss`.
    *   `notes` (string, optional): Reason for visit.

**Response (201 Created):**
```json
{
    "id": 12,
    "status": "pending",
    "scheduled_at": "2025-12-30 14:30:00",
    ...
}
```

### 4. Cancel Appointment
Cancel a pending or confirmed appointment.

*   **Endpoint:** `POST /my/appointments/{id}/cancel`

**Response (200 OK):**
```json
{
    "id": 12,
    "status": "cancelled",
    ...
}
```

### 5. Medical Records
View prescriptions and lab history.

*   **Get Prescriptions:** `GET /my/prescriptions`
*   **Get Lab Appointments:** `GET /my/lab-appointments`

---

## Public Data (No Auth Required)

*   **List Doctors:** `GET /doctors`
*   **Doctor Details:** `GET /doctors/{id}`
*   **Doctor Availability:** `GET /doctors/{id}/availability`
*   **Specialties:** `GET /specialties`
*   **Lab Tests:** `GET /lab-tests`
*   **Articles:** `GET /articles`
*   **FAQs:** `GET /faqs`
