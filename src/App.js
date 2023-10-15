import './App.css';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPageManager from './components/LoginPage/LoginPageManager';
import LoginPageEmployee from './components/LoginPage/LoginPageEmployee';
import RegisterPageManager from './components/RegisterPage/RegisterPageManager';
import RegisterPageEmployee from './components/RegisterPage/RegisterPageEmployee';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';

import AuthProvider from '../src/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-manager" element={<LoginPageManager />} />
          <Route path="/login-employee" element={<LoginPageEmployee />} />
          <Route path="/register-manager" element={<RegisterPageManager />} />
          <Route path="/register-employee" element={<RegisterPageEmployee />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
