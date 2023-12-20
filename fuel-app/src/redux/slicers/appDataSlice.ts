import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
  name: 'appData',
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})
