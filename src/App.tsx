
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './hooks/use-auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/seed-guide" element={<SeedGuide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/iot-monitoring" element={<IoTMonitoring />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
