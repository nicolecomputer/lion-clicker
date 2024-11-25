// src/server.ts
import Fastify from 'fastify'
import { routes } from './routes'
import fastifyStatic from '@fastify/static'
import fastifyCors from '@fastify/cors'
import websocket from '@fastify/websocket'
import path from 'path'

export async function buildServer() {
    const server = Fastify({
        logger: true
    })

    // Start web sockets - moved to be registered first
    await server.register(websocket)

    if (process.env.NODE_ENV !== 'production') {
        server.register(fastifyCors, {
            origin: ['http://localhost:5173', 'http://localhost:8080'],
            methods: ['GET', 'POST']
        })
    }

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
