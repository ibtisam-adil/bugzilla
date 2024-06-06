import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  password_confirmation: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});
