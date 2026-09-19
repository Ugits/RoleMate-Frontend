# RoleMate — Frontend

RoleMate is a role-playing character manager with account registration, a character dashboard, and spell lookup. This repository contains the Next.js interface; [RoleMate Backend](https://github.com/Ugits/RoleMate-Backend) provides authentication, persistence, and access to an external spell service.

## Features

- Register an account, sign in, and sign out.
- Create, list, view, edit, and delete your characters, including level and six ability scores.
- Display spell cards retrieved using the selected character's level.
- Delete your own account.
- Use administrator forms to create administrators, enable or disable accounts, and delete users. These operations require an administrator account on the backend.

## Stack and structure

The [package manifest](package.json) specifies Next.js 15.0.4, React 19, TypeScript 5, Tailwind CSS 3, and Heroicons. An npm lockfile is included.

| Location | Responsibility |
| --- | --- |
| [app](app) | Next.js App Router pages and layouts |
| [Dashboard components](app/%28pages%29/dashboard/_components) | Character forms, character sheet, and spell cards |
| [Shared components](app/_global-components) | Navigation, buttons, and registration |
| [Types](app/_types) | TypeScript request and response interfaces |

Interactive components use React state and effects, with browser `fetch` calls to the Java backend. Login stores the token and role in `sessionStorage`; protected requests send an `Authorization: Bearer <token>` header. Backend authorization determines access to data and administrator operations.

## Run locally

### Requirements

- Node.js and npm. The locked Next.js version declares Node.js `^18.18.0 || ^19.8.0 || >=20.0.0`; the repository does not pin a Node.js runtime.
- A configured, running [RoleMate Backend](https://github.com/Ugits/RoleMate-Backend#run-locally).
- The backend's external spell service for spell lookup.

### Setup

```bash
git clone https://github.com/Ugits/RoleMate-Frontend.git
cd RoleMate-Frontend
npm ci
```

Create `variable.env.ts` at the repository root, alongside `package.json`:

```ts
export const BASE_URL = "http://localhost:8080";
```

The components import `BASE_URL` from `@/variable.env`. This file is excluded by [.gitignore](.gitignore) and must be created before starting or building the app. Use the backend's actual origin without a trailing slash. This value is included in browser code and must contain no secrets.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). The backend currently allows this exact browser origin through CORS. Register from the home page, sign in through the login page, then open the dashboard from the header. A normal user is initially redirected to the user page after login.

### Available checks and build commands

```bash
npm run lint
npm run build
npm start
```

Run `npm start` only after a successful build. These commands are defined in [package.json](package.json). No automated test script or test suite is included in this repository. The commands have been checked against the source; a passing lint/build or an end-to-end run has not been verified for this documentation update.

## How the application connects

```text
Browser / Next.js interface
    -> RoleMate Backend (JSON over HTTP)
        -> PostgreSQL: users and characters
        -> External Spellify-compatible service: spell data
```

For example, [SpellList](app/%28pages%29/dashboard/_components/SpellList.tsx) sends `POST /api/spell/level` with `{"level": 3}`. The backend requests `GET /usable/3` from its configured spell service and returns spell records for the cards. See the [backend API documentation](https://github.com/Ugits/RoleMate-Backend#api-example) for an authentication and character example.

## Current scope

- The host page is an `MVP 2` placeholder. The user page currently provides account deletion.
- Spell lookup needs a separately configured service; these two repositories do not provide a complete standalone spell-data setup.
- Character creation in the UI accepts levels 1–9 and ability scores 1–20. Backend update validation allows wider ranges, so validation is not yet consistent across both parts.
- Some visual details remain placeholders, including spell-card type/flavor text and a character portrait reference without a matching committed image.
- The backend generates a new JWT signing key at startup. Sign in again after restarting it.

The project documents an existing implementation in development; deployment and production readiness have not been verified.
