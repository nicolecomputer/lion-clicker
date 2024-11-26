// server-state-sync.ts
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './index';

interface StateUpdateMessage {
    type: 'STATE_UPDATE';
    totalClicks: number;
}

const getWebSocketUrl = () => {
    if (import.meta.env.PROD) {
        return 'wss://clicker.lion.computer/api/game-events';
    }
    return 'ws://localhost:3000/api/game-events';
};

export const websocketMiddleware: Middleware<
    unknown,
    RootState
> = (store) => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
        if (ws?.readyState === WebSocket.OPEN) return;

        ws = new WebSocket(getWebSocketUrl());

        ws.onopen = () => {
            console.log('Connected to game server');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data) as StateUpdateMessage;
                if (message.type === 'STATE_UPDATE') {
                    store.dispatch({
                        type: 'game/updateGlobalState',
                        payload: { totalClicks: message.totalClicks }
                    });
                }
            } catch (error) {
                console.error('Error processing server message:', error);
            }
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
        if (!ws) connect();

        if (action && typeof action === 'object' && 'type' in action) {
            if (action.type === 'game/addClick') {
                if (ws?.readyState === WebSocket.OPEN) {
                    const userId = store.getState().user.userId;
                    ws.send(JSON.stringify({ type: 'CLICK', userId }));
                }
            }
        }

        return next(action);
    };
};
