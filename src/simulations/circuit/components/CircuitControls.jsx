import React from 'react';
import { Play, Pause, RotateCcw, Battery, Zap, GitBranch } from 'lucide-react';

const CircuitControls = ({
  voltage, onVoltageChange,
  resistance, onResistanceChange,
  current,
  circuitType, onCircuitTypeChange,
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
        {/* Voltage */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <Battery size={16} style={{ color: 'var(--color-secondary)' }} /> Tension (V)
          </label>
          <input
            type="range"
            min="1"
            max="24"
            value={voltage}
            onChange={(e) => onVoltageChange(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--color-secondary)' }}
          />
          <div className="text-right text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>
            {voltage} V
          </div>
        </div>

        {/* Resistance */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <Zap size={16} style={{ color: 'var(--color-accent-dark)' }} /> Résistance (Ω)
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={resistance}
            onChange={(e) => onResistanceChange(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--color-accent-dark)' }}
          />
          <div className="text-right text-lg font-bold" style={{ color: 'var(--color-accent-dark)' }}>
            {resistance} Ω
          </div>
        </div>

        {/* Circuit type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <GitBranch size={16} style={{ color: 'var(--color-primary)' }} /> Type de circuit
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onCircuitTypeChange('series')}
              className="flex-1 py-2 rounded-lg font-bold transition-all"
              style={{
                background: circuitType === 'series' ? 'var(--btn-primary-bg)' : 'var(--color-surface-raised)',
                color: circuitType === 'series' ? 'var(--btn-primary-text)' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              Série
            </button>
            <button
              onClick={() => onCircuitTypeChange('parallel')}
              className="flex-1 py-2 rounded-lg font-bold transition-all"
              style={{
                background: circuitType === 'parallel' ? 'var(--btn-primary-bg)' : 'var(--color-surface-raised)',
                color: circuitType === 'parallel' ? 'var(--btn-primary-text)' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              Parallèle
            </button>
          </div>
        </div>

        {/* Current display */}
        <div className="p-4 rounded-xl text-center"
          style={{ background: 'var(--color-primary-bg)', border: '1px solid var(--color-border-soft)' }}>
          <p className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--color-primary)' }}>
            Courant (I = V/R)
          </p>
          <p className="text-3xl font-black" style={{ color: 'var(--color-earth-brown)' }}>
            {current.toFixed(2)} A
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

export default CircuitControls;
