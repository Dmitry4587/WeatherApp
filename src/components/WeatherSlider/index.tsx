import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import dayjs from 'dayjs';
import { nanoid } from '@reduxjs/toolkit';
import { CardContent, Box, CardActionArea, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectTemp } from '../../app/slices/options/selectors';
import { Forecastday } from '../../app/slices/city/types';
import styles from './WeatherSlider.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface WeatherSliderProps {
  handleDayChange: (day: number) => void;
  forecast: Forecastday[] | undefined;
  currentDay: number;
}

const WeatherSlider = ({ handleDayChange, forecast, currentDay }: WeatherSliderProps) => {
  const temp = useAppSelector(selectTemp);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      breakpoints={{
        800: {
          slidesPerView: 2,
        },
      }}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}>
      {forecast?.map((item, i) => {
        return (
          <SwiperSlide key={nanoid()}>
            <div className={styles.WeatherSliderCard}>
              <CardActionArea onClick={() => handleDayChange(i)}>
                <CardContent>
                  <Typography
                    className={i === currentDay ? styles.WeatherSliderCardActive : null}
                    sx={{ fontSize: 22, fontWeight: 'semibold' }}
                    gutterBottom>
                    {dayjs(item.date).format('ddd, MMM D, YY')}
                  </Typography>
                  <Box className={styles.WeatherSliderTemp}>
                    <img src={item.day.condition.icon} alt={item.day.condition.text} />
                    <Typography sx={{ fontSize: 25 }}>
                      {item.day[`mintemp_${temp}`]}°{temp.toUpperCase()}
                    </Typography>
                    <Typography className={styles.WeatherSliderMinTemp} color='text.secondary'>
                      {item.day[`maxtemp_${temp}`]}°{temp.toUpperCase()}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WeatherSlider;
