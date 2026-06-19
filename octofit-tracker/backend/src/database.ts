import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const codespaceName = process.env.CODESPACE_NAME;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Connect to MongoDB database
 * Uses octofit_db database
 * Supports local development and GitHub Codespaces
 */
export async function connectDatabase(): Promise<void> {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);

    console.log('✅ Connected to MongoDB');
    console.log(`📦 Database: octofit_db`);
    console.log(`📍 URI: ${MONGODB_URI}`);

    if (codespaceName) {
      console.log(`🌐 Codespace: ${codespaceName}`);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB database
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
}

/**
 * Get MongoDB connection status
 */
export function getConnectionStatus(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Get database URI
 */
export function getDatabaseUri(): string {
  return MONGODB_URI;
}

export default {
  connectDatabase,
  disconnectDatabase,
  getConnectionStatus,
  getDatabaseUri
};
