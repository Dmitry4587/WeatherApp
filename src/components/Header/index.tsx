import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, Typography, Toolbar, Box, AppBar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SearchDialog from '../SearchDialog';
import { userLogOut } from '../../app/slices/user/slice';
import { useAppDispatch } from '../../app/hooks';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './Header.module.css';

const MenuAppBar = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [toggleDialog, setToggleDialog] = React.useState(false);
  const { handleSetTheme } = React.useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const handleMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const LogOut = React.useCallback(() => {
    setAnchorEl(null);
    i18n.changeLanguage('en');
    handleSetTheme('dark');
    dispatch(userLogOut());
  }, [dispatch, i18n, handleSetTheme]);

  const handleClickDialog = React.useCallback(() => {
    setToggleDialog(!toggleDialog);
  }, [toggleDialog]);

  return (
    <Box sx={{ height: '70px' }}>
      <AppBar position='static' className={styles.HeaderAppBar}>
        <Toolbar className={styles.HeaderToolBar}>
          <NavLink to='/'>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffff' }}>
              <ThermostatIcon />
              <Typography className={styles.HeaderTitle} variant='h5' component='div'>
                {t('description.headerText')}
              </Typography>
            </Box>
          </NavLink>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box className={styles.HeaderButton}>
                <Button onClick={handleClickDialog} variant='contained' startIcon={<SearchIcon />}>
                  {t('description.search')}
                </Button>
              </Box>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'>
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
          <Menu
            className={styles.HeaderMenu}
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <NavLink to='edit'>
              <MenuItem className={styles.HeaderMenuText} onClick={handleClose}>
                {t('description.profile')}
              </MenuItem>
            </NavLink>
            <NavLink to='settings'>
              <MenuItem className={styles.HeaderMenuText} onClick={handleClose}>
                {t('description.settings')}
              </MenuItem>
            </NavLink>
            <NavLink to='events'>
              <MenuItem className={styles.HeaderMenuText} onClick={handleClose}>
                {t('description.myEvents')}
              </MenuItem>
            </NavLink>
            <MenuItem className={styles.HeaderMenuText} onClick={LogOut}>
              {t('description.logOut')}
            </MenuItem>
          </Menu>
        </Toolbar>
        <SearchDialog toggleDialog={toggleDialog} handleClickDialog={handleClickDialog} />
      </AppBar>
      <SearchDialog toggleDialog={toggleDialog} handleClickDialog={handleClickDialog} />
    </Box>
  );
};

export default MenuAppBar;
