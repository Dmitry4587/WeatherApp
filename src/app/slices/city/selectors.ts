import { RootState } from '../../store';

export const selectCityLocation = (state: RootState) => state.city.weather?.location;
export const selectCity = (state: RootState) => state.city.weather;
export const selectAutocomplete = (state: RootState) => state.city.autocomplete;
export const selectAutocompleteStatus = (state: RootState) => state.city.autocompleteStatus;
export const selectCurrentWeather = (state: RootState) => state.city.weather?.current;
export const selectFavoriteEvents = (state: RootState) => state.city.favoriteEvents;
export const selectFavoriteCities = (state: RootState) => state.city.favoriteCities;
export const selectSportsStatus = (state: RootState) => state.city.sportsStatus;
export const selectCityEvents = (state: RootState) => state.city.sports;
export const selectCityStatus = (state: RootState) => state.city.cityStatus;
export const selectForecastDay = (state: RootState) => state.city.weather?.forecast.forecastday;
export const selectHistoryStatus = (state: RootState) => state.city.weatherHistoryStatus;
export const selectHistoryError = (state: RootState) => state.city.historyError;
export const selectSportsError = (state: RootState) => state.city.sportsError;
export const selectSearchError = (state: RootState) => state.city.searchError;
export const selectWeatherError = (state: RootState) => state.city.weatherError;
