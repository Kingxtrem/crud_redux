import { configureStore } from '@reduxjs/toolkit'
import crud from './crud'
import productsSlice from './Redux/Products'

export const store = configureStore({
  reducer: {
    crud:crud,
    products:productsSlice,
  },
})