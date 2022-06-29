import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMenuVisible: false,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuVisible = !state.isMenuVisible
    },
  },
})

export const { toggleMenu } = menuSlice.actions

export default menuSlice.reducer
