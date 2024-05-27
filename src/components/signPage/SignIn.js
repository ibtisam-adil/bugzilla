import React from 'react';
import AuthForm from '../authForm/AuthForm';

const SignIn = () => {
  const signInInputFields = [
    {
      type: 'email', name: 'email', placeholder: 'E-mail', iconClass: 'bx bx-envelope input-icon',
    },
    {
      type: 'password', name: 'password', placeholder: 'Password', iconClass: 'bx bx-lock-alt input-icon',
    },
  ];

  return (
    <AuthForm
      title="Hello!"
      buttonText="SIGN IN"
      message="Don't have an account? Create"
      inputFields={signInInputFields}
      welcomeMsg="Welcome Back!"
      welcomeDetail="Welcome back! We&apos;re delighted to see you return.
      Your presence means a lot to us!"
    />
  );
};

export default SignIn;
