import { useState, useCallback, useEffect } from 'react';

const useLever = () => {
  // États
  const [massLeft, setMassLeft] = useState(2); // kg
  const [massRight, setMassRight] = useState(2); // kg
  const [distanceLeft, setDistanceLeft] = useState(1); // m
  const [distanceRight, setDistanceRight] = useState(1); // m
  const [leverType, setLeverType] = useState('inter-appui'); // inter-appui, inter-resistant, inter-moteur
  const [isRunning, setIsRunning] = useState(false);
  
  // Résultats
  const [momentLeft, setMomentLeft] = useState(0);
  const [momentRight, setMomentRight] = useState(0);
  const [equilibrium, setEquilibrium] = useState(true);
  const [rotation, setRotation] = useState(0); // degrés

  // Constantes
  const g = 9.81; // gravité
  const pivotPosition = 300; // position x du pivot dans le canvas
  const leverLength = 400; // longueur totale du levier

  // Calcul des moments (M = F × d = m × g × d)
  const calculateMoments = useCallback(() => {
    const momentGauche = massLeft * g * distanceLeft;
    const momentDroit = massRight * g * distanceRight;
    
    setMomentLeft(momentGauche);
    setMomentRight(momentDroit);
    
    // Vérifier l'équilibre (avec une petite tolérance)
    const diff = Math.abs(momentGauche - momentDroit);
    setEquilibrium(diff < 0.1);
    
    // Calcul de la rotation (inclinaison du levier)
    if (!equilibrium) {
      if (momentGauche > momentDroit) {
        setRotation(-5); // penche à gauche
      } else {
        setRotation(5); // penche à droite
      }
    } else {
      setRotation(0);
    }
  }, [massLeft, massRight, distanceLeft, distanceRight, equilibrium]);

  // Recalculer quand les paramètres changent
  useEffect(() => {
    calculateMoments();
  }, [calculateMoments]);

  // Calcul du rapport idéal pour l'équilibre
  const getIdealRatio = useCallback(() => {
    if (massRight === 0) return Infinity;
    return (massLeft / massRight).toFixed(2);
  }, [massLeft, massRight]);

  // Prédéfinitions de leviers
  const leverPresets = {
    'inter-appui': {
      name: 'Balançoire (inter-appui)',
      description: 'Pivot entre les forces',
      example: 'Pivot au milieu'
    },
    'inter-resistant': {
      name: 'Brouette (inter-résistant)',
      description: 'Résistance entre pivot et force',
      example: 'Force à l\'extrémité'
    },
    'inter-moteur': {
      name: 'Pince (inter-moteur)',
      description: 'Force entre pivot et résistance',
      example: 'Force au milieu'
    }
  };

  return {
    // États
    massLeft, setMassLeft,
    massRight, setMassRight,
    distanceLeft, setDistanceLeft,
    distanceRight, setDistanceRight,
    leverType, setLeverType,
    isRunning, setIsRunning,
    
    // Résultats
    momentLeft,
    momentRight,
    equilibrium,
    rotation,
    
    // Constantes
    g,
    pivotPosition,
    leverLength,
    
    // Utilitaires
    getIdealRatio,
    leverPresets,
    
    // Reset
    reset: () => {
      setMassLeft(2);
      setMassRight(2);
      setDistanceLeft(1);
      setDistanceRight(1);
      setLeverType('inter-appui');
      setRotation(0);
      setIsRunning(false);
    }
  };
};

export default useLever;