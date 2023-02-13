import * as React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import styles from './Navigation.module.css';

const NavigationItem = () => {
  const { t } = useTranslation();
  const { city } = useParams();

  const handleActive = React.useCallback(
    ({ isActive }: { isActive: boolean }) => (isActive ? styles.ActivePage : styles.NavigationLink),
    [],
  );

  return (
    <div className={styles.NavigationWrapper}>
      <NavLink className={handleActive} to={`/${city}`} end>
        <Button>{t('description.forecast')}</Button>
      </NavLink>
      <NavLink className={handleActive} to='history'>
        <Button>{t('description.history')}</Button>
      </NavLink>
      <NavLink className={handleActive} to='events'>
        <Button>{t('description.sportsEvents')}</Button>
      </NavLink>
    </div>
  );
};

export default NavigationItem;
