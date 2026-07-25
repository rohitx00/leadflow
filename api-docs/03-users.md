## POST /api/v1/users

### Description

Creates a new user.

---

### Authentication

Admin only

---

### Request

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123!",
  "role": "MEMBER"
}
```

---

### Success Response (201)

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "cuid123"
  }
}
```

---

### Error Responses

400
401
403
409

---

### Notes

The password must be at least 8 characters. Valid roles are `ADMIN` and `MEMBER`.

---

### Example cURL

```bash
curl -X POST http://localhost:5000/api/v1/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"Password123!","role":"MEMBER"}'
```

<br><br>

## GET /api/v1/users

### Description

Fetches a list of all users.

---

### Authentication

Admin only

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
  "data": [
    {
      "id": "cuid123",
      "email": "jane@example.com",
      "name": "Jane Doe",
      "role": "MEMBER",
      "isActive": true,
      "createdAt": "2026-07-25T00:00:00Z"
    }
  ]
}
```

---

### Error Responses

401
403

---

### Notes

Passwords are not returned in the response.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## GET /api/v1/users/report

### Description

Fetches performance metrics (assigned leads, conversion rates) for all members.

---

### Authentication

Admin only

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
  "data": [
    {
      "id": "cuid123",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "metrics": {
        "assignedLeads": 10,
        "activePipeline": 5,
        "wonLeads": 3,
        "conversionRate": 30
      }
    }
  ]
}
```

---

### Error Responses

401
403

---

### Notes

Used for rendering the admin dashboard report table.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/users/report \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## PATCH /api/v1/users/:id/role

### Description

Updates a user's role.

---

### Authentication

Admin only

---

### Request

```json
{
  "role": "ADMIN"
}
```

---

### Success Response (200)

```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "id": "cuid123",
    "role": "ADMIN"
  }
}
```

---

### Error Responses

400
401
403
404

---

### Notes

Valid roles are `ADMIN` and `MEMBER`.

---

### Example cURL

```bash
curl -X PATCH http://localhost:5000/api/v1/users/cuid123/role \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"role":"ADMIN"}'
```

<br><br>

## PATCH /api/v1/users/:id/status

### Description

Activates or deactivates a user account.

---

### Authentication

Admin only

---

### Request

```json
{
  "isActive": false
}
```

---

### Success Response (200)

```json
{
  "success": true,
  "message": "User status updated successfully",
  "data": {
    "id": "cuid123",
    "isActive": false
  }
}
```

---

### Error Responses

400
401
403
404

---

### Notes

Deactivated users cannot log in.

---

### Example cURL

```bash
curl -X PATCH http://localhost:5000/api/v1/users/cuid123/status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"isActive":false}'
```

<br><br>

## DELETE /api/v1/users/:id

### Description

Permanently deletes a user.

---

### Authentication

Admin only

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
  "message": "User deleted successfully"
}
```

---

### Error Responses

400
401
403
404

---

### Notes

Cannot delete yourself. This action is irreversible.

---

### Example cURL

```bash
curl -X DELETE http://localhost:5000/api/v1/users/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
