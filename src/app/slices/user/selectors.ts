import { RootState } from '../../store';

export const selectLoginFormStatus = (state: RootState) => state.user.userLoginStatus;
export const selectRegistrFormStatus = (state: RootState) => state.user.userRegistrStatus;
export const selectEditFormStatus = (state: RootState) => state.user.userEditStatus;
export const selectCodeFormStatus = (state: RootState) => state.user.userCodeStatus;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectEditError = (state: RootState) => state.user.editError;
export const selectRegistrError = (state: RootState) => state.user.registrError;
export const selectLoginError = (state: RootState) => state.user.loginError;
