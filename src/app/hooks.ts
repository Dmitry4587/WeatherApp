import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { logInFormSchema, fullFormSchema } from '../utils';
import { FormTypes } from '../components/AuthForm';
import type { RootState, AppDispatch } from './store';
import { editUser, setUser, userLogIn } from './slices/user/asycnActions';
import { selectUserInfo } from './slices/user/selectors';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useForm = (form: FormTypes) => {
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const editFormValues = {
    name: userInfo?.name || '',
    surname: userInfo?.surname || '',
    email: userInfo?.email || '',
    password: userInfo?.password || '',
    phone: userInfo?.phone || '',
    code: '',
  };

  const initFormValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    code: '',
  };

  const logInForm = useFormik({
    initialValues: initFormValues,
    validationSchema: logInFormSchema,
    onSubmit: ({ email, password }) => {
      dispatch(userLogIn({ email, password }));
    },
  });

  const editForm = useFormik({
    initialValues: editFormValues,
    validationSchema: fullFormSchema,
    onSubmit: ({ name, surname, email, password, phone }) => {
      dispatch(editUser({ name, surname, email, password, phone, id: userInfo?.id || nanoid() }));
    },
  });

  const registrForm = useFormik({
    initialValues: initFormValues,
    validationSchema: fullFormSchema,
    onSubmit: ({ name, surname, email, password, phone }) => {
      dispatch(setUser({ name, surname, email, password, phone, id: userInfo?.id || nanoid() }));
    },
  });

  switch (form) {
    case FormTypes.LOGIN:
      return logInForm;
    case FormTypes.EDIT:
      return editForm;
    case FormTypes.REG:
      return registrForm;
    default:
      return registrForm;
  }
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
