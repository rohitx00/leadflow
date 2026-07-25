# LeadFlow

## Project Overview
LeadFlow is a comprehensive Customer Relationship Management (CRM) system designed to streamline lead capture, tracking, and assignment. It features a robust role-based access control system, empowering Admins to manage a team of sales Members, distribute leads effectively, and monitor conversion metrics in real-time.

## Tech Stack

**Frontend**:
- **React (Vite)**: Lightning-fast development environment.
- **Tailwind CSS**: Utility-first styling for a modern, responsive UI.
- **React Router DOM**: Client-side routing.
- **React Hook Form & Zod**: Robust form state management and validation.
- **Axios**: Configured HTTP client for API communication.
- **Vitest & React Testing Library**: Component testing.

**Backend**:
- **Node.js & Express**: Fast and scalable web server.
- **Prisma (ORM)**: Type-safe database access.
- **PostgreSQL**: Relational database (compatible with Neon serverless).
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **Zod**: Strict API payload validation.
- **Vitest & Supertest**: Fast integration testing with mocked Prisma clients.

## Features
- **Role-Based Access Control**: Separate `ADMIN` and `MEMBER` roles with distinct dashboard views and routing protection.
- **Lead Capture & Management**: Public endpoints for capturing new leads, detailed internal views, status tracking, and contextual notes.
- **Lead Assignment**: Admins can assign leads to specific team members. Members only have visibility into their assigned pipeline.
- **Task Management**: Create, track, and complete actionable tasks associated with specific leads.
- **Analytics Dashboard**: Real-time metrics tracking total leads, new leads, active pipeline, and conversion rates.
- **Admin User Reports**: Detailed performance reports for individual team members (assigned leads, win rates).
- **Automated Activity Audit**: System-generated, read-only logs tracking every major event in a lead's lifecycle (creation, assignment, status changes).

## Project Walkthrough
1. **Public Lead Capture**: A potential client submits their information via a public-facing form. This generates a new lead with a `NEW` status in the system.
2. **Dashboard Review**: An `ADMIN` logs into the LeadFlow dashboard to view high-level metrics and a paginated list of all incoming leads.
3. **Lead Assignment**: The `ADMIN` reviews a newly captured lead and assigns it to a sales `MEMBER`. The system automatically generates a "LEAD_ASSIGNED" activity log.
4. **Member Workflow**: The assigned `MEMBER` logs in, sees a focused view of only their assigned leads, and begins follow-up. They can change the status to `CONTACTED`, add internal notes about their interactions, and create tasks (e.g., "Follow up in 2 days").
5. **Conversion Tracking**: As the `MEMBER` successfully qualifies or closes the lead, they update the status to `CONVERTED` or `LOST`. The dashboard analytics instantly reflect these changes in the overall pipeline and win rate metrics.
6. **Performance Monitoring**: The `ADMIN` can view the User Report to see how many leads each member is actively handling and compare individual conversion rates.

## Instructions for Running Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** database (local instance or a cloud provider like Neon)

### 1. Clone & Install Dependencies
You will need to install dependencies for both the server and the client.

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration
Create a `.env` file inside the `server` directory and add the following variables:

```env
PORT=5000
# Replace with your actual Postgres connection string
DATABASE_URL="postgresql://user:password@localhost:5432/leadflow"
# Used for signing JWTs (make it a long random string)
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 3. Database Setup
Ensure your PostgreSQL database is running, then use Prisma to generate the client and push the schema.

```bash
cd server
# Generate the Prisma client
npx prisma generate
# Push the schema to the database (creates tables)
npx prisma db push
```

### 4. Run the Application
You can run both the client and server concurrently in two separate terminal windows.

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
*The server will start on http://localhost:5000*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*The React app will start on http://localhost:5173*

### 5. API Documentation
Comprehensive API documentation (including a fully configured Postman collection) is available in the `api-docs/` directory of this repository. Open `api-docs/README.md` to explore all endpoints, authentication methods, and payloads.
