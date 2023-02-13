import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnitsSlice } from './types';

const initialState: UnitsSlice = {
  temp: 'f',
  speed: 'mph',
  dist: 'miles',
  pressure: 'in',
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setUnitsTemp(state, action: PayloadAction<'c' | 'f'>) {
      state.temp = action.payload;
    },
    setUnitsSpeed(state, action: PayloadAction<'kph' | 'mph'>) {
      state.speed = action.payload;
    },
    setUnitsDist(state, action: PayloadAction<'km' | 'miles'>) {
      state.dist = action.payload;
    },
    setUnitsPressure(state, action: PayloadAction<'mb' | 'in'>) {
      state.pressure = action.payload;
    },
  },
});

export const { setUnitsTemp, setUnitsSpeed, setUnitsDist, setUnitsPressure } = unitsSlice.actions;
export default unitsSlice.reducer;
