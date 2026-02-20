import React from 'react';
import { Play, Pause, RotateCcw, Scale, Weight, Move, GitBranch } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-6 border border-slate-100 dark:border-slate-800 space-y-6">
      <button
        onClick={onToggleRunning}
        className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
          isRunning 
          ? 'bg-amber-100 text-amber-600 border-2 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400' 
          : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {isRunning ? <><Pause size={24} /> PAUSE</> : <><Play size={24} /> DÉMARRER</>}
      </button>

      <div className="space-y-4">
        {/* Type de levier */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2">
            <GitBranch size={16} /> Type de levier
          </label>
          <select
            value={leverType}
            onChange={(e) => onLeverTypeChange(e.target.value)}
            className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
          >
            <option value="inter-appui">Balançoire (inter-appui)</option>
            <option value="inter-resistant">Brouette (inter-résistant)</option>
            <option value="inter-moteur">Pince (inter-moteur)</option>
          </select>
        </div>

        {/* Masses */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 text-sm font-bold text-slate-500 mb-2">
              <Weight size={14} className="text-red-500" /> Masse G (kg)
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={massLeft}
              onChange={(e) => onMassLeftChange(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="text-right text-sm font-bold text-red-500">{massLeft} kg</div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-bold text-slate-500 mb-2">
              <Weight size={14} className="text-blue-500" /> Masse D (kg)
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={massRight}
              onChange={(e) => onMassRightChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="text-right text-sm font-bold text-blue-500">{massRight} kg</div>
          </div>
        </div>

        {/* Distances */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 text-sm font-bold text-slate-500 mb-2">
              <Move size={14} className="text-red-500" /> Distance G (m)
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={distanceLeft}
              onChange={(e) => onDistanceLeftChange(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="text-right text-sm font-bold text-red-500">{distanceLeft} m</div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-bold text-slate-500 mb-2">
              <Move size={14} className="text-blue-500" /> Distance D (m)
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={distanceRight}
              onChange={(e) => onDistanceRightChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="text-right text-sm font-bold text-blue-500">{distanceRight} m</div>
          </div>
        </div>

        {/* Résultats des moments */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Moment gauche:</span>
            <span className="font-bold text-red-500">{momentLeft.toFixed(1)} Nm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Moment droit:</span>
            <span className="font-bold text-blue-500">{momentRight.toFixed(1)} Nm</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">État:</span>
            <span className={`font-bold ${equilibrium ? 'text-green-500' : 'text-amber-500'}`}>
              {equilibrium ? '⚖️ Équilibre' : '⚠️ Déséquilibre'}
            </span>
          </div>
        </div>

        {/* Ratio idéal */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-center">
          <p className="text-xs font-bold text-blue-400 uppercase">Loi des leviers</p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            m₁ × d₁ = m₂ × d₂
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-2 text-slate-400 font-bold flex items-center justify-center gap-2 hover:text-slate-600 transition-colors"
      >
        <RotateCcw size={18} /> RÉINITIALISER
      </button>
    </div>
  );
};

export default LeverControls;