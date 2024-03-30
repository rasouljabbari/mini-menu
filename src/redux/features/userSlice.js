import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info : {
        mobile : '',
        first_name : '',
        last_name: '',
        is_admin : 0
    },
    token : ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleUserInfo: (state, action) => {
            state.info = action.payload
        },
        handleUserLogOut: (state, action) => {
            state.info = action.payload
        },

        handleUserToken: (state, action) => {
            state.token = action.payload
        },
    },
})

export default userSlice.reducer
export const { handleUserInfo,handleUserLogOut,handleUserToken } = userSlice.actions
