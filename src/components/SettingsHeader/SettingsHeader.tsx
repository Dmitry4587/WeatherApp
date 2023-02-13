import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './SettingsHeader.module.css';

interface SettingsHeaderProps {
  text: string;
  element: React.ReactNode;
}

const SettingsHeader = ({ text, element }: SettingsHeaderProps) => {
  const navigate = useNavigate();

  const onClickBack = React.useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Box className={styles.SettingsHeaderWrapper}>
        <IconButton onClick={onClickBack}>
          <ArrowBackIosIcon className={styles.SettingsHeaderIcon} />
        </IconButton>
        <Typography className={styles.SettingsHeaderText}>{text}</Typography>
        {element}
      </Box>
      <Divider className={styles.SettingsHeaderDivider} />
    </>
  );
};

export default SettingsHeader;
