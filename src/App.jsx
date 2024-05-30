import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signPage/SignIn';
import SignUp from './components/signPage/SignUp';

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
    <SignUp />
  </div>
);

export default App;
