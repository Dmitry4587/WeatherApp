import * as yup from 'yup';
import i18next from 'i18next';

export const logInFormSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

export const fullFormSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  name: yup.string().min(2, 'Name should be of minimum 2 characters length').required('Name is required'),
  surname: yup.string().min(2, 'Surname should be of minimum 2 characters length').required('Surname is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  phone: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,11}[0-9]$/, 'Phone number is not valid')
    .required('Phone number is required'),
});

export const setDangerUv = (amount: number) => {
  if (amount <= 2) {
    return i18next.t('description.low');
  }
  if (amount > 2 && amount < 5) {
    return i18next.t('description.medium');
  }
  if (amount >= 5 && amount <= 7) {
    return i18next.t('description.hight');
  }
  if (amount > 7) {
    return i18next.t('description.veryHight');
  }
};

export const setDangerHum = (amount: number) => {
  if (amount <= 20) {
    return i18next.t('description.low');
  }
  if (amount > 20 && amount <= 50) {
    return i18next.t('description.medium');
  }
  if (amount > 50 && amount <= 80) {
    return i18next.t('description.hight');
  }
  if (amount > 80) {
    return i18next.t('description.veryHight');
  }
};
