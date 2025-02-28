# WeDance

WeDance is a participatory network that empowers dance communities by providing an inclusive platform where every member can be both creator and participant. Moving beyond traditional social networks, it creates a truly collaborative ecosystem that solves critical challenges like information fragmentation, event discovery, and partner finding.

## 🎯 Mission

- Transform traditional consumer-creator relationships into collaborative partnerships
- Enable democratic access where anyone can organize events or share knowledge
- Create value alignment through transparent, community-driven governance
- Foster bidirectional creation where every member can be both teacher and student

## 🌟 Tech Stack

- **Frontend**: Nuxt 3
- **Backend**: Nodejs + Prisma + tRPC
- **UI Components**: Vue Shadcn
- **Styling**: TailwindCSS
- **Form Handling**: VeeValidate + Zod

## 📦 Prerequisites

- Mac: [Trae IDE](https://www.trae.ai/), Windows: [Cursor IDE](https://www.cursor.com/)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [NVM](https://github.com/nvm-sh/nvm) - to install specific Node.js version
- [PNPM](https://pnpm.io/) - package manager
- [Docker](https://www.docker.com/products/docker-desktop/) - for running database and services
- **Windows Users**: [Windows Subsystem for Linux (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/install) is required

## 🛠️ Setup

1. **Clone the repository**

```bash
git clone git@github.com:wedance/v4.git
cd v4
```

2. **Configure**

Copy env file and provide configuration:

```bash
cp .env.example .env
cp cli/.env.example cli/.env
```

3. **Install dependencies**

```bash
pnpm install
```

4. **Build the environment**

```bash
make build
```

5. **Import data (optional)**

```bash
make import
```

6. **Run development server**

```bash
pnpm dev
```

7. **Access the application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Windows-Specific Setup

If you're on Windows, follow these additional steps:

1. Install WSL2 following the [official Microsoft guide](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Install Ubuntu from the Microsoft Store
3. Open Ubuntu terminal and navigate to your project:
   ```bash
   cd /mnt/c/Users/YourUsername/path/to/v4
   ```
4. Continue with the setup steps above within the WSL environment

## Troubleshooting

- Error 500: Invalid `prisma.$queryRaw()` invocation: Raw query failed. Code: `42883`. Message: `ERROR: function ll_to_earth(numeric, numeric) does not exist HINT: No function matches the given name and argument types. You might need to add explicit type casts.`
  - install db extensions, repeat setup
- `pnpm cli import` - Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
  - uncomment `tsconfig.json`

## 📁 AI-First Development

After cloning the repository, open it in [Cursor IDE](https://www.cursor.com/) for an AI-first development experience:

1. Toggle AI Pane (Cmd + I)
2. Go to Cursor Settings -> Models -> Check "claude-3-5-sonnet-20241022"
3. Open Composer Tab
4. Switch model to "claude-3-5-sonnet-20241022"
5. Switch to agent
6. Say "hi" to start your onboarding

After your onboarding round complete, you type "hi" and get the following prompt:

```
Would you like to:

1. Review today's priorities?
2. Check pending decisions?
3. Get updates on recent changes?
4. Switch to a specific expert?
```

We don't use any ticketing system, AI will tell you what to do next.
AI will act like your personal secretary, answer any questions about business, design, architecture, etc.

## 📁 Project Structure

- `/components` - Reusable Vue components
- `/content` - Markdown content and documentation
- `/docs` - Project documentation
- `/pages` - Application routes
- `/stores` - Pinia state stores
- `/composables` - Vue composables
- `/server` - Server-side code
- `/types` - TypeScript type definitions
- `/utils` - Utility functions
- `/schemas` - Zod validation schemas

## Documentation

### Business

- [Vision](docs/content/business/vision.md)
- [Organization Canvas](docs/content/business/organization-canvas.md)
- [OKRs](docs/content/business/okrs.md)

### Design Challenges

- [Dance Styles](docs/content/design/styles.md)
- [Homepage](docs/content/design/homepage.md)

### Architecture

- [Overview](docs/content/architecture/index.md)
- [Actions](docs/content/architecture/actions.md)
- [Dance Styles](docs/content/architecture/dance-styles.md)
- [Events](docs/content/architecture/events.md)
- [Event Types](docs/content/architecture/event-types.md)
- [Levels](docs/content/architecture/levels.md)
- [Pages](docs/content/architecture/pages.md)
- [Points](docs/content/architecture/points.md)
- [Posts](docs/content/architecture/posts.md)
- [Profiles](docs/content/architecture/profiles.md)
- [Schemas](docs/content/architecture/schemas.md)
- [Voting](docs/content/architecture/voting.md)

### User Flows

- [Overview](docs/content/design/flows/index.md)

### Resources

- [Blog](docs/content/blog/)
- [Resources](docs/content/resources/)

### Implementation

- [Epics](content/epics/)
- [User Stories](content/issues/)

## 🤝 Contributing

1. Follow the Vue file organization rules:

   - `<script>` section at the top
   - `<template>` section in the middle
   - `<style>` section at the bottom

2. Use the provided tools and conventions:

   - TailwindCSS for styling
   - Vue Shadcn for components
   - VeeValidate and Zod for form validation

## 📄 License

[License Information]
