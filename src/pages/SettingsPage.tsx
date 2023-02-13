import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsHeader from '../components/SettingsHeader/SettingsHeader';
import Settings from '../components/Settings';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <SettingsHeader text={t('description.settings')} element={<SettingsIcon style={{ color: 'var(--primary)' }} />} />
      <Settings />
    </Box>
  );
};

export default SettingsPage;
