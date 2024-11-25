import { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'

// Define our message type
interface ClickMessage {
    type: 'CLICK'
}

export function routes(server: FastifyInstance) {
    server.get('/api/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })

    server.get('/api/game-events', { websocket: true }, function wsHandler(socket: WebSocket) {
        server.log.info('Game client connected')

        socket.on('message', (rawMessage) => {
            try {
                const message = JSON.parse(rawMessage.toString()) as ClickMessage

                if (message.type === 'CLICK') {
                    server.log.info('Received click event')
                    // Later we'll add game logic here
                }
            } catch (error) {
                server.log.error('Error processing message:', error)
            }
        })

        socket.on('close', () => {
            server.log.info('Game client disconnected')
        })
    })
}
