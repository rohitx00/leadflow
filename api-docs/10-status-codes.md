# HTTP Status Codes

The LeadFlow API strictly adheres to standard REST HTTP status codes to indicate the success or failure of an API request.

| Status Code | Definition | Description |
|---|---|---|
| **`200`** | **OK** | The request was successful, and the response body contains the requested data or confirmation of the update. |
| **`201`** | **Created** | The request succeeded, and a new resource (User, Lead, Task, Note) was created as a result. |
| **`400`** | **Bad Request** | The server could not understand the request due to invalid syntax, missing required fields, or validation failures. |
| **`401`** | **Unauthorized** | The client must authenticate itself to get the requested response. The provided JWT token is missing, invalid, or expired. |
| **`403`** | **Forbidden** | The client does not have access rights to the content. For example, a `MEMBER` attempting to access an `ADMIN` only route, or accessing another user's private data. |
| **`404`** | **Not Found** | The server cannot find the requested resource (e.g., fetching a Lead ID that doesn't exist). |
| **`409`** | **Conflict** | This response is sent when a request conflicts with the current state of the server. Usually happens if you try to register a User with an email address that already exists in the system. |
| **`500`** | **Internal Server Error** | The server has encountered a situation it does not know how to handle. |
