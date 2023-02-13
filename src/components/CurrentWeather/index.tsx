import React from 'react';
import { CardContent, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavoriteCity, removeFavoriteCity } from '../../app/slices/city/slice';
import { selectCity, selectFavoriteCities } from '../../app/slices/city/selectors';
import { selectDist, selectPressure, selectSpeed, selectTemp } from '../../app/slices/options/selectors';
import styles from './CurrentWeather.module.css';

const CurrentWeather = () => {
  const temp = useAppSelector(selectTemp);
  const speed = useAppSelector(selectSpeed);
  const dist = useAppSelector(selectDist);
  const pressure = useAppSelector(selectPressure);
  const currentCity = useAppSelector(selectCity);
  const favoriteCities = useAppSelector(selectFavoriteCities);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const favoriteCity = React.useMemo(
    () => favoriteCities.filter((item) => item.location.name === currentCity?.location.name),
    [favoriteCities, currentCity],
  );
  const isFavCityExsist = favoriteCity.length > 0;
  const [selected, setSelected] = React.useState(isFavCityExsist);
  const onClickToggle = React.useCallback(() => {
    if (currentCity) {
      setSelected(!selected);
      if (isFavCityExsist) {
        dispatch(removeFavoriteCity(currentCity));
      } else {
        dispatch(addFavoriteCity(currentCity));
      }
    }
  }, [dispatch, selected, currentCity, isFavCityExsist]);

  return (
    <div className={styles.currentWeatherWrapper}>
      <Link style={{ position: 'absolute', left: '-50px' }} to='/'>
        <IconButton>
          <HomeIcon className={styles.currentWeatherIcon} />
        </IconButton>
      </Link>
      <IconButton sx={{ position: 'absolute', right: '-70px' }} onClick={onClickToggle}>
        {selected ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon className={styles.currentWeatherIcon} />}
      </IconButton>
      <div>
        <CardContent className={styles.currentWeatherCard}>
          <Box>
            <Typography className={styles.currentWeatherCity} gutterBottom>
              {currentCity?.location.country}
            </Typography>
            <Typography className={styles.currentWeatherTitle} gutterBottom>
              {currentCity?.location.name}
            </Typography>
            <Box className={styles.currentWeatherConditional}>
              <img src={currentCity?.current?.condition.icon} alt={currentCity?.current.condition.text} />
              <Typography sx={{ fontSize: '30px' }}>
                {currentCity?.current[`temp_${temp}`]}°{temp.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.currentWeatherBlock}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: '3px' }}>
                {t('description.feelsLike')}: {currentCity?.current[`feelslike_${temp}`]}
              </Typography>
              <Typography>°{temp.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: '3px' }}>
                {t('description.wind')}: {currentCity?.current[`wind_${speed}`]}
              </Typography>
              <Typography> {t(`description.${speed}`)}</Typography>
            </Box>
            <Typography className={styles.currentWeatherText}>
              {t('description.windDir')}: {currentCity?.current.wind_dir}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: '3px' }}>
                {t('description.barometer')}: {currentCity?.current[`pressure_${pressure}`]}
              </Typography>
              <Typography>{pressure}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: '3px' }}>
                {t('description.humidity')}: {currentCity?.current.humidity}
              </Typography>
              <Typography>%</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: '3px' }}>
                {t('description.visibility')}: {currentCity?.current[`vis_${dist}`]}
              </Typography>
              <Typography>{t(`description.${dist}`)}</Typography>
            </Box>
          </Box>
          <Box className={styles.currentWeatherUpdate}>
            {t('description.lastUpdate')}: {dayjs(currentCity?.current?.last_updated).format('ddd MMM D HH:mm')}
          </Box>
        </CardContent>
      </div>
    </div>
  );
};

export default CurrentWeather;
