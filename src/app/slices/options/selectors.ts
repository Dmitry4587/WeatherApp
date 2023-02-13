import { RootState } from '../../store';

export const selectSpeed = (state: RootState) => state.units.speed;
export const selectDist = (state: RootState) => state.units.dist;
export const selectPressure = (state: RootState) => state.units.pressure;
export const selectTemp = (state: RootState) => state.units.temp;
