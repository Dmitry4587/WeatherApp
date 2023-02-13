import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import dayjs from 'dayjs';
import { Forecastday } from '../../app/slices/city/types';
import { useAppSelector } from '../../app/hooks';
import { selectTemp } from '../../app/slices/options/selectors';
import styles from './Chart.module.css';

interface ChartItemProps {
  currentDay: number;
  forecast: Forecastday[] | undefined;
}

interface IChart {
  value: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  temp,
  t,
}: {
  active?: boolean;
  payload?: IChart[];
  label?: string | number;
  temp: string;  
  t: TFunction;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.Tooltip}>
        <p>
          {t('description.time')}: {label}
        </p>
        <p>{`${t('description.humidity')}: ${payload[0].value}%`}</p>
        <p>{`${t('description.dewPoint')}: ${payload[1].value}°${temp.toUpperCase()}`}</p>
      </div>
    );
  }

  return null;
};

const ChartItem = ({ forecast, currentDay }: ChartItemProps) => {
  const temp = useAppSelector(selectTemp);
  const { t } = useTranslation();

  const createArea = () => {
    if (forecast) {
      const forecastDay = forecast[currentDay];
      const data = forecastDay.hour.map((item) => {
        return { name: dayjs(item.time).format('HH:mm'), humidity: item.humidity, dew: item[`dewpoint_${temp}`] };
      });

      return (
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={data}
            margin={{
              top: 40,
              right: 0,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip content={<CustomTooltip temp={temp} t={t} />} />
            <XAxis dataKey='name' />
            <YAxis />
            <Legend />
            <Area
              name={`${t('description.humidity')}`}
              type='monotone'
              dataKey='humidity'
              stroke='#82ca9d'
              fill='#82ca9d'
            />
            <Area name={`${t('description.dewPoint')}`} type='monotone' dataKey='dew' stroke='#ffc658' fill='#ffc658' />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
  };

  return <div style={{ width: '100%', height: '300px' }}>{createArea()}</div>;
};

export default ChartItem;
