import jsonServer from "json-server";
import serverless from "serverless-http";

const server = jsonServer.create();
const router = jsonServer.router("server/db.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Use default middlewares (e.g., CORS, body-parsing, etc.)
server.use(middlewares);

// Add custom routes here if needed
// server.get('/custom-route', (req, res) => res.json({ message: 'Hello World' }));

// Mount the router
server.use(router);

// Wrap json-server as a Netlify serverless function
export const handler = serverless(server);
