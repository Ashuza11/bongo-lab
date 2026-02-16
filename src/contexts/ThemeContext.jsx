// src/contexts/ThemeContext.jsx
import React from 'react'; // ← IMPORTANT: import explicite

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  // Utilise React.useState au lieu de useState directement
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    console.log('🎨 ThemeProvider initialisé');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  const value = React.useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};