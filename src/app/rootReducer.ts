import { AnyAction, Reducer } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { RootState, appReducer } from './store';

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/userLogOut') {
    storage.removeItem('persist:root');

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
