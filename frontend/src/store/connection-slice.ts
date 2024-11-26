// store/connection-slice.ts
import { createSlice } from '@reduxjs/toolkit'

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        isConnected: false
    },
    reducers: {
        setConnected: (state, action: { payload: boolean }) => {
            state.isConnected = action.payload
        }
    }
})

export const { setConnected } = connectionSlice.actions
export default connectionSlice.reducer
