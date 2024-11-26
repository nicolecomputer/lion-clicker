import { configureStore, Store } from '@reduxjs/toolkit'
import { websocketMiddleware } from './server-state-sync'

import gameReducer from "./game-slice"
import userReducer from './user-slice'

export const store: Store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
