# OctoFit Tracker - Multi-Tier Application

A modern fitness tracking application built with React 19, Node.js/Express, TypeScript, and MongoDB.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port 5173)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── backend/           # Node.js + Express + TypeScript (Port 8000)
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Ports & Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend (Vite) | 5173 | React development server |
| Backend (Express) | 8000 | REST API server |
| MongoDB | 27017 | Database service |

## Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

Backend will be available at: `http://localhost:8000`

### Environment Variables

Backend `.env`:
- `BACKEND_PORT=8000`
- `MONGODB_URI=mongodb://localhost:27017/octofit`
- `NODE_ENV=development`

Frontend `.env`:
- `VITE_API_URL=http://localhost:8000/api`
- `VITE_PORT=5173`

## Backend Stack

- **Express**: Web framework
- **TypeScript**: Type-safe development
- **Mongoose**: MongoDB object modeling
- **Jest**: Testing framework
- **ts-node**: TypeScript execution

## Frontend Stack

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **TypeScript**: Type-safe development

## Development

### Build Backend
```bash
cd octofit-tracker/backend
npm run build
```

### Run Backend Tests
```bash
cd octofit-tracker/backend
npm test
```

### Build Frontend
```bash
cd octofit-tracker/frontend
npm run build
```

## MongoDB Setup

Ensure MongoDB is running on `mongodb://localhost:27017` for the backend to connect.

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Next Steps

1. Implement API endpoints for fitness tracking
2. Create React components for the UI
3. Set up data models in MongoDB with Mongoose
4. Add authentication and authorization
5. Implement error handling across the stack
6. Add comprehensive tests
