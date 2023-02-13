import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServicesMethods, fetchUser } from '../../../services';
import { User } from './types';

export const setUser = createAsyncThunk(
  'user/setUser',
  async ({ email, password, name, surname, phone }: User, { rejectWithValue }) => {
    try {
      await fetchUser(`users?email=${email}`, ServicesMethods.GET);
      return rejectWithValue('Error try changing data');
    } catch (e) {
      try {
        return (await fetchUser(`users`, ServicesMethods.POST, {
          email,
          id: nanoid(),
          password,
          name,
          surname,
          phone,
        })) as User;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          return rejectWithValue(e.message);
        }
        return rejectWithValue('Error try changing data');
      }
    }
  },
);

export const userLogIn = createAsyncThunk(
  'user/userLogIn',
  async ({ email, password }: Pick<User, 'email' | 'password'>, { rejectWithValue }) => {
    try {
      const res = (await fetchUser(`users?email=${email}&password=${password}`, ServicesMethods.GET)) as User;
      return res;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Error try changing data');
    }
  },
);

export const editUser = createAsyncThunk(
  'user/userEdit',
  async ({ email, id, password, name, surname, phone }: User, { rejectWithValue }) => {
    try {
      try {
        await fetchUser(
          `users?email=${email}&password=${password}&surname=${surname}&phone=${phone.replace(
            '+',
            '%2b',
          )}&name=${name}`,
          ServicesMethods.GET,
        );
        return rejectWithValue('Error try changing data');
      } catch (e) {
        return (await fetchUser(`users/${id}`, ServicesMethods.PUT, {
          email,
          password,
          name,
          surname,
          phone,
          id,
        })) as User;
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Error try changing data');
    }
  },
);
