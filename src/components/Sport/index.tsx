import React from 'react';
import { ListItem, Box, ToggleButton, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { SportEventData } from '../../app/slices/city/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavoriteEvent, removeFavoriteEvent } from '../../app/slices/city/slice';
import { selectFavoriteEvents } from '../../app/slices/city/selectors';
import styles from './SportEvent.module.css';

interface SportEventProps extends SportEventData {
  add: boolean;
}

const Sport = ({ sport, match, tournament, start, stadium, add, region }: SportEventProps) => {
  const favoriteEvents = useAppSelector(selectFavoriteEvents);
  const favoriteEvent = React.useMemo(
    () => favoriteEvents.filter((item) => item.match === match),
    [favoriteEvents, match],
  );
  const isFavEventExsist = favoriteEvent.length > 0;
  const [selected, setSelected] = React.useState(isFavEventExsist);
  const dispatch = useAppDispatch();

  const onClickToggle = React.useCallback(() => {
    setSelected(!selected);
    if (isFavEventExsist) {
      dispatch(removeFavoriteEvent(match));
    } else {
      dispatch(addFavoriteEvent(match));
    }
  }, [dispatch, isFavEventExsist, selected, match]);

  const onCLickDelete = React.useCallback(() => {
    dispatch(removeFavoriteEvent(match));
  }, [dispatch, match]);

  const setIcon = () => {
    switch (sport) {
      case 'football':
        return <SportsFootballIcon className={styles.SportEventIcon} />;
      case 'cricket':
        return <SportsCricketIcon className={styles.SportEventIcon} />;
      case 'golf':
        return <SportsGolfIcon className={styles.SportEventIcon} />;
      default:
        break;
    }
  };

  const setAction = React.useMemo(() => {
    if (add) {
      return (
        <ToggleButton className={styles.SportEventToggle} value='check' selected={selected} onChange={onClickToggle}>
          <CheckIcon />
        </ToggleButton>
      );
    }
    return (
      <IconButton onClick={onCLickDelete} edge='end' aria-label='delete'>
        <DeleteIcon color='error' className={styles.SportEventDel} />
      </IconButton>
    );
  }, [add, onClickToggle, selected, onCLickDelete]);

  return (
    <ListItem className={styles.SportsListItem}  secondaryAction={setAction}>
      <Box className={styles.SportEventWrapper}>
        <Box className={styles.SportsEventDate}>
          <Box>
            <Typography className={styles.SportEventTitle}>{dayjs(start).format('ddd')}</Typography>
            <Typography className={styles.SportEventTitle}>{dayjs(start).format('MMM')}</Typography>
            <Typography className={styles.SportEventSubTitle}>{dayjs(start).format('HH:mm')}</Typography>
          </Box>
        </Box>
        <Box className={styles.SportsEventDescr}>
          <Typography color='primary' className={styles.SportEventMatch}>
            {match}
          </Typography>
          <Box className={styles.SportsEventBlock}>
            <Typography>Tournament:</Typography>
            <Typography className={styles.SportEventText}>{tournament}</Typography>
          </Box>
          <Box className={styles.SportsEventBlock}>
            <Typography>Sports Event:</Typography>
            {setIcon()}
          </Box>
          <Box className={styles.SportsEventBlock}>
            <Typography>Location:</Typography>
            <Typography className={styles.SportEventText}>{stadium}</Typography>
          </Box>
          {region !== '' ? (
            <Box className={styles.SportsEventBlock}>
              <Typography>Region:</Typography>
              <Typography className={styles.SportEventText}>{region}</Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </ListItem>
  );
};

export default Sport;
