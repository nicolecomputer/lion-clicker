import { FastifyInstance } from 'fastify'

export function routes(server: FastifyInstance) {
    server.get('/health', async () => {
        return { status: 'totally ok' }
    })
}
