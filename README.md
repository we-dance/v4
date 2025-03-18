# WeDance

WeDance is a participatory network that empowers dance communities by providing an inclusive platform where every member can be both creator and participant. Moving beyond traditional social networks, it creates a truly collaborative ecosystem that solves critical challenges like information fragmentation, event discovery, and partner finding.

## 🎯 Mission

- Transform traditional consumer-creator relationships into collaborative partnerships
- Enable democratic access where anyone can organize events or share knowledge
- Create value alignment through transparent, community-driven governance
- Foster bidirectional creation where every member can be both teacher and student

## 🌟 Tech Stack

- **Frontend**: Nuxt 3
- **Backend**: Node.js + Prisma + tRPC
- **UI Components**: Vue Shadcn
- **Styling**: TailwindCSS
- **Form Handling**: VeeValidate + Zod

## 📦 Prerequisites

- [Cursor IDE](https://www.cursor.com/)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- **Windows Users**: Use Gitbash terminal in Cursor
- **Node.js**: Version 18 or higher (recommended: latest stable)
- **npm**: Ensure you are using the latest version

## 🛠️ Setup

1. **Clone the repository**

```bash
git clone git@github.com:wedance/v4.git
cd v4
```

2. **Build the project**

```bash
make build
```

This command will:

- Check for required prerequisites and install them if missing (Node.js, PNPM, etc.)
- Set up environment files
- Start the database
- Install dependencies
- Set up the database with required extensions
- Generate Prisma client

3. **Start the development server**

```bash
make start
```

4. **Import data (optional)**

```bash
make import
```

5. **Access the application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

6. ⚙️ **Node & Dependency Versions**

Ensure that you are using the following versions:

- **Node.js**: Version 18 or higher (preferably the latest stable release)
- **npm**: Latest version

To check your Node.js and npm versions:

```bash
node -v
npm -v
```

If you need to update them, use the following commands:

- To update Node.js:
```bash
nvm install node
```
- To update npm:
```bash
npm install -g npm
```



## Troubleshooting

- **Error 500: Invalid `prisma.$queryRaw()` invocation**: Raw query failed. Code: `42883`. Message: `ERROR: function ll_to_earth(numeric, numeric) does not exist HINT: No function matches the given name and argument types. You might need to add explicit type casts.`

  - This should be automatically fixed by the `make build` command which installs the required database extensions
  - If you still encounter this error, run: `make setup-db` to reinstall the database extensions

- **Warning when running `pnpm cli import`**: Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

  - Uncomment `tsconfig.json` in the cli directory

- **Prerequisites installation fails**: If automatic installation of prerequisites fails:

  - Install the missing prerequisites manually following the links in the Prerequisites section
  - Then run `make build` again

- **Docker issues**: If you encounter issues with Docker:
  - Make sure Docker Desktop is running
  - Try restarting Docker Desktop
  - Run `docker compose down` and then `make build` again
    
- **File Table Overflow or Too Many Open Files**: If you encounter ENFILE: file table overflow or too many open files errors, check your system’s default file limit using the following command:
```bash
ulimit -n
```
To increase the limit to the maximum, run:
```bash
ulimit -n 100000
```

- **503 Error on Localhost**: If you encounter a 503 error on localhost, clear all the cache by running the following:
```bash
rm -rf node_modules .nuxt .vite .pnpm-store package-lock.json yarn.lock
```
- Then rebuild the project and restart the server:
```bash
make build
make start
```

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

```bash
v4/
├── components/       # Reusable Vue components  
├── content/          # Markdown content and documentation  
├── docs/             # Project documentation  
├── pages/            # Application routes  
├── stores/           # Pinia state stores  
├── composables/      # Vue composables  
├── server/           # Server-side code  
├── types/            # TypeScript type definitions  
├── utils/            # Utility functions  
└── schemas/          # Zod validation schemas  

```

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
