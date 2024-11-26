import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface UserState {
    userId: string;
}

const getInitialUserId = () => {
    const stored = localStorage.getItem('userId')
    if (stored) return stored
    const newId = uuidv4()
    localStorage.setItem('userId', newId)
    return newId
}

const initialState: UserState = {
    userId: getInitialUserId()
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export default userSlice.reducer
