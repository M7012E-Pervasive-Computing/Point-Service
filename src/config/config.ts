import dotenv from 'dotenv';

dotenv.config();

// Server constants
const server = {
  hostname: process.env.SERVER_HOSTNAME || 'localhost',
  port: process.env.SERVER_PORT || 1337
};

// Databases constants
const database = {
  hostname: process.env.DATABASE_HOSTNAME || '130.240.202.87',
  port: process.env.DATABASE_PORT || 27017,
  name: process.env.DATABASE_NAME || 'Data',
  user: process.env.DATABASE_USERNAME || 'root',
  pass:
    process.env.DATABASE_PASSWORD ||
    'JA1S1asD5aI6Q12YG5s89d7af5sBcaL4A78lhasJKsG4Hd5haA7S'
};

// Config for constants
const config = {
  server: server,
  database: database,
  debug: Boolean(process.env.DEBUG) || true
};

export default config;
