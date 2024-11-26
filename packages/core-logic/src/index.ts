// shared/events.ts
export type StateUpdateMessage = {
    type: 'STATE_UPDATE'
    totalClicks: number
}

export type ClickAction = {
    type: 'CLICK'
}

export type ServerToClientEvents = StateUpdateMessage
export type ClientToServerEvents = ClickAction

export type GameState = {
    totalClicks: number
}
