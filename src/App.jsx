import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MedicalForm from "./components/MedicalForm";
import BMICalculator from "./components/BMICalculator";
import Chatbot from "./components/Chatbot";
import EmergencyContacts from "./components/EmergencyContacts";
import DisPred from "./components/Disspredd";
import LandingPage from "./components/LandingPage";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/medical-form"
              element={
                <PrivateRoute>
                  <MedicalForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/bmi-calculator"
              element={
                <PrivateRoute>
                  <BMICalculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/emergency-contacts"
              element={
                <PrivateRoute>
                  <EmergencyContacts />
                </PrivateRoute>
              }
            />
            <Route
              path="/disease-predictor"
              element={
                <PrivateRoute>
                  <DisPred />
                </PrivateRoute>
              }
            />
          </Routes>
          <Chatbot />
        </div>
      </Router>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default App;
