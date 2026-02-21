import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import SimulationDetail from './pages/SimulationDetail';
import { isOnline, onConnectivityChange } from './utils/offline';
import translations from './utils/translations';
import './styles/index.css';

/** Catch rendering errors in the main app shell. */
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
          <h1 style={{ color: '#CE1126' }}>Erreur</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
            {this.state.error.message}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#1B4F72', color: 'white', border: 'none', borderRadius: '0.5rem' }}
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Inner layout — needs to be inside BrowserRouter to use useLocation */
function AppLayout({ online }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <Navigation open={menuOpen} onClose={() => setMenuOpen(false)} />

      {!online && (
        <div
          className="text-center text-xs py-1.5 px-4 font-medium"
          style={{ background: '#F2D974', color: '#5D3A1A' }}
        >
          {translations.status.offline}
        </div>
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
        </Routes>
      </main>

      {isHome && <Footer />}
    </div>
  );
}

/**
 * Root application component with splash screen, routing, and offline banner.
 */
function App() {
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
    <AppErrorBoundary>
      <BrowserRouter>
        <AppLayout online={online} />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
