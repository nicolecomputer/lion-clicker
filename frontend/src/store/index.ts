import { createSlice, configureStore, Store } from '@reduxjs/toolkit'
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

export const store: Store = configureStore({
    reducer: {
        game: gameSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware)
})

export const { addClick, updateGlobalState } = gameSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GameActions = ReturnType<typeof addClick> | ReturnType<typeof updateGlobalState>
