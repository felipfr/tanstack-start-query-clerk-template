# TanStack Start + Clerk Template

A modern, full-stack React application template built with [TanStack Start](https://tanstack.com/start), [Clerk](https://clerk.com/), and a rich ecosystem of cutting-edge tools.

---

## Overview

This template leverages **TanStack Start**, a powerful React framework designed for maximum flexibility and scalability. It supports deployment anywhere JavaScript runs—traditional servers, serverless platforms, or even CDNs—thanks to its universal rendering capabilities. Built on top of [TanStack Router](https://tanstack.com/router/latest) and deeply integrated with [TanStack Query](https://tanstack.com/query/latest), it enables advanced routing, data fetching, and caching with ease.

For authentication and authorization, it uses **Clerk**, providing seamless user management, social login, and **Role-Based Access Control (RBAC)**. RBAC allows you to define granular permissions and secure your app effectively. Learn more about Clerk RBAC [here](https://clerk.com/docs/references/nextjs/basic-rbac).

---

## Key Features

- ⚡ **TanStack Start** — Modern React framework with universal rendering, flexible deployment, and built-in SSR.
- 🗺️ **TanStack Router** — Type-safe, file-based routing with nested layouts and data loading.
- 🔍 **TanStack Query** — Powerful asynchronous state management, caching, and background updates.
- 🔐 **Clerk Auth with RBAC** — Authentication, social login, and fine-grained access control ([RBAC docs](https://clerk.com/docs/references/nextjs/basic-rbac)).
- 🎨 **Tailwind CSS** — Utility-first styling with [shadcn/ui](https://ui.shadcn.com/) components.
- 🧩 **Radix UI** — Accessible, composable UI primitives.
- 🌐 **Jotai** — Atomic state management for local/global state.
- 🛡️ **Prisma ORM** — Type-safe database access.
- 📈 **New Relic** — Performance monitoring and observability.
- 🧰 **Zod** — Type-safe schema validation.
- 🌙 **Dark/Light Mode** — Theme switching with [next-themes](https://github.com/pacocoursey/next-themes).
- 🔔 **Sonner** — Elegant toast notifications.
- 🎭 **Lucide Icons** — Beautiful, consistent icon set.
- ⚙️ **TypeScript** — Fully typed codebase.
- 🧹 **Prettier & ESLint** — Code formatting and linting with TanStack plugins.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tanstack-start-query-clerk-template.git
cd tanstack-start-query-clerk-template
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure environment variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` to set up:

- **Clerk** API keys and social login credentials
- **Database** connection string (Prisma)
- **New Relic** monitoring keys
- App metadata (name, description, URL)

### 4. Run database migrations (if applicable)

```bash
npm run migrate:prisma
```

### 5. Start the development server

```bash
npm run start:dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## Project Structure

```plaintext
tanstack-start-query-clerk-template/
├── src/
│   ├── components/        # Reusable UI components
│   ├── lib/               # Config, hooks, helpers, types
│   ├── routes/            # App routes (file-based, TanStack Router)
│   ├── styles/            # Global styles (Tailwind CSS)
│   └── ...                # SSR entry points, API utilities
├── public/                # Static assets
├── app.config.ts          # TanStack Start + Vite config
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config
├── .env.local             # Environment variables
└── README.md              # Project documentation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this template.

---

## Acknowledgements

- [TanStack](https://tanstack.com/) for their incredible open-source libraries.
- [Clerk](https://clerk.com/) for seamless authentication and RBAC.
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components.
