import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
}

const searchShowSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchShowChange: (state, action) => {
      state.status = action.payload
    },
  },
})

export default searchShowSlice.reducer
export const { searchShowChange } = searchShowSlice.actions
