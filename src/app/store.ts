import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import user from './slices/user/slice';
import city from './slices/city/slice';
import units from './slices/options/slice';

const persistConfig = {
  key: 'root',
  storage,
};

export const appReducer = combineReducers({
  user,
  city,
  units,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;
