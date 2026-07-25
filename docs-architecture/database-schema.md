# Database Schema Architecture

## Detailed Description

The LeadFlow database is a relational PostgreSQL database managed through the Prisma ORM. It is designed to track the full lifecycle of a lead, the employees managing those leads, and the audit trail of interactions.

The core entities are:
- **User**: Represents team members and admins. Handles authentication and RBAC.
- **Lead**: The central entity representing a potential client or deal.
- **LeadNote**: Contextual text notes attached to a specific lead, authored by a User.
- **Task**: Actionable items (e.g., "Follow up call") assigned to a user and tied to a lead.
- **Activity**: System-generated, immutable audit logs tracking changes to a lead.

## Overview Walkthrough

The schema utilizes strict foreign key relationships to ensure data integrity:
1. **User ↔ Lead**: A User can have multiple `assignedLeads` and `createdLeads`. A Lead has one `assignedTo` User and one `createdBy` User.
2. **Lead ↔ Notes/Activities/Tasks**: A Lead acts as a parent to many `LeadNote`, `Activity`, and `Task` records. 
3. **Cascading Deletes**: If a `Lead` is deleted, all associated `LeadNote`, `Activity`, and `Task` records are automatically cascade-deleted to prevent orphaned data.
4. **Enums**: We utilize PostgreSQL Enums for strict type safety on specific fields:
   - `Role`: `ADMIN`, `MEMBER`
   - `LeadStatus`: `NEW`, `CONTACTED`, `QUALIFIED`, `LOST`, `CONVERTED`
   - `LeadSource`: `WEBSITE`, `REFERRAL`, `MANUAL`, `OTHER`

## Pros

- **Data Integrity**: By utilizing strict relational mapping and Prisma's schema validations, we avoid orphaned records (via `onDelete: Cascade`) and invalid states.
- **Type Safety**: Enums for `LeadStatus` and `Role` guarantee that bad data cannot be inserted into the database, simplifying validation in the application layer.
- **Auditability**: The dedicated `Activity` table provides a robust, append-only ledger. Because it is a separate table rather than a JSON column on the Lead, it can be independently paginated and queried.
- **Prisma Developer Experience**: Defining the schema in `schema.prisma` provides incredible developer velocity, offering auto-generated TypeScript/JavaScript types and automated database migrations.

## Tradeoffs

- **Enum Rigidity**: Because `LeadStatus` and `LeadSource` are defined as Enums at the database level, adding a new status (e.g., `NURTURING`) requires a database migration. If users needed to define custom statuses dynamically, we would have to refactor these Enums into their own relational tables (e.g., a `Statuses` table).
- **Activity Table Scaling**: Because every minor interaction generates an `Activity` row, this table will grow exponentially faster than the `Lead` table. In a massive enterprise system, this might eventually require archiving or moving the audit logs to a NoSQL datastore (like MongoDB or Elasticsearch) to prevent slowing down the primary relational database.
- **UUIDs vs CUIDs**: We mix `cuid()` for Leads and `uuid()` for Users/Notes. While harmless, CUIDs offer better database index sorting characteristics over UUIDs. Standardizing on CUIDs across the entire schema would be slightly more optimal for extremely large datasets.
