## POST /api/v1/auth/login

### Description

Authenticates a user and returns a JWT token.

---

### Authentication

None (Public)

---

### Request

```json
{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

---

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cuid123",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-07-25T00:00:00Z",
      "updatedAt": "2026-07-25T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Error Responses

400
401
403

---

### Notes

Token expires in 1 day. Inactive accounts will receive a 403 Forbidden error.

---

### Example cURL

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Password123!"}'
```

<br><br>

## GET /api/v1/auth/me

### Description

Fetches the currently authenticated user's profile.

---

### Authentication

Bearer Token (Any valid user)

---

### Request

```json
{}
```

---

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "cuid123",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-07-25T00:00:00Z",
    "updatedAt": "2026-07-25T00:00:00Z"
  }
}
```

---

### Error Responses

401

---

### Notes

Uses the Authorization header to identify the user.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
