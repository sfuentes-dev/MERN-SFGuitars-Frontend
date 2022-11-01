import { createSlice } from '@reduxjs/toolkit'

//app API
import appApi from '../services/appApi'

const initialState = []

export const productSlice = createSlice({
  name: 'proudcts',
  initialState,
  reducers: {
    updateProduct: (_, action) => {
      return action.payload
    },
  },
})

export const { updateProduct } = productSlice.actions

export default productSlice.reducer
