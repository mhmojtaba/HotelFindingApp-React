import jsonServer from "json-server";
import { fileURLToPath } from "url";
import path from "path";
import serverless from "serverless-http";

// Create the server
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Get the absolute path to `db.json`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = jsonServer.router(path.join(__dirname, "../../server/db.json"));

// Use middlewares
server.use(middlewares);

// Use the router
server.use(router);

// Export the serverless handler
export const handler = serverless(server);
