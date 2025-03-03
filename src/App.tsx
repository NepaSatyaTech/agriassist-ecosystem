import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import SeedGuide from '@/pages/SeedGuide';
import ExpenseTracker from '@/pages/ExpenseTracker';
import Weather from '@/pages/Weather';
import IoTMonitoring from '@/pages/IoTMonitoring';
import DiseaseScanner from '@/pages/DiseaseScanner';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/hooks/use-auth';
import LaborManagement from '@/pages/LaborManagement';

const App = () => {
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };
    authenticate();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seed-guide" element={<SeedGuide />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/iot-monitoring" element={<IoTMonitoring />} />
        <Route path="/disease-scanner" element={<DiseaseScanner />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/labor-management" element={<LaborManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
