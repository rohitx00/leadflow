## GET /api/v1/tasks/my-tasks

### Description

Fetches all tasks assigned to the currently authenticated user.

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
      "id": "cuid456",
      "title": "Call John",
      "isCompleted": false,
      "dueDate": "2026-08-01T12:00:00Z",
      "leadId": "cuid123",
      "assignedToId": "cuid789",
      "createdAt": "2026-07-25T00:00:00Z"
    }
  ]
}
```

---

### Error Responses

401

---

### Notes

Returns tasks sorted by due date ascending.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/tasks/my-tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## GET /api/v1/tasks/lead/:leadId

### Description

Fetches all tasks associated with a specific lead.

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
      "id": "cuid456",
      "title": "Send follow-up email",
      "isCompleted": true,
      "dueDate": "2026-07-20T12:00:00Z",
      "leadId": "cuid123",
      "assignedToId": "cuid789"
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

Members can only view tasks for leads they are assigned to.

---

### Example cURL

```bash
curl -X GET http://localhost:5000/api/v1/tasks/lead/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

<br><br>

## POST /api/v1/tasks

### Description

Creates a new task.

---

### Authentication

Bearer Token (Any valid user)

---

### Request

```json
{
  "title": "Schedule product demo",
  "dueDate": "2026-08-05T10:00:00Z",
  "leadId": "cuid123"
}
```

---

### Success Response (201)

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "cuid456"
  }
}
```

---

### Error Responses

400
401
404

---

### Notes

The task is automatically assigned to the authenticated user creating it.

---

### Example cURL

```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Schedule product demo","dueDate":"2026-08-05T10:00:00Z","leadId":"cuid123"}'
```

<br><br>

## PATCH /api/v1/tasks/:id

### Description

Updates a task, such as marking it as completed.

---

### Authentication

Bearer Token (Any valid user)

---

### Request

```json
{
  "isCompleted": true
}
```

---

### Success Response (200)

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "cuid456",
    "isCompleted": true
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

You can only update tasks assigned to you (unless you are an Admin).

---

### Example cURL

```bash
curl -X PATCH http://localhost:5000/api/v1/tasks/cuid456 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"isCompleted":true}'
```
