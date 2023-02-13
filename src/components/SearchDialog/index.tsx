import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Divider,
  IconButton,
  Box,
  Typography,
  FormControl,
  InputAdornment,
  Input,
  DialogContent,
  Dialog,
  CircularProgress,
} from '@mui/material';
import { useQueryParam, StringParam } from 'use-query-params';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, useDebounce } from '../../app/hooks';
import { getAutoComplete } from '../../app/slices/city/asyncActions';
import { itemStatus } from '../../app/slices/user/slice';
import { setAutocompleteStatus } from '../../app/slices/city/slice';
import { selectAutocomplete, selectAutocompleteStatus, selectSearchError } from '../../app/slices/city/selectors';
import styles from './SearchDialog.module.css';

interface SearchDialogProps {
  toggleDialog: boolean;
  handleClickDialog: () => void;
}

const SearchDialog = ({ toggleDialog, handleClickDialog }: SearchDialogProps) => {
  const { t } = useTranslation();
  const autocomplete = useAppSelector(selectAutocomplete);
  const autocompleteStatus = useAppSelector(selectAutocompleteStatus);
  const searchError = useAppSelector(selectSearchError);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useQueryParam('q', StringParam);
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedSearchTerm = useDebounce<string>(searchValue, 700);

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 30) {
        dispatch(setAutocompleteStatus(itemStatus.INIT));
        setSearch(e.target.value);
        setSearchValue(e.target.value);
      }
    },
    [dispatch, setSearch],
  );

  React.useEffect(() => {
    if (search) {
      setSearchValue(search.substring(0, 30));
      handleClickDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseDialog = React.useCallback(() => {
    setSearchValue('');
    setSearch(undefined);
    handleClickDialog();
  }, [handleClickDialog, setSearch]);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getAutoComplete(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  const createList = () => {
    if (searchValue.length < 3) {
      return <Typography className={styles.SearchDialogInit}>{t('description.searchInit')}</Typography>;
    }
    if (autocompleteStatus === itemStatus.LOADING && searchValue.length >= 3) {
      return (
        <Box className={styles.SearchDialogMessage}>
          <CircularProgress />
        </Box>
      );
    }

    if (autocompleteStatus === itemStatus.CONFIRM && autocomplete.length && searchValue.length >= 3) {
      return (
        <Box sx={{ mt: '15px' }}>
          {autocomplete.map((item) => {
            return (
              <Box key={item.id} sx={{ mb: '10px' }}>
                <Box onClick={onCloseDialog} sx={{ mb: '7px' }}>
                  <NavLink to={item.name}>
                    <Typography className={styles.SearchDialogCity}>{item.name}</Typography>
                    <Typography className={styles.SearchDialogCountry}>{item.country}</Typography>
                  </NavLink>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
      );
    }
    if (autocompleteStatus === itemStatus.CONFIRM && !autocomplete.length && searchValue.length >= 3) {
      return (
        <Box className={styles.SearchDialogMessage}>
          <Box className={styles.SearchDialogMessageContent}>
            <SearchOffIcon color='disabled' sx={{ fontSize: '80px' }} />
            <Box>
              <Typography className={styles.SearchDialogTextMessage}>{t('description.noRes')}</Typography>
              <Typography className={styles.SearchDialogTextMessage}>{searchValue}</Typography>
            </Box>
          </Box>
        </Box>
      );
    }
    if (autocompleteStatus === itemStatus.ERROR) {
      return (
        <Box className={styles.SearchDialogMessage}>
          <Box className={styles.SearchDialogMessageContent}>
            <ErrorIcon color='disabled' sx={{ fontSize: '80px' }} />
            <Typography className={styles.SearchDialogTextMessage}>{searchError}</Typography>
          </Box>
        </Box>
      );
    }
  };

  return (
    <div>
      <Dialog open={toggleDialog} onClose={onCloseDialog}>
        <DialogContent className={styles.SearchDialogContent}>
          <IconButton onClick={onCloseDialog} className={styles.SearchDialogBtn}>
            <CloseIcon />
          </IconButton>
          <FormControl variant='standard' sx={{ width: '100%', mt: '15px' }}>
            <Input
              value={searchValue}
              sx={{ fontSize: '30px' }}
              onChange={onSearchChange}
              id='input-with-icon-adornment'
              placeholder={`${t('description.search')}`}
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon className={styles.SearchDialogIcon} />
                </InputAdornment>
              }
            />
          </FormControl>
          {createList()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
