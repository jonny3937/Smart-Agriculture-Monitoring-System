import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
