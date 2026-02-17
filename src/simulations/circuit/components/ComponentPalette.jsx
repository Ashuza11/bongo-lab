import React from 'react';
import { Battery, Zap, Lightbulb, Trash2 } from 'lucide-react';

const ComponentPalette = ({ onAddComponent, onRemoveComponent, components }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-6 border border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-lg mb-4">Composants</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <button
          onClick={() => onAddComponent('battery', 200, 200)}
          className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 transition-colors"
        >
          <Battery className="mx-auto text-green-600" size={24} />
          <span className="text-xs mt-1 block">Pile</span>
        </button>
        
        <button
          onClick={() => onAddComponent('resistor', 400, 200)}
          className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 transition-colors"
        >
          <Zap className="mx-auto text-amber-600" size={24} />
          <span className="text-xs mt-1 block">Résistance</span>
        </button>
        
        <button
          onClick={() => onAddComponent('bulb', 300, 300)}
          className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl hover:bg-yellow-100 transition-colors"
        >
          <Lightbulb className="mx-auto text-yellow-600" size={24} />
          <span className="text-xs mt-1 block">Ampoule</span>
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        <h4 className="text-sm font-semibold text-slate-500 mb-2">Composants placés</h4>
        {components.map(comp => (
          <div key={comp.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-2">
              {comp.type === 'battery' && <Battery size={16} className="text-green-600" />}
              {comp.type === 'resistor' && <Zap size={16} className="text-amber-600" />}
              {comp.type === 'bulb' && <Lightbulb size={16} className="text-yellow-600" />}
              <span className="text-sm capitalize">{comp.type}</span>
              <span className="text-xs text-slate-400">{comp.value}{comp.type === 'battery' ? 'V' : 'Ω'}</span>
            </div>
            <button
              onClick={() => onRemoveComponent(comp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;