import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, Group } from 'react-konva';

const CircuitCanvas = ({ components, isRunning, isFullscreen }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: isFullscreen ? window.innerHeight - 120 : 500
        });
      }
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, [isFullscreen]);

  const drawComponent = (comp) => {
    switch(comp.type) {
      case 'battery':
        return (
          <Group key={comp.id} x={comp.x} y={comp.y}>
            <Rect width={40} height={60} fill="#6B9E3C" stroke="#2D4A1A" strokeWidth={2} cornerRadius={5} />
            <Line points={[10, 20, 30, 20]} stroke="white" strokeWidth={3} />
            <Line points={[20, 15, 20, 25]} stroke="white" strokeWidth={3} />
            <Text text="+" x={5} y={10} fill="white" fontSize={12} />
            <Text text="-" x={25} y={40} fill="white" fontSize={12} />
          </Group>
        );
      case 'resistor':
        return (
          <Group key={comp.id} x={comp.x} y={comp.y}>
            <Rect width={50} height={20} fill="#D4792C" stroke="#5D3A1A" strokeWidth={2} cornerRadius={3} />
            <Line points={[0, 10, 10, 10, 20, 0, 30, 20, 40, 10, 50, 10]} stroke="#5D3A1A" strokeWidth={2} />
            <Text text={`${comp.value}Ω`} x={10} y={-15} fontSize={10} fill="#D4792C" />
          </Group>
        );
      case 'bulb':
        return (
          <Group key={comp.id} x={comp.x} y={comp.y}>
            <Circle radius={20} fill="#F2D974" stroke="#D4792C" strokeWidth={2} />
            <Circle radius={15} fill="#E8C547" opacity={0.5} />
            <Line points={[-10, -10, 10, 10]} stroke="#D4792C" strokeWidth={2} />
            <Line points={[-10, 10, 10, -10]} stroke="#D4792C" strokeWidth={2} />
            {isRunning && (
              <Circle radius={22} stroke="#E8C547" strokeWidth={2} opacity={0.5} dash={[5, 5]} />
            )}
          </Group>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-3xl overflow-hidden">
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {/* Grille de fond */}
          {[...Array(10)].map((_, i) => (
            <Line
              key={i}
              points={[0, i * 60, dimensions.width, i * 60]}
              stroke="#e2e8f0"
              strokeWidth={1}
              opacity={0.2}
            />
          ))}
          
          {/* Fils de connexion (simples) */}
          <Line points={[220, 230, 280, 230]} stroke="#1B4F72" strokeWidth={3} />
          <Line points={[280, 230, 280, 300]} stroke="#1B4F72" strokeWidth={3} />
          <Line points={[280, 300, 340, 300]} stroke="#1B4F72" strokeWidth={3} />
          
          {/* Composants */}
          {components.map(comp => drawComponent(comp))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CircuitCanvas;