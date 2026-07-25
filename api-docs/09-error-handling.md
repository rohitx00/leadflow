# Error Handling

The LeadFlow API uses a centralized error-handling middleware to ensure all errors returned to the client follow a predictable, strictly formatted JSON structure.

## Standard Error Response Structure

If an API call fails, `success` will always be `false`, and an `error` object will be provided containing a `message`.

```json
{
  "success": false,
  "error": {
    "message": "Human readable error message detailing what went wrong"
  }
}
```

## Validation Errors (Zod)

If a payload fails schema validation, the API returns a `400 Bad Request` with an array of specific field errors in the `details` property:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email address"
      },
      {
        "field": "password",
        "message": "String must contain at least 8 character(s)"
      }
    ]
  }
}
```

## Development Mode

If the backend server is running with `NODE_ENV=development`, the error object will also include the raw `stack` trace for debugging purposes. This is automatically stripped out in production environments.
