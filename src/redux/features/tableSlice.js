import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: {},
    haveTable: false,
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        changeTableInfo: (state, action) => {
            state.info = action.payload
        },
        changeHaveTableStatus: (state, action) => {
            state.haveTable = action.payload
        },
    },
})

export default tableSlice.reducer
export const { changeTableInfo,changeHaveTableStatus } = tableSlice.actions
