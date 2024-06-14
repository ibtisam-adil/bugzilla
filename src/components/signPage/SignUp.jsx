import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../authForm/AuthForm';
import { signUpSchema } from '../../schemas';
import { signup } from '../../redux/auth/AuthSlice';

const initialValues = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  user_type: 'developer',
};

const SignUp = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    values, handleBlur, handleChange, handleSubmit, setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      action.resetForm();
      dispatch(signup(values));
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const signUpInputFields = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Username',
      value: values.name,
      onChange: handleChange,
      onBlur: handleBlur,
      iconClass: 'bx bx-user input-icon',
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'E-mail',
      value: values.email,
      onChange: handleChange,
      onBlur: handleBlur,
      iconClass: 'bx bx-envelope input-icon',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value: values.password,
      onChange: handleChange,
      onBlur: handleBlur,
      iconClass: 'bx bx-lock-alt input-icon',
    },
    {
      type: 'password',
      name: 'password_confirmation',
      placeholder: 'Confirm Password',
      value: values.password_confirmation,
      onChange: handleChange,
      onBlur: handleBlur,
      iconClass: 'bx bx-lock-alt input-icon',
    },
  ];

  const handleFormSwitch = () => {
    navigate('/signin');
  };

  return (
    <AuthForm
      title="Hello, friend!"
      buttonText="CREATE ACCOUNT"
      message="Already have an account? Signin"
      inputFields={signUpInputFields}
      showCheckbox
      welcomeMsg="Glad to see you!"
      welcomeDetail="Congratulations on taking the first step! Get ready for a thrilling journey filled with new experiences and opportunities."
      formType="signup"
      userType={values.user_type}
      handleSubmit={handleSubmit}
      setFieldValue={setFieldValue}
      handleFormSwitch={handleFormSwitch}
    />
  );
};

export default SignUp;
