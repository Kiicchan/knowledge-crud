import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = { info: null }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      const user = action.payload
      state.info = user
      if (user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    },
  },
})

export const { setAuth } = userSlice.actions

export default userSlice.reducer
