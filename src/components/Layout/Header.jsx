// src/components/Layout/Header.jsx
import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ menuOpen, onToggleMenu }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8DFD0] px-4 py-2 flex items-center justify-between dark:bg-slate-900/95 dark:border-slate-700 dark:backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <img
          src="/Bongo-logo.png"
          alt="Bongo-Lab logo"
          className="w-9 h-9 object-contain dark:brightness-90"
        />
        <h1
          className="text-lg font-bold tracking-wide"
          style={{ color: '#1B4F72' }}
        >
          Bongo-Lab
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Bouton de changement de thème */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[--color-earth-brown] hover:bg-[--color-off-white] active:bg-[#E8DFD0] transition-colors dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Bouton menu hamburger */}
        <button
          onClick={onToggleMenu}
          className="p-2 rounded-lg text-[--color-earth-brown] hover:bg-[--color-off-white] active:bg-[#E8DFD0] transition-colors dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;