// Messages that we expect to send to the client
export type OutgoingStateUpdateMessage = {
    type: 'STATE_UPDATE'
    totalClicks: number
}

// Messages we expect to send to the client
export type ClickAction = {
    type: "CLICK"
}

type IncomingAction = ClickAction;

// Game State
export type GameState = {
    totalClicks: number
}

export function reducer(state: GameState, action: IncomingAction): GameState {
    if (action.type === "CLICK") {
        return {
            totalClicks: state.totalClicks + 1
        }
    }

    return state;
}

export const initialState: GameState = {
    totalClicks: 1
}

