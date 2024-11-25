// websocketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './index';

const getWebSocketUrl = () => {
    if (import.meta.env.PROD) {
        return 'wss://clicker.lion.computer/api/game-events';
    }
    return 'ws://localhost:3000/api/game-events';
};

export const websocketMiddleware: Middleware<
    unknown,
    RootState
> = () => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
        if (ws?.readyState === WebSocket.OPEN) return;

        ws = new WebSocket(getWebSocketUrl());

        ws.onopen = () => {
            console.log('Connected to game server');
        };

        ws.onclose = () => {
            console.log('Disconnected from game server');
            scheduleReconnect();
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws?.close();
        };
    };

    const scheduleReconnect = () => {
        if (reconnectTimeout) return;

        reconnectTimeout = setTimeout(() => {
            reconnectTimeout = null;
            connect();
        }, 3000);
    };

    return next => action => {
        // Connect when the middleware is first used
        if (!ws) connect();

        // Check if it's our click action using type guard
        if (action && typeof action === 'object' && 'type' in action) {
            if (action.type === 'game/addClick') {
                if (ws?.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'CLICK' }));
                }
            }
        }

        return next(action);
    };
};
