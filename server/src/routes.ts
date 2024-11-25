import { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'

// Define our message type
interface ClickMessage {
    type: 'CLICK'
}

type GameState = {
    totalClicks: number
}

type ClickAction = {
    type: "CLICK"
}

type Action = ClickAction;

function reducer(state: GameState, action: Action): GameState {
    if (action.type === "CLICK") {
        return {
            totalClicks: state.totalClicks + 1
        }
    }

    return state;
}

let initialState: GameState = {
    totalClicks: 0
}

let gameState: GameState = initialState;

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
                    gameState = reducer(gameState, message)
                }

                console.log(gameState)
            } catch (error) {
                server.log.error('Error processing message:', error)
            }
        })

        socket.on('close', () => {
            server.log.info('Game client disconnected')
        })
    })
}
