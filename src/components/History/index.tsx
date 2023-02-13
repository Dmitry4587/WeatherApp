import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, CircularProgress, TextField, TextFieldProps, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryParam, StringParam } from 'use-query-params';
import { getHistory } from '../../app/slices/city/asyncActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryStatus } from '../../app/slices/city/slice';
import { itemStatus } from '../../app/slices/user/slice';
import { selectForecastDay, selectHistoryStatus, selectHistoryError } from '../../app/slices/city/selectors';
import SnackBarItem from '../SnackBarItem';
import Forecast from '../Forecast';
import styles from './History.module.css';

const History = () => {
  const { t, i18n } = useTranslation();
  const error = useAppSelector(selectHistoryError);
  const forecast = useAppSelector(selectForecastDay);
  const historyStatus = useAppSelector(selectHistoryStatus);
  const { city } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [startDateQuery, setStartDateQuery] = useQueryParam('startDate', StringParam);
  const [endDateQuery, setEndDateQuery] = useQueryParam('endDate', StringParam);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (window.location.search) {
      if (startDateQuery && dayjs(startDateQuery).isValid()) {
        setStartDate(startDateQuery);
      } else {
        navigate(`/${city}/history`);
      }
      if (endDateQuery && dayjs(endDateQuery).isValid()) {
        setEndDate(endDateQuery);
      } else {
        navigate(`/${city}/history`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(setHistoryStatus(itemStatus.INIT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickGetHistory = React.useCallback(() => {
    if (city && startDate && endDate) {
      dispatch(
        getHistory({
          city,
          dt: dayjs(startDate).format('YYYY-M-D'),
          endDt: dayjs(endDate).format('YYYY-M-D'),
          lang: i18n.resolvedLanguage,
        }),
      );
    }
  }, [dispatch, city, startDate, endDate, i18n]);

  const onChangeEndDate = React.useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (newValue) {
        setEndDateQuery(newValue.toString());
        setEndDate(newValue.toString());
      }
    },
    [setEndDate, setEndDateQuery],
  );

  const onChangeStartDate = React.useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (newValue) {
        setStartDateQuery(newValue.toString());
        setStartDate(newValue.toString());
      }
    },
    [setStartDateQuery],
  );

  const renderInput = React.useCallback((params: TextFieldProps) => <TextField variant='filled' {...params} />, []);

  const ctreateContent = React.useCallback(() => {
    if (historyStatus === itemStatus.ERROR || historyStatus === itemStatus.INIT) {
      return (
        <>
          <Box sx={{ mt: '80px', textAlign: 'center' }}>
            <Typography className={styles.HistoryText}>{t(`description.selectDate`)}</Typography>
            <CalendarMonthIcon className={styles.HistoryIcon} />
          </Box>
          {historyStatus === itemStatus.ERROR ? <SnackBarItem severity='error' text={error} /> : null}
        </>
      );
    }
    if (historyStatus === itemStatus.LOADING) {
      return <CircularProgress sx={{ m: '0 auto', mt: '80px', display: 'block' }} />;
    }
    return <Forecast forecastDay={forecast} />;
  }, [error, forecast, historyStatus, t]);

  return (
    <div style={{ position: 'relative' }}>
      <Box className={styles.HistoryWrapper}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={styles.HistoryDate}
              disableFuture
              label={t(`description.startDate`)}
              value={dayjs(startDate)}
              onChange={onChangeStartDate}
              renderInput={renderInput}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t(`description.endDate`)}
              className={styles.HistoryDate}
              disablePast
              value={dayjs(endDate)}
              onChange={onChangeEndDate}
              renderInput={renderInput}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LoadingButton
            sx={{ height: '100%', minWidth: '120px', fontSize: '16px' }}
            color={historyStatus === itemStatus.ERROR ? 'error' : 'primary'}
            loading={historyStatus === itemStatus.LOADING}
            variant='contained'
            disabled={!endDate || !startDate}
            onClick={onClickGetHistory}
            type='submit'>
            {t(`description.submit`)}
          </LoadingButton>
        </Box>
      </Box>
      {ctreateContent()}
    </div>
  );
};
export default History;
