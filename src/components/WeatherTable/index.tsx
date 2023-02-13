import * as React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { TableItem, Forecastday } from '../../app/slices/city/types';
import { useAppSelector } from '../../app/hooks';
import { selectDist, selectPressure, selectSpeed, selectTemp } from '../../app/slices/options/selectors';
import styles from './WeatherTable.module.css';

interface WeatherTableProps {
  currentDay: number;
  forecast: Forecastday[] | undefined;
}

const WeatherTable = ({ currentDay, forecast }: WeatherTableProps) => {
  const speed = useAppSelector(selectSpeed);
  const dist = useAppSelector(selectDist);
  const pressure = useAppSelector(selectPressure);
  const temp = useAppSelector(selectTemp);
  const { t } = useTranslation();
  const table: TableItem[] = [
    { title: t('description.time'), key: 'time' },
    { title: t('description.condition'), key: 'condition' },
    { title: t('description.feelsLike'), key: `feelslike_${temp}`, system: `°${temp.toUpperCase()}` },
    { title: t('description.wind'), key: `wind_${speed}`, system: t(`description.${speed}`) },
    { title: t('description.windDir'), key: 'wind_dir' },
    { title: t('description.visibility'), key: `vis_${dist}`, system: t(`description.${dist}`) },
    { title: t('description.barometer'), key: `pressure_${pressure}`, system: `${pressure}` },
  ];

  const createContent = () => {
    if (forecast) {
      const forecastDay = forecast[currentDay];
      return table.map(({ title, key, system }: TableItem) => {
        return (
          <div key={nanoid()}>
            <div className={styles.WeatherTableBlock}>
              <div className={styles.WeatherTableTitle}>{title}</div>
              {forecastDay.hour.map((item) => {
                if (key !== 'condition' && key !== 'time') {
                  return (
                    <div style={{ display: 'flex' }} key={nanoid()}>
                      <div style={{ marginRight: '3px' }}>{item[key]}</div>
                      <div>{system}</div>
                    </div>
                  );
                }
                if (key === 'time') {
                  return (
                    <div key={nanoid()} style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {dayjs(item[key]).format('HH:mm a')}
                    </div>
                  );
                }
                return <img key={nanoid()} src={item.condition.icon} alt={item.condition.text} />;
              })}
            </div>
          </div>
        );
      });
    }
  };

  return <div className={styles.WeatherTableWrapper}>{createContent()}</div>;
};

export default WeatherTable;
