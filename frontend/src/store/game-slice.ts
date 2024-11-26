import { createSlice } from '@reduxjs/toolkit'

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

export const { addClick, updateGlobalState } = gameSlice.actions
export default gameSlice.reducer
