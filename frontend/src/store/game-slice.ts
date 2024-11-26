import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ClickSource = 'mouse'
const gameSlice = createSlice({
    name: 'game',
    initialState: {
        clicks: 0,
        globalState: {
            totalClicks: 0
        }
    },
    reducers: {
        addClick: (state, action: PayloadAction<{ source: ClickSource }>) => {
            switch (action.payload.source) {
                case 'mouse':
                    state.clicks += 1
            }
        },
        updateGlobalState: (state, action: { payload: { totalClicks: number } }) => {
            state.globalState.totalClicks = action.payload.totalClicks
        }
    }
})

export const { addClick, updateGlobalState } = gameSlice.actions
export default gameSlice.reducer
