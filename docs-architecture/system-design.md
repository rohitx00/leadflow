# System Design

## Detailed Description

LeadFlow is built using a modern, decoupled client-server architecture. The backend is a RESTful API powered by Node.js and Express, while the frontend is a Single Page Application (SPA) built with React and Vite. 

The backend employs a strict **Controller-Service-Repository** pattern to ensure a clean separation of concerns:
- **Controllers**: Handle HTTP requests/responses, extract parameters, and route errors to the global error handler.
- **Services**: Contain the core business logic, permissions checks, and complex data orchestration.
- **Repositories**: Exclusively handle data access using the Prisma ORM.

## Overview Walkthrough

When a client makes a request to the LeadFlow API (e.g., assigning a lead), the request follows this path:
1. **Routing & Middleware**: The request hits the Express router (`lead.routes.js`). It passes through the `authenticate` middleware (which validates the JWT) and the `validate` middleware (which parses the body using Zod schemas).
2. **Controller**: The `lead.controller.js` receives the sanitized request, extracts the `leadId` and `assignedToId`, and passes them to the Service layer.
3. **Service Layer**: The `lead.service.js` checks if the lead exists and if the user has permission to assign it. It orchestrates the assignment and simultaneously creates an automatic "LEAD_ASSIGNED" activity log.
4. **Repository Layer**: The `lead.repository.js` executes the necessary Prisma queries (updating the lead, inserting the activity log) inside an atomic transaction.
5. **Response**: The Controller wraps the result in the standard standard `success/data` JSON format and sends it back to the client.

## Pros

- **Modularity & Maintainability**: The three-layer backend architecture makes it incredibly easy to locate bugs, update business logic, or change the database ORM without rewriting the entire codebase.
- **Strict Validation**: By using Zod middleware at the route level, the controllers and services are guaranteed to receive type-safe, correctly formatted data.
- **Decoupling**: The React frontend and Express backend are completely separate. This allows the backend API to be consumed by other future clients (like a mobile app) without modification.
- **Testability**: Because logic is separated into services, we can easily mock the Repository layer using `vitest-mock-extended` to achieve incredibly fast, isolated integration tests without a real database connection.

## Tradeoffs

- **Boilerplate**: The Controller-Service-Repository pattern requires creating multiple files for a single feature. For very simple CRUD operations, this can feel like over-engineering compared to putting everything in the controller.
- **State Management**: Because the frontend is decoupled, state management (via React hooks and Axios) requires careful synchronization. We have to manually ensure the UI matches the server state after mutations, whereas server-side rendered apps wouldn't face this issue.
- **Monolithic API**: Currently, the backend is a monolith. While it's well-structured, if the application scales significantly, services like "Activity Logging" or "Email Notifications" might need to be extracted into microservices, requiring a refactor of the monolithic service layer.
