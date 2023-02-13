import * as React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../app/hooks';
import AuthForm, { FormTypes } from '../components/AuthForm';
import SettingsHeader from '../components/SettingsHeader/SettingsHeader';
import SnackBarItem from '../components/SnackBarItem';
import { selectEditError, selectEditFormStatus } from '../app/slices/user/selectors';
import { itemStatus } from '../app/slices/user/slice';

const EditPage = () => {
  const { t } = useTranslation();
  const formStatus = useAppSelector(selectEditFormStatus);
  const formError = useAppSelector(selectEditError);

  return (
    <>
      <Box>
        <SettingsHeader
          text={t('description.editProfile')}
          element={<EditIcon style={{ color: 'var(--primary)' }} />}
        />
        <Box sx={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
          <AuthForm formStatus={formStatus} text={FormTypes.EDIT} />
        </Box>
      </Box>
      {formStatus === itemStatus.ERROR ? <SnackBarItem text={formError} severity='error' /> : null}
      {formStatus === itemStatus.CONFIRM ? (
        <SnackBarItem text={`${t('description.dataUpdated')}`} severity='success' />
      ) : null}
    </>
  );
};

export default EditPage;
