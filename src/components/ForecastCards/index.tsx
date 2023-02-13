import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterIcon from '@mui/icons-material/Water';
import { useTranslation } from 'react-i18next';
import { Forecastday } from '../../app/slices/city/types';
import { setDangerUv, setDangerHum } from '../../utils';
import { selectDist, selectSpeed, selectTemp } from '../../app/slices/options/selectors';
import { useAppSelector } from '../../app/hooks';
import styles from './ForecastCards.module.css';

interface ForecastCardsProps {
  currentDay: number;
  forecast: Forecastday[] | undefined;
}

const ForecastCards = ({ forecast, currentDay }: ForecastCardsProps) => {
  const speed = useAppSelector(selectSpeed);
  const dist = useAppSelector(selectDist);
  const temp = useAppSelector(selectTemp);
  const { t } = useTranslation();

  return (
    <div className={styles.WeatherForecastWrapper}>
      {forecast ? (
        <>
          <div className={`${styles.ForecastBlock}`}>
            <div className={styles.ForecastBlocklabel}>
              <WbSunnyIcon />
              <div className={styles.ForecastTitle}>uv index</div>
            </div>
            <div className={styles.ForecastIndex}>{forecast[currentDay].day.uv}</div>
            <div className={styles.ForecastIndexText}>{setDangerUv(forecast[currentDay].day.uv)}</div>
            <div className={styles.ForecastLine}>
              <div
                className={styles.ForecastLineDot}
                style={{
                  left: `calc(${forecast[currentDay].day.uv * 10}% - 10px)`,
                  width: '10px',
                }}
              />
            </div>
            <div className={styles.ForecastMoreInfo}>
              {setDangerUv(forecast[currentDay].day.uv)} {t(`description.restDay`)}
            </div>
          </div>

          <div className={`${styles.ForecastBlock} ${styles.ForecastBlockRounded}`}>
            <div className={styles.ForecastBlockRoundedWrapper}>
              <div className={styles.ForecastBlockRoundedItem}>
                <WbSunnyIcon className={styles.ForecastBlockRoundedIcon} />
                <span>{t('description.sunrise')}</span>
                <span className={styles.ForecastBlockRoundedTime}>{forecast[currentDay].astro.sunrise}</span>
              </div>
              <div className={styles.ForecastBlockRoundedItem}>
                <WbTwilightIcon className={styles.ForecastBlockRoundedIcon} />
                <span>{t('description.sunset')}</span>
                <span className={styles.ForecastBlockRoundedTime}>{forecast[currentDay].astro.sunset}</span>
              </div>
            </div>
          </div>

          <div className={styles.ForecastBlock}>
            <div className={styles.ForecastBlocklabel}>
              <WaterIcon />
              <div className={styles.ForecastTitle}>{t('description.avrHumidity')}</div>
            </div>
            <div className={styles.ForecastIndex}>{forecast[currentDay].day.avghumidity} %</div>
            <div className={styles.ForecastIndexText}>{setDangerHum(forecast[currentDay].day.avghumidity)}</div>
            <div className={styles.ForecastLine}>
              <div
                className={styles.ForecastLineDot}
                style={{
                  left: `calc(${forecast[currentDay].day.avghumidity}% - 10px)`,
                  width: '10px',
                }}
              />
            </div>
            <div className={styles.ForecastMoreInfo}>
              {setDangerHum(forecast[currentDay].day.avghumidity)} {t(`description.restDay`)}
            </div>
          </div>

          <div className={styles.ForecastBlock}>
            <div className={styles.ForecastBlocklabel}>
              <AirIcon />
              <div className={styles.ForecastTitle}>{t('description.maxWind')}</div>
            </div>
            <div className={styles.ForecastInfo}>
              {forecast[currentDay].day[`maxwind_${speed}`]} {t(`description.${speed}`)}
            </div>
          </div>

          <div className={styles.ForecastBlock}>
            <div className={styles.ForecastBlocklabel}>
              <VisibilityIcon />
              <div className={styles.ForecastTitle}>{t('description.avrVisibility')}</div>
            </div>
            <div className={styles.ForecastInfo}>
              {forecast[currentDay].day[`avgvis_${dist}`]} {t(`description.${dist}`)}
            </div>
          </div>

          <div className={styles.ForecastBlock}>
            <div className={styles.ForecastBlocklabel}>
              <DeviceThermostatIcon />
              <div className={styles.ForecastTitle}>{t('description.avrTemperature')}</div>
            </div>
            <div className={styles.ForecastInfo}>
              {forecast[currentDay].day[`avgtemp_${temp}`]} {`°${temp.toUpperCase()}`}
            </div>
          </div>

          {forecast[currentDay].day.daily_chance_of_rain > 0 ? (
            <div className={styles.ForecastPercentCard}>
              <div>
                <div className={styles.ForecastPercentCircle}>
                  <svg>
                    <circle
                      style={{
                        strokeDashoffset: `calc(440px - (440px * ${forecast[currentDay].day.daily_chance_of_rain}) / 100)`,
                      }}
                      cx='70'
                      cy='70'
                      r='70'
                    />
                    <circle
                      style={{
                        strokeDashoffset: `calc(440px - (440px * ${forecast[currentDay].day.daily_chance_of_rain}) / 100)`,
                      }}
                      cx='70'
                      cy='70'
                      r='70'
                    />
                  </svg>
                  <div className={styles.ForecastPercentNumber}>
                    <h2>
                      {forecast[currentDay].day.daily_chance_of_rain}
                      <span>%</span>
                    </h2>
                    <span>{t('description.chanceOfRain')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {forecast[currentDay].day.daily_chance_of_snow > 0 ? (
            <div className={styles.ForecastPercentCard}>
              <div>
                <div className={styles.ForecastPercentCircle}>
                  <svg>
                    <circle
                      style={{
                        strokeDashoffset: `calc(440px - (440px * ${forecast[currentDay].day.daily_chance_of_snow}) / 100)`,
                      }}
                      cx='70'
                      cy='70'
                      r='70'
                    />
                    <circle
                      style={{
                        strokeDashoffset: `calc(440px - (440px * ${forecast[currentDay].day.daily_chance_of_snow}) / 100)`,
                      }}
                      cx='70'
                      cy='70'
                      r='70'
                    />
                  </svg>
                  <div className={styles.ForecastPercentNumber}>
                    <h2>
                      {forecast[currentDay].day.daily_chance_of_snow}
                      <span>%</span>
                    </h2>
                    <span>{t('description.chanceOfSnow')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ForecastCards;
