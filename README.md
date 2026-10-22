# React Admin Dashboard

> Production-ready SaaS admin template built with React 19, TypeScript 6, Vite 8, and Ant Design v6.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://react-admin-dashboard-gamma-six.vercel.app/)
[![AWS Deployment](https://img.shields.io/badge/AWS-CloudFront-orange)](https://d2yadwuv5d4euk.cloudfront.net/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-purple)](https://vite.dev/)

---

## Overview

| Why it matters | How it helps |
| --- | --- |
| ⚡️ Modern stack | React 19 + Vite 8 + TypeScript 6 = instant HMR and full type safety |
| 🎨 Polished UI | Ant Design v6 components, theme switcher, and adaptive layouts |
| 🔐 Real workflows | Auth, protected routes, SaaS dashboard, and customer lifecycle management |
| 🧱 Strong DX | File-based routing, lazy route loading, Zustand stores, mock APIs, and zero-config startup |

### SaaS Demo Modules
- **Dashboard** – KPI cards, lightweight revenue trend chart, customer source breakdown, and automated health insights
- **Customers** – Advanced filtering, ownership, status transitions, detail drawer, and activity timeline
- **Team Roles** – Nested role listing, detailed role insights, and permission matrix editor

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.7 | UI Framework |
| TypeScript | 6.0.3 | Type Safety |
| Vite | 8.1.0 | Build Tool |
| Ant Design | 6.5.0 | UI Components |
| React Router | 7.18.0 | Routing |
| Zustand | 5.0.14 | State Management |
| Axios | 1.18.1 | HTTP Client |

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Shell layout: header, sidebar, breadcrumbs, content
│   └── auth/            # Shared auth UI pieces
├── config/
│   ├── theme.ts         # Theme configuration types and utilities
│   └── theme-presets.ts # Preset theme definitions
├── views/
│   ├── auth/            # Login & register pages (unprotected)
│   ├── dashboard/       # SaaS dashboard page + routes
│   └── customers/       # Customer management module + routes
├── router/              # Auto-imported route definitions & guards
├── store/               # Zustand stores (config + user)
├── utils/               # API client, mock helpers, shared utils
└── App.tsx              # Root layout orchestration
```

---

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
git clone https://github.com/larry-xue/react-admin-dashboard.git
cd react-admin-dashboard
npm install
npm run dev
```

Visit `http://localhost:5173`.

### Demo Credentials
| Role | Username | Password | Shortcut |
| --- | --- | --- | --- |
| Admin | `admin` | `admin123` | `/auth/login?demo=admin` |
| User | `user` | `user123` | `/auth/login?demo=user` |
| Demo | `demo` | `demo123` | `/auth/login?demo=demo` |

---

## Core Concepts

### Authentication & Authorization
- Login/register flows with Ant Design forms
- `ProtectedRoute` wrapper guarding all non-`/auth/**` routes
- Tokens stored in Zustand + localStorage with auto-injection via Axios interceptors

### Routing
- Vite `import.meta.glob` auto-loads every `*.router.tsx`
- `meta` drives sidebar label/icon/hide/order plus page title
- Nested routes supported out of the box (see `customers` module)

### Theming
- Light / Dark / Compact algorithms controlled via Zustand store
- Persistent theme preferences using localStorage
- **Preset themes**: Blue, Green, Purple, Orange, Teal, Red, Cyan
- **Custom colors**: Support for primary, secondary, success, warning, error, info, background, and text colors
- Runtime theme switching and color customization via store

### Layout & Responsiveness
- Sticky header, collapsible sidebar, breadcrumb trail, and flexible content area
- Breakpoint-aware spacing and auto-collapse on mobile
- Dark-mode-aware charts and cards (Ant Design charts + tokens)

---

## Customization Guide

### Add a Route & Page
1. Create a directory under `src/views/your-page`
2. Build your page component in `index.tsx`
3. Define a `*.router.tsx` file:

```tsx
// src/views/example/example.router.tsx
import { ExampleOutlined } from '@ant-design/icons'
import { AdminRouterItem } from '../../router'
import ExamplePage from '.'

const exampleRoutes: AdminRouterItem[] = [
  {
    path: 'example',
    element: <ExamplePage />,
    meta: {
      label: 'Example',
      title: 'Example Page',
      key: '/example',
      icon: <ExampleOutlined />,
      order: 3,
    },
  },
]

export default exampleRoutes
```

### Adjust Theme Defaults

#### Option 1: Use Preset Themes
```ts
import useConfigStore from './store/config'

// Switch to a preset theme
const setTheme = useConfigStore(state => state.setTheme)
setTheme('blue')  // or 'green', 'purple', 'orange', 'teal', 'red', 'cyan'
```

#### Option 2: Customize Individual Colors
```ts
import useConfigStore from './store/config'

// Customize a specific color
const setCustomColor = useConfigStore(state => state.setCustomColor)
setCustomColor('primary', '#1890ff')
setCustomColor('success', '#52c41a')
// Available color keys: primary, secondary, success, warning, error, info, background, text
```

#### Option 3: Modify Default Theme in Code
Modify `src/config/theme-presets.ts` to change preset theme colors, or modify `src/store/config.ts` to change the default theme:
```ts
// In src/store/config.ts
const defaultThemeConfig = createDefaultThemeConfig()
defaultThemeConfig.colors.primary = '#your-color'
defaultThemeConfig.colors.secondary = '#your-secondary-color'
```

### API / Mock Settings
`.env` (create if missing):
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true             # use built-in mock auth/data
```

---

## NPM Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # ESLint check (ts/tsx)
```

---

## Deployment
Output lives in `dist/`. Any static host works:
- [Vercel](https://vercel.com/) – zero-config for Vite
- [Netlify](https://www.netlify.com/) – continuous deployments
- [GitHub Pages](https://pages.github.com/) – static hosting

- ## DevOps Implementation — Jenkins, Terraform & AWS

### AWS Lambda Backend API

This project includes a serverless backend API built with **AWS Lambda** and exposed through **Amazon API Gateway HTTP API**. Terraform configuration for the backend is located in `serverless/terraform/`.

| Setting | Value |
|---|---|
| AWS Region | `ap-south-1` (Mumbai) |
| Lambda function | `react-admin-dashboard-api-vanshika` |
| API Gateway base URL | `https://ulja4yitxk.execute-api.ap-south-1.amazonaws.com/` |
| Health endpoint | `GET /api/health` |
| Dashboard endpoint | `GET /api/dashboard` |
| Terraform directory | `serverless/terraform/` |

#### API endpoints

- **Health check:** https://ulja4yitxk.execute-api.ap-south-1.amazonaws.com/api/health
  - Used by Jenkins to verify that the backend API is responding with the expected healthy status.
- **Dashboard API:** https://ulja4yitxk.execute-api.ap-south-1.amazonaws.com/api/dashboard
  - Provides the dashboard endpoint implemented by the Lambda function.

#### Lambda deployment with Terraform

The Jenkins pipeline manages the Lambda infrastructure using Terraform:

1. Runs `terraform init`, `terraform fmt -check`, and `terraform validate`.
2. Runs `terraform plan` to review the proposed infrastructure changes.
3. Pauses for manual approval before deployment.
4. Applies the approved Terraform plan.
5. Reads the API base URL from Terraform outputs.
6. Calls `/api/health` and checks the returned status.
7. Continues to frontend deployment only when the health check passes.

Terraform manages the Lambda function, its IAM execution role and logging permissions, CloudWatch log group, API Gateway HTTP API, Lambda integration, API routes, stage, and permission for API Gateway to invoke Lambda.

**Security:** Store AWS credentials in Jenkins Credentials Manager. Do not commit AWS access keys, Terraform state files, or sensitive `.tfvars` files to Git.

---


This project extends the React Admin Dashboard with a DevOps workflow for infrastructure provisioning, continuous integration, and AWS deployment.

### Live AWS Deployment

**Website:** https://d2yadwuv5d4euk.cloudfront.net/

**GitHub Repository:** https://github.com/vanshika-exiliensoft/react-admin-dashboard-devops

### Technology Stack

| Technology | Purpose |
|---|---|
| GitHub | Source code management and version control |
| Jenkins | CI/CD pipeline automation |
| Terraform | Infrastructure as Code (IaC) |
| AWS S3 | Stores the production React build |
| AWS CloudFront | Distributes the website over HTTPS |
| AWS IAM | Controls access to AWS resources |
| Node.js and npm | Installs dependencies and builds the application |

### Deployment Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
Jenkins CI/CD Pipeline
   |
   +--> Validate and plan Terraform
   +--> Manual deployment approval
   +--> Deploy Lambda and test API health
   +--> Install, lint, and build React
   |
   +-------------------------+
   |                         |
   v                         v
AWS Lambda               Amazon S3
   |                         |
   v                         v
Amazon API Gateway       Amazon CloudFront
   |                         |
   v                         v
Backend API endpoints    Live React Dashboard (HTTPS)
```

Terraform manages the AWS infrastructure separately from the frontend build pipeline.

### Jenkins Pipeline

The `Jenkinsfile` defines the following stages:

1. **Checkout Code:** Retrieves the project source code from GitHub.
2. **Check Tools:** Verifies Node.js, npm, Git, AWS CLI, and Terraform.
3. **Validate Lambda Terraform:** Initializes and validates the Terraform configuration.
4. **Plan Lambda Deployment:** Generates a Terraform plan for review.
5. **Approve Lambda Deployment:** Pauses for manual approval.
6. **Deploy Lambda and Check API:** Applies the Terraform plan and verifies the `/api/health` endpoint.
7. **Install Frontend Dependencies:** Installs dependencies using `npm ci`.
8. **Lint React:** Runs ESLint to check code quality.
9. **Build React:** Creates the production build in `dist/`.
10. **Deploy React to S3:** Uploads the production build to the configured S3 bucket.
11. **Invalidate CloudFront:** Requests an invalidation so updated website content can be served.

The deployment stages require valid credentials, appropriate IAM permissions, and an enabled CloudFront distribution.

### Terraform Infrastructure

Terraform configuration is maintained in `src/infrastructure/`.

- `main.tf` — defines the S3 bucket, public access block, CloudFront distribution, Origin Access Control, and bucket policy.
- `variables.tf` — declares configurable infrastructure variables.
- `terraform.tfvars` — contains local variable values and must not be committed.
- `outputs.tf` — exposes useful deployment outputs such as the S3 bucket name, CloudFront distribution ID, and website URL.
- `.terraform.lock.hcl` — records provider selections for consistent Terraform initialization.

The S3 bucket remains private, and CloudFront uses Origin Access Control to read the website objects.

### Security Practices

- Keep S3 public access blocked.
- Store AWS credentials in Jenkins Credentials Manager.
- Use appropriate IAM permissions for infrastructure management and deployment.
- Do not commit AWS access keys, personal access tokens, Terraform state files, or sensitive variable files.
- Review Terraform plans before applying infrastructure changes.
- Monitor AWS resource usage and costs.

### Validation

The Jenkins pipeline has successfully installed dependencies, run lint checks, built the React application, and verified AWS credentials. The AWS-hosted website has also been accessed successfully through CloudFront.

Automatic triggering and deployment should be considered verified only after testing the complete workflow following a GitHub push.

---

## Contributing
PRs and issues are welcome! Please:
1. Fork the repo & create a feature branch
2. Add tests or docs where it makes sense
3. Run `npm run lint` before submitting

---

## License
MIT © [Yujian Xue](https://larryxue.dev)

Acknowledgements: [Ant Design](https://ant.design/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/), [Zustand](https://github.com/pmndrs/zustand)
