import React from 'react';
import { Play, Pause, RotateCcw, Ruler, Gauge, MoveHorizontal } from 'lucide-react';

const PendulumControls = ({
  length, onLengthChange, angle, onAngleChange, gravity, onGravityChange,
  isRunning, onToggleRunning, onReset
}) => {

  const handleEdit = (setter, value) => {
    if (isRunning) {
      onToggleRunning();
    }
    setter(value);
  };

  const ControlSection = ({ icon: Icon, label, value, unit, disabled, children }) => (
    <div className="space-y-3 p-4 rounded-xl transition-all"
      style={{
        background: disabled ? 'var(--color-border-soft)' : 'var(--color-surface)',
        opacity: disabled ? 0.6 : 1,
      }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          <Icon size={18} style={{ color: 'var(--color-primary)' }} />
          <label>{label}</label>
        </div>
        <span className="text-sm font-bold px-2 py-1 rounded"
          style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }}>
          {value} {unit}
        </span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="rounded-2xl shadow-sm overflow-hidden"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

      {/* Main button row */}
      <div className="p-5 flex flex-col sm:flex-row justify-center gap-4"
        style={{ background: 'var(--color-surface-raised)' }}>
        <button
          onClick={onToggleRunning}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-all active:scale-95 shadow-md"
          style={{
            background: isRunning ? 'var(--btn-pause-bg)' : 'var(--btn-success-bg)',
            color: isRunning ? 'var(--btn-pause-text)' : 'var(--btn-success-text)',
            border: isRunning ? '1.5px solid var(--btn-pause-border)' : 'none',
          }}
        >
          {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Démarrer</>}
        </button>
        <button
          onClick={onReset}
          className="p-3 rounded-xl transition-all shadow-sm"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--btn-ghost-text)',
          }}
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Sliders */}
      <div style={{ borderTop: '1px solid var(--color-divider)' }}>
        <ControlSection icon={Ruler} label="Longueur" value={length} unit="cm" disabled={isRunning}>
          <input
            type="range"
            min="50"
            max="350"
            value={length}
            onChange={(e) => handleEdit(onLengthChange, Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: 'var(--slider-primary)' }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            <span>50</span><span>200</span><span>350</span>
          </div>
        </ControlSection>
      </div>

      <div style={{ borderTop: '1px solid var(--color-divider)' }}>
        <ControlSection icon={MoveHorizontal} label="Angle initial" value={Math.abs(angle)} unit="°" disabled={isRunning}>
          <input
            type="range"
            min="-85"
            max="85"
            value={angle}
            onChange={(e) => handleEdit(onAngleChange, Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: 'var(--slider-accent)' }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            <span>Gauche</span><span>Milieu</span><span>Droite</span>
          </div>
        </ControlSection>
      </div>

      <div style={{ borderTop: '1px solid var(--color-divider)' }}>
        <ControlSection icon={Gauge} label="Gravité" value={gravity.toFixed(2)} unit="g">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.01"
            value={gravity}
            onChange={(e) => onGravityChange(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: 'var(--slider-secondary)' }}
          />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { l: '🌑 Lune', v: 0.16, short: '🌑' },
              { l: '🌍 Terre', v: 1, short: '🌍' },
              { l: '🪐 Jupiter', v: 1.5, short: '🪐' }
            ].map(opt => (
              <button
                key={opt.l}
                onClick={() => onGravityChange(opt.v)}
                className="flex-1 text-xs font-medium py-2 rounded transition-all"
                style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface-raised)'}
                title={opt.l}
              >
                <span className="hidden sm:inline">{opt.l}</span>
                <span className="sm:hidden">{opt.short}</span>
              </button>
            ))}
          </div>
        </ControlSection>
      </div>
    </div>
  );
};

export default PendulumControls;
