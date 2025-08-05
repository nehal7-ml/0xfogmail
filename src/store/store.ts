import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import accountReducer from './accountSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;