import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { itemStatus } from '../user/slice';
import { setCity, getEvents, getAutoComplete, getHistory } from './asyncActions';
import { WeatherCityResponse, CityState, SportEvent } from './types';

const initialState: CityState = {
  weather: null,
  weatherHistory: null,
  sports: [],
  favoriteCities: [],
  favoriteEvents: [],
  autocomplete: [],
  sportsStatus: itemStatus.LOADING,
  cityStatus: itemStatus.LOADING,
  autocompleteStatus: itemStatus.INIT,
  weatherHistoryStatus: itemStatus.LOADING,
  historyError: null,
  searchError: null,
  sportsError: null,
  weatherError: null,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addFavoriteCity(state, action: PayloadAction<WeatherCityResponse>) {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity(state, action: PayloadAction<WeatherCityResponse>) {
      state.favoriteCities = state.favoriteCities.filter((item) => item.location.name !== action.payload.location.name);
    },
    addFavoriteEvent(state, action: PayloadAction<string>) {
      const favSport = state.sports.filter((item) => item.match === action.payload);
      state.favoriteEvents.push(...favSport);
    },
    removeFavoriteEvent(state, action: PayloadAction<string>) {
      state.favoriteEvents = state.favoriteEvents.filter((item) => item.match !== action.payload);
    },
    setHistoryStatus(state, action: PayloadAction<itemStatus>) {
      state.weatherHistoryStatus = action.payload;
    },
    setAutocompleteStatus(state, action: PayloadAction<itemStatus>) {
      state.autocompleteStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCity.pending, (state) => {
      state.cityStatus = itemStatus.LOADING;
    });
    builder.addCase(setCity.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.cityStatus = itemStatus.CONFIRM;
    });
    builder.addCase(setCity.rejected, (state, action) => {
      state.cityStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.weatherError = action.payload;
      }
    });
    builder.addCase(getEvents.pending, (state) => {
      state.sportsStatus = itemStatus.LOADING;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      const sportData = Object.entries(action.payload).map((arr) => {
        return arr[1].map((eventInfo: SportEvent) => ({ ...eventInfo, sport: arr[0] }));
      });
      state.sports = sportData.flat();
      state.sportsStatus = itemStatus.CONFIRM;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.sportsStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.sportsError = action.payload;
      }
    });
    builder.addCase(getAutoComplete.pending, (state) => {
      state.autocompleteStatus = itemStatus.LOADING;
    });
    builder.addCase(getAutoComplete.fulfilled, (state, action) => {
      state.autocomplete = action.payload;
      state.autocompleteStatus = itemStatus.CONFIRM;
    });
    builder.addCase(getAutoComplete.rejected, (state, action) => {
      state.autocompleteStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.searchError = action.payload;
      }
    });
    builder.addCase(getHistory.pending, (state) => {
      state.weatherHistoryStatus = itemStatus.LOADING;
    });
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.weatherHistory = action.payload;
      state.weatherHistoryStatus = itemStatus.CONFIRM;
    });
    builder.addCase(getHistory.rejected, (state, action) => {
      state.weatherHistoryStatus = itemStatus.ERROR;
      if (typeof action.payload === 'string') {
        state.historyError = action.payload;
      }
    });
  },
});

export const {
  addFavoriteCity,
  removeFavoriteCity,
  addFavoriteEvent,
  removeFavoriteEvent,
  setHistoryStatus,
  setAutocompleteStatus,
} = citySlice.actions;
export default citySlice.reducer;
