import Fastify from "fastify";
import { routes } from "./routes";

export function buildServer() {
    const server = Fastify({
        logger: true,
    });

    // Register routes
    routes(server);

    return server;
}
