import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrescriptionList from './pages/PrescriptionList';
import PrescriptionForm from './pages/PrescriptionForm';
import Reports from './pages/Reports';
import DrugInteraction from './pages/DrugInteraction';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <PrivateRoute>
                <PrescriptionList />
              </PrivateRoute>
            }
          />
          <Route
            path="/prescription/new"
            element={
              <PrivateRoute>
                <PrescriptionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/prescription/edit/:id"
            element={
              <PrivateRoute>
                <PrescriptionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/drug-interaction"
            element={
              <PrivateRoute>
                <DrugInteraction />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

