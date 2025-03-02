
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import SeedGuide from './pages/SeedGuide';
import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import ExpenseTracker from './pages/ExpenseTracker';
import IoTMonitoring from './pages/IoTMonitoring';
import Weather from './pages/Weather';
import DiseaseScanner from './pages/DiseaseScanner';
import { AuthProvider } from './hooks/use-auth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ element }: { element: JSX.Element, requiredRole?: string }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    return element;
  }
  
  return <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    const initialized = localStorage.getItem('appInitialized');
    
    if (!initialized) {
      localStorage.setItem('appInitialized', 'true');
      console.log('App initialized with demo data');
    }
  }, []);
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/seed-guide" element={<SeedGuide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/expense-tracker" element={
            <ProtectedRoute element={<ExpenseTracker />} />
          } />
          <Route path="/iot-monitoring" element={
            <ProtectedRoute element={<IoTMonitoring />} />
          } />
          <Route path="/weather" element={<Weather />} />
          <Route path="/disease-scanner" element={<DiseaseScanner />} />
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center p-8">
                <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
                <p className="mb-4">You don't have permission to access this page.</p>
                <p>Please contact an administrator if you need access.</p>
              </div>
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
