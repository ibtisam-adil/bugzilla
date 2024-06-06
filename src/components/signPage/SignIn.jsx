import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSchema } from '../../schemas';
import AuthForm from '../authForm/AuthForm';
import { login } from '../../redux/auth/AuthSlice';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const {
    values, handleBlur, handleChange, handleSubmit, setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const signInInputFields = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'E-mail',
      iconClass: 'bx bx-envelope input-icon',
      value: values.email,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      iconClass: 'bx bx-lock-alt input-icon',
      value: values.password,
      onChange: handleChange,
      onBlur: handleBlur,
    },
  ];

  return (
    <AuthForm
      title="Hello!"
      buttonText="SIGN IN"
      message="Don't have an account? Create"
      inputFields={signInInputFields}
      welcomeMsg="Welcome Back!"
      welcomeDetail="Welcome back! We're delighted to see you return. Your presence means a lot to us!"
      formType="signin"
      handleSubmit={handleSubmit}
      setFieldValue={setFieldValue}
    />
  );
};

export default SignIn;
