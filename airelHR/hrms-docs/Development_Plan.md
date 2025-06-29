# Project Blueprint: Delivix HR (Modern Replication)

This document outlines the comprehensive, four-phase plan to replicate the legacy OrangeHRM system using a modern, scalable, and maintainable technology stack.

---

## Phase 0: Technology Stack & Project Foundation

**Goal:** Make key architectural decisions and establish a robust project structure that will ensure consistency and scalability from day one.

#### 1. Technology Stack
- **Frontend:** **Next.js (App Router)** - For server-rendered, high-performance user interfaces.
- **Backend:** **NestJS** - A TypeScript-based Node.js framework with a modular architecture that mirrors the clean design of the legacy system.
- **Database:** **PostgreSQL** - A powerful, open-source relational database.
- **ORM:** **Prisma** - For type-safe database access, defining our entire schema as code.
- **UI/Styling:** **Shadcn/ui** leveraging **Radix UI** and **Tailwind CSS** - For accessible, composable, and modern UI components.

#### 2. Project Structure (Monorepo)
The project will be a monorepo to maximize code and type sharing between the frontend and backend.
```
```