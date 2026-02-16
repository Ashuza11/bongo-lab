// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import SimulationDetail from './pages/SimulationDetail';
import { isOnline, onConnectivityChange } from './utils/offline';
import translations from './utils/translations';
import './styles/index.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [online, setOnline] = useState(isOnline());
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    return onConnectivityChange(setOnline);
  }, []);

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* Container avec min-h-screen pour prendre toute la hauteur */}
        <div className="relative flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />
          <Navigation open={menuOpen} onClose={() => setMenuOpen(false)} />

          {/* Bannière hors-ligne */}
          {!online && (
            <div
              className="text-center text-xs py-1.5 px-4 font-medium dark:bg-amber-800/50 dark:text-amber-200"
              style={{ background: '#F2D974', color: '#5D3A1A' }}
            >
              {translations.status.offline}
            </div>
          )}

          {/* main avec flex-1 pour pousser le footer vers le bas */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulation" element={<Navigate to="/" replace />} />
              <Route path="/simulations/:id" element={<SimulationDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;