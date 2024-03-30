import { combineReducers,configureStore } from '@reduxjs/toolkit'

import { encryptTransform } from 'redux-persist-transform-encrypt'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import searchShowSlice from '../features/searchShowSlice.js'
import orderSlice from '../features/orderSlice.js'
import userSlice from '../features/userSlice'
import tableSlice from "../features/tableSlice.js";

const rootReducer = combineReducers({
  search: searchShowSlice,
  cart: orderSlice,
  user: userSlice,
  table: tableSlice,
})

const persistConfig = {
  key: 'orman',
  version: 1,
  whitelist: ['search', 'cart', 'user', 'table'],
  transforms: [
    encryptTransform({
      secretKey: '14#RG%$#%$3545UU106df5sd$$',
    }),
  ],
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
