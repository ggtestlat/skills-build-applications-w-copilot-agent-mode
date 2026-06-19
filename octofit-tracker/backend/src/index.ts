import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './database';

// Import routes
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (basic setup)
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Connect to MongoDB
connectDatabase().catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: PORT,
    codespace: codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'local'
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 OctoFit Tracker API Server`);
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌐 Base URL: ${codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`}`);
  console.log(`\n📚 API Routes:`);
  console.log(`  - GET  /api/health`);
  console.log(`  - /api/users`);
  console.log(`  - /api/teams`);
  console.log(`  - /api/activities`);
  console.log(`  - /api/workouts`);
  console.log(`  - /api/leaderboard\n`);
});
