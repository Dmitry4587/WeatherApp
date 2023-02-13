import * as React from 'react';
import List from '@mui/material/List';
import ErrorIcon from '@mui/icons-material/Error';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { itemStatus } from '../../app/slices/user/slice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Sport from '../Sport';
import { SportEventData } from '../../app/slices/city/types';
import { getEvents } from '../../app/slices/city/asyncActions';
import { selectCityEvents, selectSportsError, selectSportsStatus } from '../../app/slices/city/selectors';

const SportsList = () => {
  const sportsStatus = useAppSelector(selectSportsStatus);
  const error = useAppSelector(selectSportsError);
  const events = useAppSelector(selectCityEvents);
  const { city } = useParams();
  const dispatch = useAppDispatch();

  const getCityEvents = React.useCallback(
    (city: string | undefined) => {
      if (city) {
        dispatch(getEvents(city));
      }
    },
    [dispatch],
  );

  const renderEvents = React.useMemo(() => {
    if (events) {
      return events.map((item: SportEventData) => {
        return <Sport key={nanoid()} {...item} add />;
      });
    }
  }, [events]);

  React.useEffect(() => {
    getCityEvents(city);
  }, [dispatch, getCityEvents, city]);

  if (sportsStatus === itemStatus.LOADING) {
    return <CircularProgress sx={{ m: '0 auto', mt: '50px', display: 'block' }} />;
  }

  if (sportsStatus === itemStatus.ERROR) {
    return (
      <>
        <ErrorIcon color='error' sx={{ fontSize: '80px', m: '0 auto', mt: '50px', display: 'block' }} />
        <div
          style={{
            fontSize: '20px',
            color: 'var(--primary)',
            marginTop: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {error}
        </div>
      </>
    );
  }

  return (
    <List
      sx={{
        width: '60%',
        m: '0 auto',
        marginTop: '10px',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
      {renderEvents}
    </List>
  );
};

export default SportsList;
