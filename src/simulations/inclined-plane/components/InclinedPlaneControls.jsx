import React from 'react';
import { Play, Pause, RotateCcw, Gauge, Wind } from 'lucide-react';

const InclinedPlaneControls = ({
  angle, onAngleChange,
  friction, onFrictionChange,
  mass, onMassChange,
  isRunning, onToggleRunning,
  onReset,
  canSlide
}) => {

  const handleEdit = (setter, val) => {
    if (isRunning) onToggleRunning();
    setter(val);
  };

  return (
    <div className="rounded-[2.5rem] shadow-xl p-6 space-y-8"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

      {/* Start / Pause */}
      <button
        onClick={onToggleRunning}
        className="w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
        style={{
          background: isRunning ? 'var(--btn-pause-bg)' : 'var(--btn-success-bg)',
          color: isRunning ? 'var(--btn-pause-text)' : 'var(--btn-success-text)',
          border: isRunning ? '1.5px solid var(--btn-pause-border)' : 'none',
        }}
      >
        {isRunning ? <><Pause size={28} /> PAUSE</> : <><Play size={28} /> DÉMARRER</>}
      </button>

      <div className="space-y-6">
        {/* Angle */}
        <div className="space-y-4">
          <div className="flex justify-between font-bold uppercase text-xs tracking-widest"
            style={{ color: 'var(--color-text-secondary)' }}>
            <span className="flex items-center gap-2">
              <Gauge size={16} style={{ color: 'var(--color-primary)' }} /> Inclinaison
            </span>
            <span className="text-lg" style={{ color: 'var(--color-primary)' }}>{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => handleEdit(onAngleChange, Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: 'var(--slider-primary)' }}
          />
          <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>360°</span>
          </div>
        </div>

        {/* Friction */}
        <div className="space-y-4">
          <div className="flex justify-between font-bold uppercase text-xs tracking-widest"
            style={{ color: 'var(--color-text-secondary)' }}>
            <span className="flex items-center gap-2">
              <Wind size={16} style={{ color: 'var(--color-accent-dark)' }} /> Friction
            </span>
            <span className="text-lg" style={{ color: 'var(--color-accent-dark)' }}>{friction.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.9"
            step="0.01"
            value={friction}
            onChange={(e) => handleEdit(onFrictionChange, Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: 'var(--slider-accent)' }}
          />
          <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>Glace</span><span>Bois</span><span>Caoutchouc</span>
          </div>
        </div>

        {/* Mass */}
        <div className="space-y-4">
          <div className="flex justify-between font-bold uppercase text-xs tracking-widest"
            style={{ color: 'var(--color-text-secondary)' }}>
            <span className="flex items-center gap-2">⚖️ Masse</span>
            <span className="text-lg" style={{ color: 'var(--color-secondary)' }}>{mass.toFixed(1)} kg</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={mass}
            onChange={(e) => handleEdit(onMassChange, Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: 'var(--slider-secondary)' }}
          />
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

export default InclinedPlaneControls;
