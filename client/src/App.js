import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}>
          </Route>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/register" element={<RegisterPage />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

