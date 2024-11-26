import { GameState, ClientToServerEvents } from "@lion-clicker/core-logic"

export function reducer(state: GameState, action: ClientToServerEvents): GameState {
    if (action.type === "CLICK") {
        return {
            totalClicks: state.totalClicks + 1
        }
    }

    return state;
}

export const initialState: GameState = {
    totalClicks: 0
}

