import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServicesMethods, fetchCity } from '../../../services';
import { isWeatherCityResponse, isEventsResponse, AutoCompleteResponse } from './types';

export const setCity = createAsyncThunk(
  'city/setCity',
  async ({ city, lang }: Record<string, string>, { rejectWithValue }) => {
    try {
      const res = await fetchCity(`forecast.json?q=${city}&days=3&lang=${lang}`, ServicesMethods.GET);
      if (isWeatherCityResponse(res)) {
        return res;
      }
      return rejectWithValue('Error');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Error');
    }
  },
);

export const getEvents = createAsyncThunk('city/getEvents', async (city: string, { rejectWithValue }) => {
  try {
    const res = await fetchCity(`sports.json?q=${city}`, ServicesMethods.GET);
    if (isEventsResponse(res)) {
      return res;
    }
    return rejectWithValue('Error');
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue(e.message);
    }
    return rejectWithValue('Error');
  }
});

export const getAutoComplete = createAsyncThunk('city/getAutocomplete', async (city: string, { rejectWithValue }) => {
  try {
    const res = (await fetchCity(`search.json?q=${city}`, ServicesMethods.GET)) as AutoCompleteResponse;
    return res;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue(e.message);
    }
    return rejectWithValue('Error');
  }
});

export const getHistory = createAsyncThunk(
  'city/getHistory',
  async ({ city, dt, endDt, lang }: Record<string, string>, { rejectWithValue }) => {
    try {
      const res = await fetchCity(`history.json?q=${city}&dt=${dt}&end_dt=${endDt}$lang=${lang}`, ServicesMethods.GET);
      if (isWeatherCityResponse(res)) {
        return res;
      }
      return rejectWithValue('Error');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Error');
    }
  },
);
