import { AnyAction, combineReducers, configureStore, Store } from '@reduxjs/toolkit'
import { websocketMiddleware } from './server-state-sync'

import gameReducer from "./game-slice"
import userReducer from './user-slice'
import connectionSlice from "./connection-slice";
import { serverReducer, ServerAction } from "./server-reducer"

const rootReducer = (state: RootState, action: AnyAction) => {
    if (action.type.startsWith("server/")) {
        return serverReducer(state, action as ServerAction)
    }
    return combineReducers({
        game: gameReducer,
        user: userReducer,
        connection: connectionSlice
    })(state, action);
};

export const store: Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
