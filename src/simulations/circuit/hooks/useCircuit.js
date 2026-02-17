import { useState, useCallback } from 'react';

const useCircuit = () => {
  const [components, setComponents] = useState([
    { id: 1, type: 'battery', x: 200, y: 200, value: 9 },
    { id: 2, type: 'resistor', x: 400, y: 200, value: 100 },
    { id: 3, type: 'bulb', x: 300, y: 300, value: 0 }
  ]);
  
  const [voltage, setVoltage] = useState(9);
  const [resistance, setResistance] = useState(100);
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [circuitType, setCircuitType] = useState('series');

  const addComponent = useCallback((type, x, y) => {
    const newComponent = {
      id: Date.now(),
      type,
      x,
      y,
      value: type === 'battery' ? 9 : type === 'resistor' ? 100 : 0
    };
    setComponents(prev => [...prev, newComponent]);
  }, []);

  const removeComponent = useCallback((id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  }, []);

  const updateComponent = useCallback((id, updates) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  }, []);

  const calculateCurrent = useCallback(() => {
    // Loi d'Ohm: I = V / R
    if (circuitType === 'series') {
      // En série, les résistances s'additionnent
      const totalR = components
        .filter(c => c.type === 'resistor')
        .reduce((sum, r) => sum + r.value, resistance);
      setCurrent(voltage / totalR);
    } else {
      // En parallèle, 1/Rtotal = 1/R1 + 1/R2 + ...
      const resistors = components.filter(c => c.type === 'resistor');
      if (resistors.length === 0) {
        setCurrent(voltage / resistance);
      } else {
        const totalR = 1 / resistors.reduce((sum, r) => sum + 1/r.value, 0);
        setCurrent(voltage / totalR);
      }
    }
  }, [voltage, resistance, components, circuitType]);

  return {
    components,
    addComponent,
    removeComponent,
    updateComponent,
    voltage, setVoltage,
    resistance, setResistance,
    current,
    isRunning, setIsRunning,
    circuitType, setCircuitType,
    calculateCurrent
  };
};

export default useCircuit;