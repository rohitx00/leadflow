# Lead Assignment

Lead assignment is handled through the standard Lead update endpoint. When the `assignedToId` field is passed to `PATCH /api/v1/leads/:id`, the system automatically assigns the lead and generates an assignment activity log.

## PATCH /api/v1/leads/:id

### Description

Assigns a lead to a specific user (or unassigns if null).

---

### Authentication

Bearer Token (Admin only recommended for assigning to others)

---

### Request

```json
{
  "assignedToId": "cuid456"
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
    "assignedToId": "cuid456"
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

If `assignedToId` is set to `null`, the lead is unassigned. Automatically generates a "LEAD_ASSIGNED" activity log.

---

### Example cURL

```bash
curl -X PATCH http://localhost:5000/api/v1/leads/cuid123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"assignedToId":"cuid456"}'
```
