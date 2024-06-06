import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/AuthSlice';

const Test = () => {
  const dispatch = useDispatch();
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
      <div className="text-8xl">test</div>
      <button type="submit" className="p-8 text-4xl border-4" onClick={() => dispatch(logout())}>logout</button>
    </>
  );
};

export default Test;
