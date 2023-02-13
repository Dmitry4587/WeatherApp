import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useQueryParam, StringParam } from 'use-query-params';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useForm } from '../../app/hooks';
import { setFormsInitStatus, itemStatus } from '../../app/slices/user/slice';
import styles from './AuthForm.module.css';

export enum FormTypes {
  LOGIN = 'LogIn',
  REG = 'Registration',
  EDIT = 'Edit',
  CODE = 'Code',
}

interface AuthFormProps {
  text: FormTypes;
  formStatus: itemStatus;
}

const AuthForm = ({ text, formStatus }: AuthFormProps) => {
  const { t } = useTranslation();
  const formik = useForm(text);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useQueryParam('email', StringParam);
  const [password, setPassword] = useQueryParam('password', StringParam);
  const [name, setName] = useQueryParam('name', StringParam);
  const [surname, setSurname] = useQueryParam('surname', StringParam);
  const [phone, setPhone] = useQueryParam('phone', StringParam);
  const [code, setCode] = useQueryParam('code', StringParam);

  React.useEffect(() => {
    if (window.location.search) {
      formik.setFieldValue('email', email);
      formik.setFieldValue('password', password);
      formik.setFieldValue('name', name);
      formik.setFieldValue('surname', surname);
      formik.setFieldValue('phone', phone);
      formik.setFieldValue('code', code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (text === FormTypes.EDIT) {
      setEmail(formik.values.email);
      setPassword(formik.values.password);
      setName(formik.values.name);
      setSurname(formik.values.surname);
      setPhone(formik.values.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(setFormsInitStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formStatus === itemStatus.CONFIRM && (text === FormTypes.REG || text === FormTypes.LOGIN)) {
      navigate('/');
    }
  }, [dispatch, formStatus, text, navigate]);

  const handleChangeEmail = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      formik.handleChange(e);
    },
    [setEmail, formik],
  );

  const handleChangePassword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      formik.handleChange(e);
    },
    [setPassword, formik],
  );

  const handleChangeName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      formik.handleChange(e);
    },
    [formik, setName],
  );

  const handleChangePhone = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      formik.handleChange(e);
    },
    [formik, setPhone],
  );

  const handleChangeSurname = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSurname(e.target.value);
      formik.handleChange(e);
    },
    [formik, setSurname],
  );

  const handleChangeCode = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
      formik.handleChange(e);
    },
    [formik, setCode],
  );

  return (
    <form className={styles.AuthFormRegistr} onSubmit={formik.handleSubmit}>
      <Typography className={styles.AuthFormTitle}>
        {text === FormTypes.EDIT ? t(`description.editProfile`) : text}
      </Typography>
      {text !== FormTypes.LOGIN && text !== FormTypes.CODE ? (
        <>
          <Box className={styles.AuthFormName}>
            <TextField
              id='name'
              name='name'
              value={formik.values.name}
              onChange={handleChangeName}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
              className={styles.AuthFormInput}
              label={t(`description.name`)}
            />
            <TextField
              id='surname'
              name='surname'
              value={formik.values.surname}
              onChange={handleChangeSurname}
              onBlur={formik.handleBlur}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              className={styles.AuthFormInput}
              required
              label={t(`description.surname`)}
            />
          </Box>
          <TextField
            id='phone'
            name='phone'
            placeholder='+11111111'
            value={formik.values.phone}
            onChange={handleChangePhone}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ mb: '15px' }}
            className={styles.AuthFormInput}
            required
            label={t(`description.phone`)}
          />
        </>
      ) : null}

      {text === FormTypes.CODE ? (
        <TextField
          id='code'
          name='code'
          label='Code'
          value={formik.values.code}
          onBlur={formik.handleBlur}
          onChange={handleChangeCode}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
          sx={{ mb: '15px' }}
          className={styles.AuthFormInput}
          required
        />
      ) : (
        <>
          <TextField
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={handleChangeEmail}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: '15px' }}
            className={styles.AuthFormInput}
            required
          />
          <TextField
            id='password'
            type='password'
            name='password'
            value={formik.values.password}
            onChange={handleChangePassword}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: '15px' }}
            className={styles.AuthFormInput}
            required
            label={t(`description.password`)}
          />
        </>
      )}
      <LoadingButton
        className={styles.AuthFormBtn}
        color={formStatus === itemStatus.ERROR ? 'error' : 'primary'}
        loading={formStatus === itemStatus.LOADING}
        variant='contained'
        type='submit'>
        {t(`description.submit`)}
      </LoadingButton>
    </form>
  );
};

export default AuthForm;
