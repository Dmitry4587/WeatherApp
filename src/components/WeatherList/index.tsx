import * as React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { nanoid } from '@reduxjs/toolkit';
import { CardActions, Button, Typography, Grid, Box, CardContent, Card } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import { NavLink } from 'react-router-dom';
import FavoriteEmpty from '../FavoriteEmpty';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { WeatherCityResponse } from '../../app/slices/city/types';
import { removeFavoriteCity } from '../../app/slices/city/slice';
import { selectSpeed, selectTemp } from '../../app/slices/options/selectors';
import { selectFavoriteCities } from '../../app/slices/city/selectors';
import styles from './WeatherList.module.css';

const WeatherList = () => {
  const speed = useAppSelector(selectSpeed);
  const temp = useAppSelector(selectTemp);
  const favoriteCities = useAppSelector(selectFavoriteCities);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClickDelCity = React.useCallback(
    (city: WeatherCityResponse) => {
      dispatch(removeFavoriteCity(city));
    },
    [dispatch],
  );

  const createContent = () => {
    if (!favoriteCities.length) {
      return (
        <FavoriteEmpty
          text={t('description.emptyCities')}
          icon={<CloudIcon sx={{ fontSize: '120px', color: '#2196f3' }} />}
        />
      );
    }
    return (
      <Grid container className={styles.WeatherListWrapper}>
        {favoriteCities.map((item) => (
          <Grid item key={nanoid()}>
            <Card>
              <CardContent className={styles.WeatherListCard}>
                <Box className={styles.WeatherListHead}>
                  <Box>
                    <Typography className={styles.WeatherListLocation}>{item.location.name}</Typography>
                    <Typography className={styles.WeatherListCondition}>{item.current.condition.text}</Typography>
                    <Typography className={styles.WeatherListWind}>
                      {t('description.wind')}: {item.current[`wind_${speed}`]} {t(`description.${speed}`)}
                    </Typography>
                    <Typography className={styles.WeatherListTemp}>
                      {item.current[`temp_${temp}`]}°{temp.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box>
                    <img src={item.current.condition.icon} alt={item.current.condition.text} />
                  </Box>
                </Box>
                <Box className={styles.WeatherListBody}>
                  {item.forecast.forecastday.map((itemforcast) => {
                    return (
                      <Box key={nanoid()}>
                        <Typography className={styles.WeatherListText} sx={{ textAlign: 'center' }}>
                          {dayjs(itemforcast.date).format('ddd')}
                        </Typography>
                        <img src={itemforcast.day.condition.icon} alt={itemforcast.day.condition.text} />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
              <CardActions className={styles.WeatherListCardActions}>
                <NavLink to={item.location.name}>
                  <Button className={styles.WeatherListActions} size='small'>
                    {t('description.moreInfo')}
                  </Button>
                </NavLink>
                <Button className={styles.WeatherListActions} onClick={() => onClickDelCity(item)} size='small'>
                  {t('description.delete')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <div className={styles.WeatherListTitle}>{t('description.favoriteCities')}</div>
      {createContent()}
    </>
  );
};

export default WeatherList;
