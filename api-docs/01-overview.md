# Overview

The LeadFlow API is a RESTful JSON API built with Express.js and Prisma. 

## Base URL
All API endpoints are relative to the following base URL:
`http://localhost:5000` (or your deployed domain)

## Request Format
All POST and PATCH requests must have the `Content-Type: application/json` header.

## Response Format
Every successful API response follows this standard structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```
