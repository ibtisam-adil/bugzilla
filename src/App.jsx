import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux/auth/AuthSlice';
import SignIn from './components/signPage/SignIn';
import SignUp from './components/signPage/SignUp';
import Test from './components/test/Test';

const App = () => {
  const { isLogin } = useSelector(selectAuth);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isLogin ? <Test /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={isLogin ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={isLogin ? <Navigate to="/" /> : <SignUp />} />
          <Route path="*" element={<Navigate to={isLogin ? '/' : '/signin'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
