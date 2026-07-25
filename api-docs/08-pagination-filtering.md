# Pagination & Filtering

Many `GET` endpoints returning arrays (e.g., `GET /api/v1/leads`, `GET /api/v1/tasks`) support query parameters for pagination, sorting, and filtering.

## Pagination Parameters

- `page` (number): The page number to fetch (defaults to `1`).
- `limit` (number): The number of items per page (defaults to `10`).

## Filtering Parameters (Leads)

- `status` (string): Filter leads by exact status (e.g., `NEW`, `CONTACTED`).
- `assignedToId` (string): Filter by assigned user ID. Use `"unassigned"` to find leads with no assignee.
- `search` (string): Performs a case-insensitive partial match across `firstName`, `lastName`, `email`, and `company`.

## Example Request

```bash
curl "http://localhost:5000/api/v1/leads?page=2&limit=25&status=NEW&search=John" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Standard Pagination Response

When paginated endpoints are called, the response includes a `pagination` object:

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 150,
    "page": 2,
    "limit": 25,
    "totalPages": 6
  }
}
```
