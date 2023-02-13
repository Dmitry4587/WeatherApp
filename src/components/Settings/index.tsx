import React from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUnitsDist, setUnitsPressure, setUnitsSpeed, setUnitsTemp } from '../../app/slices/options/slice';
import { ThemeContext, themes, ChangeTheme } from '../../contexts/ThemeContext';
import { selectDist, selectPressure, selectSpeed, selectTemp } from '../../app/slices/options/selectors';
import styles from './Settings.module.css';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Settings = () => {
  const speed = useAppSelector(selectSpeed);
  const dist = useAppSelector(selectDist);
  const pressure = useAppSelector(selectPressure);
  const temp = useAppSelector(selectTemp);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.resolvedLanguage);
  const [checked, setChecked] = React.useState(true);

  const onChangeLanguage = React.useCallback(
    (e: SelectChangeEvent) => {
      setLang(e.target.value);
      i18n.changeLanguage(e.target.value);
    },
    [i18n],
  );

  const onChangeSpeed = React.useCallback(
    (e: SelectChangeEvent) => dispatch(setUnitsSpeed(e.target.value as 'kph' | 'mph')),
    [dispatch],
  );
  const onChangeDist = React.useCallback(
    (e: SelectChangeEvent) => dispatch(setUnitsDist(e.target.value as 'km' | 'miles')),
    [dispatch],
  );
  const onChangeTemp = React.useCallback(
    (e: SelectChangeEvent) => dispatch(setUnitsTemp(e.target.value as 'c' | 'f')),
    [dispatch],
  );
  const onChangePressure = React.useCallback(
    (e: SelectChangeEvent) => dispatch(setUnitsPressure(e.target.value as 'mb' | 'in')),
    [dispatch],
  );

  return (
    <Box className={styles.SettingsWrapper}>
      <Box className={styles.SettingsBlock}>
        <Typography className={styles.SettingsText}>{t('description.units')}</Typography>
        <FormControl className={styles.SettingForm}>
          <InputLabel className={styles.SettingsColor}>{t('description.speed')} </InputLabel>
          <Select
            className={styles.SettingsColor}
            value={speed}
            label={t('description.speed')}
            onChange={onChangeSpeed}>
            <MenuItem value='kph'>kph</MenuItem>
            <MenuItem value='mph'>mph</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.SettingForm}>
          <InputLabel className={styles.SettingsColor}>{t('description.temperature')} </InputLabel>
          <Select
            className={styles.SettingsColor}
            value={temp}
            label={t('description.temperature')}
            onChange={onChangeTemp}>
            <MenuItem value='c'>C</MenuItem>
            <MenuItem value='f'>F</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={`${styles.SettingForm}  ${styles.SettingsBlockItem} `}>
          <InputLabel className={styles.SettingsColor}>{t('description.distance')} </InputLabel>
          <Select
            className={styles.SettingsColor}
            value={dist}
            label={t('description.distance')}
            onChange={onChangeDist}>
            <MenuItem value='km'>km</MenuItem>
            <MenuItem value='miles'>miles</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.SettingForm}>
          <InputLabel className={styles.SettingsColor}>{t('description.pressure')}</InputLabel>
          <Select
            className={styles.SettingsColor}
            value={pressure}
            label={t('description.pressure')}
            onChange={onChangePressure}>
            <MenuItem value='in'>in</MenuItem>
            <MenuItem value='mb'>mb</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.SettingsBlock}>
        <Typography className={styles.SettingsText}>{t('description.lang')}</Typography>
        <FormControl className={styles.SettingForm}>
          <InputLabel className={styles.SettingsColor}>{t('description.lang')} </InputLabel>
          <Select
            className={styles.SettingsColor}
            value={lang}
            label={t('description.lang')}
            onChange={onChangeLanguage}>
            <MenuItem value='en'>en</MenuItem>
            <MenuItem value='de'>de</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.SettingsBlockTheme}>
        <Typography className={styles.SettingsText}>{t('description.theme')}</Typography>
        <ThemeContext.Consumer>
          {({ theme, handleSetTheme }: ChangeTheme) => (
            <FormControlLabel
              control={
                <MaterialUISwitch
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    if (theme === themes.light) {
                      handleSetTheme(themes.dark);
                    }
                    if (theme === themes.dark) {
                      handleSetTheme(themes.light);
                    }
                  }}
                  checked={checked}
                />
              }
              label=''
            />
          )}
        </ThemeContext.Consumer>
      </Box>
    </Box>
  );
};

export default Settings;
