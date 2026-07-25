## POST /api/v1/leads/:id/notes

### Description

Adds a new text note to a specific lead.

---

### Authentication

Bearer Token (Any valid user)

---

### Request

```json
{
  "content": "Called the lead today. They are very interested."
}
```

---

### Success Response (201)

```json
{
  "success": true,
  "message": "Note added successfully",
  "data": {
    "id": "cuid789",
    "content": "Called the lead today. They are very interested.",
    "leadId": "cuid123",
    "authorId": "cuid456",
    "createdAt": "2026-07-25T00:00:00Z"
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

The `authorId` is automatically assigned based on the authenticated user making the request.

---

### Example cURL

```bash
curl -X POST http://localhost:5000/api/v1/leads/cuid123/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"content":"Called the lead today. They are very interested."}'
```
