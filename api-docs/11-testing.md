# Testing the API

The LeadFlow API is heavily tested using **Vitest**, **Supertest**, and deep mocked Prisma clients via **vitest-mock-extended**. 

## Running Tests

All API integration tests are located in the `server/src/tests` directory. Because the Prisma client is deeply mocked, you do not need an active database connection or a local Postgres container to run the tests—they execute completely in isolation in milliseconds.

To run the backend test suite:

```bash
cd server
npm run test
```

## Test Coverage

The test suite validates:
- **Authentication**: JWT signing, password hashing verification, and active status checks.
- **Authorization**: Validates the `authorize('ADMIN')` RBAC middleware effectively protects restricted routes.
- **Lead Lifecycle**: Simulates the full lead pipeline (creation -> fetching -> updating -> closing).
