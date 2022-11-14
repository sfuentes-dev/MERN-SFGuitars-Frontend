import { createSlice } from '@reduxjs/toolkit'

//app API
import appApi from '../services/appApi.js'

const initialState = []

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (_, action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createProduct.matchFulfilled,
      (_, { payload }) => payload
    )
    builder.addMatcher(
      appApi.endpoints.updateProduct.matchFulfilled,
      (_, { payload }) => payload
    )
    builder.addMatcher(
      appApi.endpoints.deleteProduct.matchFulfilled,
      (_, { payload }) => payload
    )
  },
})

export const { updateProducts, deleteProduct } = productSlice.actions

export default productSlice.reducer
