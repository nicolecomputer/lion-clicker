import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface UserState {
    userId: string;
}

const initialState: UserState = {
    userId: uuidv4()
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export default userSlice.reducer
