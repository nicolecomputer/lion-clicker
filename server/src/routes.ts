import { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'

// Define our message types
interface ClickMessage {
    type: 'CLICK'
}

interface StateUpdateMessage {
    type: 'STATE_UPDATE'
    totalClicks: number
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
const connectedClients = new Set<WebSocket>();

export function routes(server: FastifyInstance) {
    // Set up periodic state broadcasts
    setInterval(() => {
        const updateMessage: StateUpdateMessage = {
            type: 'STATE_UPDATE',
            totalClicks: gameState.totalClicks
        };

        // Broadcast to all connected clients
        connectedClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(updateMessage));
            }
        });
    }, 2000);

    server.get('/api/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })

    server.get('/api/game-events', { websocket: true }, function wsHandler(socket: WebSocket) {
        server.log.info('Game client connected')
        connectedClients.add(socket);

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
            connectedClients.delete(socket);
        })
    })
}
