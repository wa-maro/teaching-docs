# nestjs-starter-kit

Opinionated starter kit for building scalable backend API. Provides a production-ready REST API with authentication, database integration, and a scalable modular architecture.

**Features**

- User registration
- User login
- Token refresh endpoint
- Logout
- Protected routes

**Setup**

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start the development server
npm run start:dev
```
