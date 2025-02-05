import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import flowreducer from './flow.slice';

export const store = configureStore({
    reducer: {
      flow : flowreducer
    }
  });
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
