import React from 'react';
import { Play, Pause, RotateCcw, Weight, Move, GitBranch } from 'lucide-react';

const LeverControls = ({
  massLeft, onMassLeftChange,
  massRight, onMassRightChange,
  distanceLeft, onDistanceLeftChange,
  distanceRight, onDistanceRightChange,
  leverType, onLeverTypeChange,
  momentLeft,
  momentRight,
  equilibrium,
  isRunning, onToggleRunning,
  onReset
}) => {
  return (
    <div className="rounded-[2rem] shadow-xl p-6 space-y-6"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

      {/* Start / Pause */}
      <button
        onClick={onToggleRunning}
        className="w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
        style={{
          background: isRunning ? 'var(--btn-pause-bg)' : 'var(--btn-success-bg)',
          color: isRunning ? 'var(--btn-pause-text)' : 'var(--btn-success-text)',
          border: isRunning ? '1.5px solid var(--btn-pause-border)' : 'none',
        }}
      >
        {isRunning ? <><Pause size={24} /> PAUSE</> : <><Play size={24} /> DÉMARRER</>}
      </button>

      <div className="space-y-4">
        {/* Lever type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <GitBranch size={16} style={{ color: 'var(--color-primary)' }} /> Type de levier
          </label>
          <select
            value={leverType}
            onChange={(e) => onLeverTypeChange(e.target.value)}
            className="w-full p-2 rounded-lg"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <option value="inter-appui">Balançoire (inter-appui)</option>
            <option value="inter-resistant">Brouette (inter-résistant)</option>
            <option value="inter-moteur">Pince (inter-moteur)</option>
          </select>
        </div>

        {/* Masses */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 text-sm font-bold mb-2"
              style={{ color: 'var(--color-text-secondary)' }}>
              <Weight size={14} style={{ color: 'var(--color-primary)' }} /> Masse G (kg)
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={massLeft}
              onChange={(e) => onMassLeftChange(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <div className="text-right text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              {massLeft} kg
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-bold mb-2"
              style={{ color: 'var(--color-text-secondary)' }}>
              <Weight size={14} style={{ color: 'var(--color-secondary)' }} /> Masse D (kg)
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={massRight}
              onChange={(e) => onMassRightChange(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-secondary)' }}
            />
            <div className="text-right text-sm font-bold" style={{ color: 'var(--color-secondary)' }}>
              {massRight} kg
            </div>
          </div>
        </div>

        {/* Distances */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 text-sm font-bold mb-2"
              style={{ color: 'var(--color-text-secondary)' }}>
              <Move size={14} style={{ color: 'var(--color-primary)' }} /> Distance G (m)
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={distanceLeft}
              onChange={(e) => onDistanceLeftChange(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <div className="text-right text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              {distanceLeft} m
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-bold mb-2"
              style={{ color: 'var(--color-text-secondary)' }}>
              <Move size={14} style={{ color: 'var(--color-secondary)' }} /> Distance D (m)
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={distanceRight}
              onChange={(e) => onDistanceRightChange(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-secondary)' }}
            />
            <div className="text-right text-sm font-bold" style={{ color: 'var(--color-secondary)' }}>
              {distanceRight} m
            </div>
          </div>
        </div>

        {/* Moments results */}
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-soft)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Moment gauche:</span>
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
              {momentLeft.toFixed(1)} Nm
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Moment droit:</span>
            <span className="font-bold" style={{ color: 'var(--color-secondary)' }}>
              {momentRight.toFixed(1)} Nm
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)', marginTop: '0.5rem', paddingTop: '0.5rem' }} />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>État:</span>
            <span className="font-bold"
              style={{ color: equilibrium ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {equilibrium ? '⚖️ Équilibre' : '⚠️ Déséquilibre'}
            </span>
          </div>
        </div>

        {/* Formula */}
        <div className="p-3 rounded-xl text-center"
          style={{ background: 'var(--color-primary-bg)', border: '1px solid var(--color-border-soft)' }}>
          <p className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--color-primary)' }}>
            Loi des leviers
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-earth-brown)' }}>
            m₁ × d₁ = m₂ × d₂
          </p>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-2 font-bold flex items-center justify-center gap-2 transition-colors rounded-xl"
        style={{ color: 'var(--btn-ghost-text)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--btn-ghost-bg-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <RotateCcw size={18} /> RÉINITIALISER
      </button>
    </div>
  );
};

export default LeverControls;
