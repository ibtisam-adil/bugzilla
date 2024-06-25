import './App.css';
import {
  BrowserRouter as Router, Routes, Route,
  Navigate,
} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser, selectAuth } from './redux/auth/AuthSlice';
import SignIn from './components/signPage/SignIn';
import SignUp from './components/signPage/SignUp';
import Layout from './components/Layout/Layout';
import Test from './components/Projects/Projects';

const App = () => {
  const { isLogin } = useSelector(selectAuth);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin && token) {
      dispatch(currentUser());
    }
  }, [dispatch, isLogin, token]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={isLogin ? <Layout /> : <Navigate to="/signin" />}>
            <Route index element={<Test />} />
          </Route>
          <Route path="/signin" element={isLogin ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={isLogin ? <Navigate to="/" /> : <SignUp />} />
          <Route path="*" element={<Navigate to={isLogin ? '/' : '/signin'} />} />
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
