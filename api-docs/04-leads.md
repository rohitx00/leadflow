## POST /api/v1/leads/public

### Description

Captures a new lead publicly (e.g. from a website form).

---

### Authentication

None (Public)

---

### Request

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "555-1234",
  "company": "Acme Corp",
  "message": "I want a demo"
}
```

---

### Success Response (201)

```json
{
  "success": true,
  "message": "Lead captured successfully",
  "data": {
    "id": "cuid123"
  }
}
```

---

### Error Responses

400

---

### Notes

Automatically creates an activity log for "LEAD_CREATED".

---

### Example cURL

```bash
curl -X POST http://localhost:5000/api/v1/leads/public \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","email":"john.smith@example.com","phone":"555-1234"}'
```

<br><br>

## GET /api/v1/leads

### Description

Fetches a paginated list of leads along with analytics aggregations.

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
  "data": [
    {
      "id": "cuid123",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "status": "NEW",
      "assignedToId": null,
      "createdAt": "2026-07-25T00:00:00Z"
    }
  ],
  "analytics": {
    "totalLeads": 1,
    "newLeads": 1,
    "wonLeads": 0,
    "lostLeads": 0
  },
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### Error Responses

401

---

### Notes

Admins see all leads. Members only see leads assigned to them. Supports query parameters (see Pagination & Filtering docs).

---

### Example cURL

```bash
curl -X GET "http://localhost:5000/api/v1/leads?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## GET /api/v1/leads/:id

### Description

Fetches a single lead by ID, including its notes and activities.

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
    "firstName": "John",
    "email": "john.smith@example.com",
    "status": "NEW",
    "notes": [],
    "activities": []
  }
}
```

---

### Error Responses

401
403
404

---

### Notes

Members can only view leads assigned to them.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/leads/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## PATCH /api/v1/leads/:id

### Description

Updates a lead's information (status, assignment, or details).

---

### Authentication

Bearer Token (Any valid user)

---

### Request

```json
{
  "status": "CONTACTED"
}
```

---

### Success Response (200)

```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "id": "cuid123",
    "status": "CONTACTED"
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

Automatically logs an activity if the `status` or `assignedToId` changes.

---

### Example cURL

```bash
curl -X PATCH http://localhost:5000/api/v1/leads/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"status":"CONTACTED"}'
```

<br><br>

## DELETE /api/v1/leads/:id

### Description

Permanently deletes a lead and all associated notes/activities.

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
  "message": "Lead deleted successfully"
}
```

---

### Error Responses

401
403
404

---

### Notes

This action is irreversible.

---

### Example cURL

```bash
curl -X DELETE http://localhost:5000/api/v1/leads/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
