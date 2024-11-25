import { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'

export function routes(server: FastifyInstance) {
    server.get('/api/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })

    server.get('/api/game-events', { websocket: true }, function wsHandler(socket: WebSocket) {
        server.log.info('WebSocket connected')

        socket.on('message', (message: string) => {
            server.log.info('Received message:', message.toString())
        })

        socket.send('Hello from server!')
    })
}
