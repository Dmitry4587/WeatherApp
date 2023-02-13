import { itemStatus } from './slice';

export interface User {
  name: string;
  surname: string;
  id: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserState {
  userInfo: User | null;
  userLoginStatus: itemStatus;
  userRegistrStatus: itemStatus;
  userEditStatus: itemStatus;
  userCodeStatus: itemStatus;

  registrError: null | string;
  editError: null | string;
  loginError: null | string;
}

export function isUserPayload(payload: unknown): payload is User {
  if (payload) {
    return (payload as User).id !== undefined;
  }
  return false;
}
