import dotenv from 'dotenv';

dotenv.config();

// Server constants
const server = {
  hostname: process.env.SERVER_HOSTNAME || 'localhost',
  port: process.env.SERVER_PORT || 1337
};

// Databases constants
const database = {
  hostname: process.env.DATABASE_HOSTNAME || 'localhost',
  port: process.env.DATABASE_PORT || 27018
};

// Config for constants
const config = {
  server: server,
  database: database,
  debug: Boolean(process.env.DEBUG) || true
};

export default config;
