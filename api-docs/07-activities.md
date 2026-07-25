# Activities Module

Activities in LeadFlow are strictly **read-only** audit logs. There are no direct POST, PATCH, or DELETE endpoints to manage activities.

## How Activities Are Generated

Activities are generated internally by the server's business logic whenever a major event occurs in a Lead's lifecycle. Examples include:
- `LEAD_CREATED`: When a lead submits a public form.
- `STATUS_CHANGED`: When a lead moves from `NEW` to `CONTACTED`.
- `LEAD_ASSIGNED`: When an admin assigns a lead to a sales member.

## How to Fetch Activities

Activities are automatically attached to the Lead object when fetching a specific lead.

## GET /api/v1/leads/:id

*(See Leads module for full endpoint details)*

### Example Activity Object (Returned within Lead)

```json
{
  "id": "cuid999",
  "action": "STATUS_CHANGED",
  "description": "Lead status changed to CONTACTED",
  "leadId": "cuid123",
  "createdAt": "2026-07-25T00:00:00Z"
}
```
