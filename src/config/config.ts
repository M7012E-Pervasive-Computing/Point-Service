import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const DEBUG = Boolean(process.env.DEBUG) || true;

const server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: server, 
    debug: DEBUG
};

export default config;
