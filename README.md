# Account Surfer

Quickly switch between accounts and browsers with Account Surfer.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/account-surfer-vite-ts.git
cd account-surfer-vite-ts
```

2. Install dependencies:
```bash
yarn install
```

## Development

To run the application in development mode:

```bash
yarn dev
```

This will start:
- Vite development server
- Electron application

## Building

### Local Build
To create a local build:

```bash
yarn dist:local
```

### Store Build
To create a store build:

```bash
yarn dist:store
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build the application
- `yarn type-check` - Run TypeScript type checking
- `yarn lint` - Run ESLint
- `yarn clean` - Clean build artifacts
- `yarn pack` - Package the application without distribution

## Project Structure

- `src/` - Main application source code
- `electron/` - Electron main process code
- `static/` - Static assets
- `buildResources/` - Build resources for electron-builder

## Technologies Used

- React
- TypeScript
- Electron
- Vite
- Tailwind CSS
- React Router
- Electron Store

## License

MIT license