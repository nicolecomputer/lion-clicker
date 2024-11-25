import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { StateCreator } from 'zustand'

interface GameState {
    clicks: number
    addClick: () => void
}

// Middleware configuration
const persistConfig = {
    name: 'game-storage'
}

// Store definition
const createGameStore: StateCreator<GameState> = (set) => ({
    clicks: 0,
    addClick: () => set((state: GameState) => ({ clicks: state.clicks + 1 })),
})

// Compose store with middleware
export const useGameStore = create<GameState>()(
    devtools(
        persist(
            createGameStore,
            persistConfig
        )
    )
)
