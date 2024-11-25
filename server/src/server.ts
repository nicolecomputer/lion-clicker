// src/server.ts
import Fastify from 'fastify'
import { routes } from './routes'
import fastifyStatic from '@fastify/static'
import path from 'path'

export function buildServer() {
    const server = Fastify({
        logger: true
    })

    // Register static file serving
    server.register(fastifyStatic, {
        root: path.join(__dirname, '../dist/public'),
        prefix: '/'
    })

    // Register routes
    routes(server)

    // Serve index.html for all unmatched routes (for client-side routing)
    server.setNotFoundHandler((req, reply) => {
        reply.sendFile('index.html')
    })

    return server
}
