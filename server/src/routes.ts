import { FastifyInstance } from 'fastify'

export function routes(server: FastifyInstance) {
    server.get('/api/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })
}
