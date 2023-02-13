import { createSlice, AsyncThunk } from '@reduxjs/toolkit';
import { setUser, userLogIn, editUser } from './asycnActions';
import { UserState, isUserPayload } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export enum itemStatus {
  INIT = 'init',
  CONFIRM = 'confirm',
  ERROR = 'error',
  LOADING = 'loading',
}

const initialState: UserState = {
  userInfo: null,
  userLoginStatus: itemStatus.INIT,
  userRegistrStatus: itemStatus.INIT,
  userEditStatus: itemStatus.INIT,
  userCodeStatus: itemStatus.INIT,
  registrError: null,
  editError: null,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut() {},
    setFormsInitStatus(state) {
      state.userLoginStatus = itemStatus.INIT;
      state.userRegistrStatus = itemStatus.INIT;
      state.userEditStatus = itemStatus.INIT;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUser.pending, (state) => {
      state.userEditStatus = itemStatus.LOADING;
    });
    builder.addCase(setUser.pending, (state) => {
      state.userRegistrStatus = itemStatus.LOADING;
    });
    builder.addCase(userLogIn.pending, (state) => {
      state.userLoginStatus = itemStatus.LOADING;
    });
    builder.addCase(setUser.fulfilled, (state) => {
      state.userRegistrStatus = itemStatus.CONFIRM;
    });
    builder.addCase(userLogIn.fulfilled, (state) => {
      state.userLoginStatus = itemStatus.CONFIRM;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.userEditStatus = itemStatus.CONFIRM;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.userEditStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.editError = action.payload;
      }
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.userRegistrStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.registrError = action.payload;
      }
    });
    builder.addCase(userLogIn.rejected, (state, action) => {
      state.userLoginStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.loginError = action.payload;
      }
    });
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state, action) => {
        if (action && isUserPayload(action.payload)) {
          state.userInfo = {
            name: action.payload.name,
            surname: action.payload.surname,
            email: action.payload.email,
            password: action.payload.password,
            phone: action.payload.phone,
            id: action.payload.id,
          };
        }
      },
    );
  },
});

export const { userLogOut, setFormsInitStatus } = userSlice.actions;
export default userSlice.reducer;
