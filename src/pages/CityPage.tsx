import * as React from 'react';
import { useParams, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { CircularProgress, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setCity } from '../app/slices/city/asyncActions';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { itemStatus } from '../app/slices/user/slice';
import { selectCityStatus, selectForecastDay, selectWeatherError } from '../app/slices/city/selectors';
import SnackBarItem from '../components/SnackBarItem';
import NavigationItem from '../components/Navigation';
import CurrentWeather from '../components/CurrentWeather';
import SportsList from '../components/SportsList';
import History from '../components/History';
import Forecast from '../components/Forecast';

const CityPage = () => {
  const cityStatus = useAppSelector(selectCityStatus);
  const error = useAppSelector(selectWeatherError);
  const forecastDay = useAppSelector(selectForecastDay);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { city } = useParams();

  const getCity = React.useCallback(
    (city: string | undefined) => {
      if (city) {
        dispatch(setCity({ city, lang: i18n.resolvedLanguage }));
      }
    },
    [dispatch, i18n],
  );

  React.useEffect(() => {
    getCity(city);
  }, [dispatch, getCity, city]);

  if (cityStatus === itemStatus.LOADING) {
    return (
      <CircularProgress sx={{ left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }} />
    );
  }

  if (cityStatus === itemStatus.ERROR) {
    return (
      <>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ErrorIcon color='error' sx={{ fontSize: '90px' }} />
            <NavLink to='/'>
              <Button size='large' sx={{ mt: '20px' }} variant='contained'>
                Go Home
              </Button>
            </NavLink>
          </Box>
        </Box>
        <SnackBarItem severity='error' text={error} />
      </>
    );
  }

  return (
    <div>
      <CurrentWeather />
      <NavigationItem />
      <Routes>
        <Route index element={<Forecast forecastDay={forecastDay} />} />
        <Route path='history' element={<History />} />
        <Route path='events' element={<SportsList />} />
        <Route path='*' element={<Navigate to={`/${city}`} />} />
      </Routes>
    </div>
  );
};

export default CityPage;
