import { createSlice, configureStore, Store } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { websocketMiddleware } from './server-state-sync'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        clicks: 0,
        globalState: {
            totalClicks: 0
        }
    },
    reducers: {
        addClick: (state) => {
            state.clicks++
        },
        updateGlobalState: (state, action: { payload: { totalClicks: number } }) => {
            state.globalState.totalClicks = action.payload.totalClicks
        }
    }
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedGameReducer = persistReducer(persistConfig, gameSlice.reducer)

interface StoreState {
    game: ReturnType<typeof gameSlice.reducer> & {
        _persist?: { version: number; rehydrated: boolean }
    }
}

export const store: Store<StoreState> = configureStore({
    reducer: {
        game: persistedGameReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }).concat(websocketMiddleware)
})

export const persistor = persistStore(store)
export const { addClick, updateGlobalState } = gameSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GameActions = ReturnType<typeof addClick> | ReturnType<typeof updateGlobalState>
