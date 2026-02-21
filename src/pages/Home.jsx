import React, { useState } from 'react';
import { User, Plus, X, Wand2, FlaskConical } from 'lucide-react';
import SimulationCard from '../components/SimulationCard';
import translations from '../utils/translations';

/**
 * Custom SVG icons for each simulation, matching the African color descriptions.
 */
const PendulumIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <line x1="32" y1="8" x2="20" y2="40" stroke="#5D3A1A" strokeWidth="2.5" />
    <line x1="32" y1="8" x2="44" y2="40" stroke="#5D3A1A" strokeWidth="2.5" />
    <circle cx="20" cy="42" r="7" fill="#D4792C" stroke="#5D3A1A" strokeWidth="1.5" />
    <circle cx="44" cy="42" r="7" fill="#E8C547" stroke="#5D3A1A" strokeWidth="1.5" />
    <circle cx="32" cy="8" r="3" fill="#5D3A1A" />
    <path d="M14 48 Q32 56 50 48" stroke="#D4792C" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.5" />
  </svg>
);

const InclinedPlaneIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <polygon points="8,52 56,52 56,20" fill="#F2D974" stroke="#5D3A1A" strokeWidth="2" />
    <rect x="34" y="28" width="12" height="10" rx="2" fill="#D4792C" stroke="#5D3A1A" strokeWidth="1.5"
          transform="rotate(-30 40 33)" />
    <line x1="42" y1="38" x2="50" y2="46" stroke="#C2703E" strokeWidth="2.5" />
    <polygon points="50,46 46,43 48,48" fill="#C2703E" />
  </svg>
);

const CircuitIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <rect x="6" y="24" width="12" height="20" rx="2" fill="#6B9E3C" stroke="#2D4A1A" strokeWidth="1.5" />
    <line x1="9" y1="28" x2="15" y2="28" stroke="white" strokeWidth="2" />
    <line x1="12" y1="25" x2="12" y2="31" stroke="white" strokeWidth="2" />
    <path d="M18 30 H30 V16 H50 V30" stroke="#1B4F72" strokeWidth="2" />
    <path d="M18 38 H30 V52 H50 V38" stroke="#1B4F72" strokeWidth="2" />
    <circle cx="50" cy="34" r="8" fill="#F2D974" stroke="#D4792C" strokeWidth="1.5" />
    <path d="M46 34 L50 30 L54 34" stroke="#D4792C" strokeWidth="1.5" />
    <circle cx="50" cy="34" r="11" fill="none" stroke="#E8C547" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const RefractionIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <polygon points="32,10 12,54 52,54" fill="#1A3A5C" stroke="#0F2540" strokeWidth="1.5" />
    <line x1="2" y1="28" x2="24" y2="36" stroke="#E8C547" strokeWidth="2.5" />
    <line x1="40" y1="32" x2="60" y2="24" stroke="#CE1126" strokeWidth="2" />
    <line x1="40" y1="35" x2="62" y2="32" stroke="#D4792C" strokeWidth="2" />
    <line x1="40" y1="38" x2="62" y2="38" stroke="#E8C547" strokeWidth="2" />
    <line x1="40" y1="41" x2="62" y2="44" stroke="#6B9E3C" strokeWidth="2" />
    <line x1="40" y1="44" x2="60" y2="52" stroke="#1B4F72" strokeWidth="2" />
  </svg>
);

const LeverIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <rect x="6" y="28" width="52" height="5" rx="2" fill="#C9A84C" stroke="#5D3A1A" strokeWidth="1.5" />
    <polygon points="32,33 26,48 38,48" fill="#D4792C" stroke="#5D3A1A" strokeWidth="1.5" />
    <rect x="10" y="18" width="10" height="10" rx="2" fill="#8B5E3C" stroke="#5D3A1A" strokeWidth="1.5" />
    <circle cx="50" cy="22" r="6" fill="#E8C547" stroke="#5D3A1A" strokeWidth="1.5" />
    <path d="M10 14 L15 10" stroke="#5D3A1A" strokeWidth="1" />
    <path d="M50 12 L50 16" stroke="#5D3A1A" strokeWidth="1" />
  </svg>
);

/** Default icon for AI-generated simulations */
const GeneratedIcon = () => (
  <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
    <circle cx="32" cy="32" r="20" fill="#FDEBD0" stroke="#C2703E" strokeWidth="2" />
    <path d="M22 32 Q32 18 42 32 Q32 46 22 32Z" fill="#C2703E" opacity="0.7" />
    <circle cx="32" cy="32" r="5" fill="#E8C547" stroke="#A85A2A" strokeWidth="1.5" />
    <line x1="32" y1="10" x2="32" y2="6" stroke="#C2703E" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="58" x2="32" y2="54" stroke="#C2703E" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="32" x2="6" y2="32" stroke="#C2703E" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="32" x2="54" y2="32" stroke="#C2703E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Simulation definitions with African warm palette. */
const defaultSimulations = [
  {
    id: 'pendulum',
    icon: <PendulumIcon />,
    title: translations.simulations.pendulum.title,
    description: translations.simulations.pendulum.description,
    color: '#D4792C',
    bgGradient: 'linear-gradient(135deg, #FDEBD0 0%, #F5CBA7 100%)',
  },
  {
    id: 'inclined-plane',
    icon: <InclinedPlaneIcon />,
    title: translations.simulations.inclinedPlane.title,
    description: translations.simulations.inclinedPlane.description,
    color: '#C2703E',
    bgGradient: 'linear-gradient(135deg, #FEF9E7 0%, #F9E79F 100%)',
  },
  {
    id: 'circuit',
    icon: <CircuitIcon />,
    title: translations.simulations.circuit.title,
    description: translations.simulations.circuit.description,
    color: '#6B9E3C',
    bgGradient: 'linear-gradient(135deg, #EAFAF1 0%, #A9DFBF 100%)',
  },
  {
    id: 'optics',
    icon: <RefractionIcon />,
    title: translations.simulations.optics.title,
    description: translations.simulations.optics.description,
    color: '#1A3A5C',
    bgGradient: 'linear-gradient(135deg, #D6EAF8 0%, #85C1E9 100%)',
  },
  {
    id: 'lever',
    icon: <LeverIcon />,
    title: translations.simulations.lever.title,
    description: translations.simulations.lever.description,
    color: '#8B5E3C',
    bgGradient: 'linear-gradient(135deg, #FDEBD0 0%, #E8C547 100%)',
  },
];

/**
 * Modal for creating a new simulation via AI prompt.
 * Currently creates a card from form data (API integration pending).
 */
const GenerateModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !prompt.trim()) return;

    setLoading(true);

    // Simulate a brief loading state before creating the card.
    // TODO: Replace this timeout with a real Claude API call that generates
    // the simulation code, then registers it and navigates to it.
    setTimeout(() => {
      onCreate({ title: title.trim(), description: prompt.trim() });
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(44, 24, 16, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-5"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-primary-bg)' }}>
              <Wand2 size={18} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h2 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                Nouvelle simulation
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Décris ce que tu veux simuler
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-raised)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>
              Titre de la simulation *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Chute libre, Loi de Boyle…"
              required
              maxLength={60}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>

          {/* Prompt / description */}
          <div>
            <label className="block text-sm font-semibold mb-1.5"
              style={{ color: 'var(--color-text-secondary)' }}>
              Description pédagogique *
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décris le concept physique à simuler, les variables importantes, le contexte pour les élèves…"
              required
              rows={4}
              maxLength={500}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
            <p className="text-right text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {prompt.length}/500
            </p>
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent-light)' }}>
            <FlaskConical size={14} style={{ color: 'var(--color-accent-dark)', flexShrink: 0, marginTop: 1 }} />
            <span style={{ color: 'var(--color-earth-brown)' }}>
              La simulation sera générée par IA et apparaîtra dans ta liste. La génération se fait en arrière-plan.
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim() || !prompt.trim()}
              className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: loading || !title.trim() || !prompt.trim()
                  ? 'var(--color-border)'
                  : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                color: loading || !title.trim() || !prompt.trim()
                  ? 'var(--color-text-muted)'
                  : '#fff',
                cursor: loading || !title.trim() || !prompt.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Création…
                </>
              ) : (
                <><Wand2 size={16} /> Créer</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Home page — warm African-themed simulation launcher.
 * Mobile-first 2-column grid, designed for low-end Android phones.
 */
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [simulations, setSimulations] = useState(defaultSimulations);

  const handleCreate = ({ title, description }) => {
    const newSim = {
      id: `generated-${Date.now()}`,
      icon: <GeneratedIcon />,
      title,
      description,
      color: '#C2703E',
      bgGradient: 'linear-gradient(135deg, #FDEBD0 0%, #F5CBA7 100%)',
      isGenerated: true,
    };
    setSimulations((prev) => [...prev, newSim]);
  };

  return (
    <div className="min-h-[calc(100dvh-52px)] pb-24 app-shell"
         style={{ background: 'linear-gradient(160deg, #FDF2E4 0%, #F0E8D8 40%, #E8EFD5 100%)' }}>

      {/* Greeting banner */}
      <div className="px-4 pt-5 pb-4"
           style={{ background: 'linear-gradient(135deg, #C2703E 0%, #A85A2A 60%, #7A8B3C 100%)' }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-white">
            <User size={22} />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{translations.greeting}</p>
            <p className="text-xs text-white/80">{translations.app.tagline}</p>
          </div>
        </div>
      </div>

      {/* Simulation cards grid */}
      <div className="px-3 py-4 sm:px-4 sm:py-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 px-1"
            style={{ color: '#8B7355' }}>
          {translations.nav.simulations}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {simulations.map((sim) => (
            <SimulationCard key={sim.id} {...sim} />
          ))}
        </div>
      </div>

      {/* Floating action button — opens modal */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-30 text-white"
        style={{ background: 'linear-gradient(135deg, #C2703E, #D4792C)' }}
        aria-label="Générer une simulation"
      >
        <Plus size={28} />
      </button>

      {/* Generate modal */}
      {showModal && (
        <GenerateModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default Home;
