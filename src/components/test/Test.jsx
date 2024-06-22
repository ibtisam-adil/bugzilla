import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { logout } from '../../redux/auth/AuthSlice';
import Sidebar from '../Layout/Layout';

const Test = () => {
  // const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   console.log('hi');
  //   dispatch(logout());
  // };

  useEffect(() => {
    if (!isLogin) {
      navigate('/signin');
    }
  }, [isLogin, navigate]);
  return (
    <>
      <Sidebar />
    </>
  );
};

export default Test;
