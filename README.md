# Bookmark System Backend

This repository contains the backend service for the Bookmark System, built using **Node.js**, **Hono**, and **Prisma** with **PostgreSQL**.

## Features
- User authentication using JWT (JSON Web Token)
- Bookmark management (Create, Read, Update, Delete)
- Category management
- Secure API endpoints with authentication middleware
- Validation using Zod

## Technologies Used
- **Node.js**
- **Hono** (Fast web framework for cloud functions and edge environments)
- **Prisma** (ORM for database management)
- **PostgreSQL** (Relational database)
- **Zod** (Schema validation)
- **jsonwebtoken** (JWT authentication)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/fauzan264/bookmark-system-backend.git
   cd bookmark-system-backend
   ```

2. Install dependencies:
   ```sh
   bun install
   ```

3. Create a **.env** file and configure the database connection:
   ```env
   DATABASE_URL="postgresql://root:root@localhost:5432/bookmark_system?schema=public"
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES_IN="1h"
   ```

4. Run database migrations:
   ```sh
   bun run prisma migrate dev
   ```

5. Start the development server:
   ```sh
   bun run dev
   ```

## API Documentation

For detailed API specifications, please refer to the API documentation:
[API Documentation](https://github.com/fauzan264/bookmark-system-backend/docs/api-spec)

## Database Schema

The database schema is documented here:
[Database Diagram](https://github.com/fauzan264/bookmark-system-backend/docs)