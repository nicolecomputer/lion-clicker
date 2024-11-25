import { createSlice, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const gameSlice = createSlice({
    name: 'game',
    initialState: { clicks: 0 },
    reducers: {
        addClick: (state) => {
            state.clicks++
        }
    }
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedGameReducer = persistReducer(persistConfig, gameSlice.reducer)

export const store = configureStore({
    reducer: {
        game: persistedGameReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
})

export const persistor = persistStore(store)
export const { addClick } = gameSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
