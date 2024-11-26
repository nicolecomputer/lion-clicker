import { RootState } from ".";

export type UpdateGlobalGameState = {
    type: "server/STATE_UPDATE",
    payload: {
        totalClicks: number
    }
}
export type ServerAction = UpdateGlobalGameState;

export function serverReducer(state: RootState, action: ServerAction): RootState {
    switch (action.type) {
        case "server/STATE_UPDATE":
            return {
                ...state,
                game: {
                    ...state.game,
                    globalState: {
                        totalClicks: action.payload.totalClicks
                    }
                }
            }
    }
    return state;
}
