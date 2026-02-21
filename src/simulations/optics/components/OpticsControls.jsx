import React from 'react';
import { Play, Pause, RotateCcw, Eye, Waves, GitBranch } from 'lucide-react';

const OpticsControls = ({
  incidentAngle, onIncidentAngleChange,
  n1, onN1Change,
  n2, onN2Change,
  surfaceType, onSurfaceTypeChange,
  rayType, onRayTypeChange,
  wavelength, onWavelengthChange,
  reflectedAngle,
  refractedAngle,
  criticalAngle,
  totalInternalReflection,
  predefinedMaterials,
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
        {/* Incident angle */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <Eye size={16} style={{ color: 'var(--color-primary)' }} /> Angle d'incidence
          </label>
          <input
            type="range"
            min="0"
            max="90"
            value={incidentAngle}
            onChange={(e) => onIncidentAngleChange(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--slider-primary)' }}
          />
          <div className="flex justify-between text-sm">
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{incidentAngle}°</span>
            {criticalAngle && (
              <span style={{ color: 'var(--color-accent-dark)' }}>
                Angle critique: {criticalAngle.toFixed(1)}°
              </span>
            )}
          </div>
        </div>

        {/* Refractive indices */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>Milieu 1 (n₁)</label>
            <select
              value={n1}
              onChange={(e) => onN1Change(Number(e.target.value))}
              className="w-full p-2 rounded-lg mt-1"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value={1.0}>Air (1.0)</option>
              <option value={1.33}>Eau (1.33)</option>
              <option value={1.5}>Verre (1.5)</option>
              <option value={2.42}>Diamant (2.42)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>Milieu 2 (n₂)</label>
            <select
              value={n2}
              onChange={(e) => onN2Change(Number(e.target.value))}
              className="w-full p-2 rounded-lg mt-1"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value={1.0}>Air (1.0)</option>
              <option value={1.33}>Eau (1.33)</option>
              <option value={1.5}>Verre (1.5)</option>
              <option value={2.42}>Diamant (2.42)</option>
            </select>
          </div>
        </div>

        {/* Surface type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <GitBranch size={16} style={{ color: 'var(--color-primary)' }} /> Type de surface
          </label>
          <div className="flex gap-2">
            {['plan', 'concave', 'convexe'].map(type => (
              <button
                key={type}
                onClick={() => onSurfaceTypeChange(type)}
                className="flex-1 py-2 rounded-lg font-bold capitalize transition-all"
                style={{
                  background: surfaceType === type ? 'var(--btn-primary-bg)' : 'var(--color-surface-raised)',
                  color: surfaceType === type ? 'var(--btn-primary-text)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ray type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <Waves size={16} style={{ color: 'var(--color-secondary)' }} /> Affichage
          </label>
          <div className="flex gap-2">
            {[
              { value: 'reflection', label: 'Réflexion' },
              { value: 'refraction', label: 'Réfraction' },
              { value: 'both', label: 'Les deux' }
            ].map(type => (
              <button
                key={type.value}
                onClick={() => onRayTypeChange(type.value)}
                className="flex-1 py-2 rounded-lg font-bold text-xs transition-all"
                style={{
                  background: rayType === type.value ? 'var(--btn-success-bg)' : 'var(--color-surface-raised)',
                  color: rayType === type.value ? 'var(--btn-success-text)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wavelength / color */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-red-500" /> Couleur
          </label>
          <input
            type="range"
            min="380"
            max="700"
            value={wavelength}
            onChange={(e) => onWavelengthChange(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--color-primary)' }}
          />
          <div className="text-right text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
            {wavelength} nm
          </div>
        </div>

        {/* Results */}
        <div className="p-4 rounded-xl space-y-2"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-soft)' }}>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Angle réfléchi:</span>
            <span className="font-bold" style={{ color: 'var(--color-secondary)' }}>{reflectedAngle}°</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Angle réfracté:</span>
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
              {totalInternalReflection ? '⚠️ Réflexion totale' : (refractedAngle?.toFixed(1) + '°' || 'N/A')}
            </span>
          </div>
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

export default OpticsControls;
