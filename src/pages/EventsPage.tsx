import * as React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Box, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Sport from '../components/Sport';
import SettingsHeader from '../components/SettingsHeader/SettingsHeader';
import { useAppSelector } from '../app/hooks';
import { selectFavoriteEvents } from '../app/slices/city/selectors';
import FavoriteEmpty from '../components/FavoriteEmpty';

const EventsPage = () => {
  const favoriteEvents = useAppSelector(selectFavoriteEvents);
  const { t } = useTranslation();

  const createContent = () => {
    if (favoriteEvents.length) {
      return (
        <List
          sx={{
            width: '75%',
            m: '0 auto',
            mt: '25px',
            backgroundColor: 'transparent',
            position: 'relative',
            '& ul': { padding: 0 },
          }}
          subheader={<li />}>
          {favoriteEvents.map((item) => (
            <Sport key={nanoid()} {...item} add={false} />
          ))}
        </List>
      );
    }

    return (
      <FavoriteEmpty
        text={t('description.emptyEvents')}
        icon={<EmojiEventsIcon sx={{ fontSize: '120px', color: '#ffef62' }} />}
      />
    );
  };

  return (
    <Box>
      <SettingsHeader
        text={t('description.myEvents')}
        element={<EmojiEventsIcon style={{ color: 'var(--primary)' }} />}
      />
      {createContent()}
    </Box>
  );
};

export default EventsPage;
