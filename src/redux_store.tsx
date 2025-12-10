import { configureStore } from '@reduxjs/toolkit'
import crud from './crud.js'

export const store = configureStore({
  reducer: {
    crud: crud,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch