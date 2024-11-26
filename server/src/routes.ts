import { FastifyInstance } from 'fastify'
import { WebSocket } from 'ws'

import { GameState, ServerToClientEvents, StateUpdateMessage, ClickAction } from "@lion-clicker/core-logic"
import { initialState, reducer } from './game/reducer';

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
    }, 500);

    server.get('/api/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })

    server.get('/api/game-events', { websocket: true }, function wsHandler(socket: WebSocket) {
        server.log.info('Game client connected')
        connectedClients.add(socket);

        socket.on('message', (rawMessage) => {
            try {
                const message = JSON.parse(rawMessage.toString()) as ClickAction

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
