# Shopify Modern E-Commerce Platform

![Shopify Logo](https://www.svgrepo.com/show/354131/shopify.svg)
> A Next.js-based, modular, and secure e-commerce platform with robust authentication, cart management, and product catalog features.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Folder Structure](#folder-structure)
7. [API & Auth](#api--auth)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

Shopify is a modern e-commerce web application built with Next.js and TypeScript, providing a seamless shopping experience for both users and admins. It integrates authentication, product management, shopping cart, and order handling in a scalable architecture.

---

## Features

- 🛒 **Product Catalog**: List, view, and filter products with real-time inventory and ratings.
- 🔒 **Authentication**: Secure login with role-based access (Admin/User) using NextAuth and JWT.
- 🛍️ **Cart Management**: Add/remove products, quantity management, and cart persistence (Zustand).
- 🏷️ **Admin Panel**: (If present) Manage products, inventory, and users.
- ⚡ **API-First**: Modular API endpoints for extensibility.
- 💾 **Database Integration**: Powered by Prisma ORM (backed by PostgreSQL/MySQL/etc.).
- 📦 **Modern UI**: Responsive design with React, Next.js, and custom components.

---

## Architecture

### High-Level Component Diagram

```mermaid
graph TD
    A[Frontend (Next.js)] -->|API Calls| B[API Routes (Next.js /api)]
    B --> C[Database (Prisma ORM)]
    A -->|Zustand Store| D[State Management]
    A -->|NextAuth| E[Authentication & Sessions]
    E --> C
    A --> F[Components: ProductCard, ProductImages, AddToCart]
```

- **Frontend**: Built with Next.js, featuring reusable UI components.
- **API**: Modular endpoints for products, cart, and authentication.
- **State**: Uses Zustand for cart and session state management.
- **Database**: Abstracted via Prisma, supporting any SQL database.
- **Authentication**: NextAuth with JWT and credential providers.

---

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **State**: Zustand
- **Backend/API**: Next.js API Routes
- **Auth**: NextAuth.js (JWT Strategy)
- **ORM**: Prisma
- **Database**: PostgreSQL/MySQL/SQLite (configurable)
- **UI**: Custom React components, TailwindCSS (if used)
- **Others**: Sonner (toasts), Lucide (icons)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LikhithMar14/Shopify.git
cd Shopify
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and update the values (DB, NextAuth secrets, etc.).

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Folder Structure

```
src/
│
├── actions/            # Server-side actions (product, cart, etc.)
├── app/                # Next.js app directory (routes, pages, api)
│   └── api/            # API endpoints
├── components/         # UI components (product card, images, cart, etc.)
├── store/              # Zustand store for cart/session state
├── types/              # TypeScript types and schemas
├── auth.*              # Authentication config and logic
└── db.*                # Database connection (Prisma)
```

---

## API & Auth

- **Authentication**: Built on NextAuth, using JWT and Prisma adapter for user management.
    - Roles: `ADMIN`, `USER`
    - Session and JWT extension for role-based access.
- **Cart**: Managed in Zustand, synced to DB on login.
- **Products**: CRUD actions via API endpoints and direct DB actions.

---

## Contributing

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Credits

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
