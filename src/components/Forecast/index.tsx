import React from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import WeatherSlider from '../WeatherSlider';
import WeatherTable from '../WeatherTable';
import { Forecastday } from '../../app/slices/city/types';
import ChartItem from '../ChartItem';
import ForecastCards from '../ForecastCards';
import styles from './Forecast.module.css';

interface ForecastProps {
  forecastDay: Forecastday[] | undefined;
}

const Forecast = ({ forecastDay }: ForecastProps) => {
  const [currentDay, setCurrentDay] = React.useState(0);
  const [dayQuery, setDay] = useQueryParam('day', NumberParam);

  React.useEffect(() => {
    if (dayQuery) {
      if (dayQuery && forecastDay) {
        const days = forecastDay;
        if (dayQuery && dayQuery < days.length && dayQuery > -1) {
          setDay(dayQuery);
          setCurrentDay(dayQuery);
        } else {
          setDay(0);
          setCurrentDay(0);
        }
      }
    } else {
      setDay(0);
      setCurrentDay(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDayChange = React.useCallback(
    (day: number) => {
      setDay(day);
      setCurrentDay(day);
    },

    [setDay],
  );

  return (
    <div className={styles.ForecastWrapper}>
      <div>
        <WeatherSlider currentDay={currentDay} forecast={forecastDay} handleDayChange={handleDayChange} />
        <ForecastCards currentDay={currentDay} forecast={forecastDay} />
      </div>
      <div>
        <WeatherTable forecast={forecastDay} currentDay={currentDay} />
        <ChartItem currentDay={currentDay} forecast={forecastDay} />
      </div>
    </div>
  );
};

export default Forecast;
