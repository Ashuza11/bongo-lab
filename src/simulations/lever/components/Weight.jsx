import React from 'react';
import { Group, Rect, Circle, Text } from 'react-konva';

const Weight = ({ 
  x, 
  y, 
  mass, 
  color = '#f59e0b',
  label,
  draggable = false,
  onDragMove,
  onDragEnd
}) => {
  
  // Taille proportionnelle à la masse
  const size = Math.max(30, Math.min(60, 30 + mass * 5));
  
  return (
    <Group
      x={x}
      y={y}
      draggable={draggable}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
    >
      {/* Masse principale */}
      <Rect
        width={size}
        height={size}
        fill={color}
        stroke="#d97706"
        strokeWidth={2}
        cornerRadius={8}
        offsetX={size/2}
        offsetY={size/2}
        shadowBlur={10}
        shadowColor="rgba(0,0,0,0.3)"
      />
      
      {/* Effet 3D (reflet) */}
      <Circle
        x={-size/4}
        y={-size/4}
        radius={size/6}
        fill="white"
        opacity={0.3}
      />
      
      {/* Valeur de la masse */}
      <Text
        x={-15}
        y={-10}
        text={`${mass} kg`}
        fontSize={12}
        fill="white"
        fontStyle="bold"
        width={30}
        align="center"
      />
      
      {/* Label (Gauche/Droite) */}
      {label && (
        <Text
          x={-15}
          y={-30}
          text={label}
          fontSize={14}
          fill={color}
          fontStyle="bold"
          width={30}
          align="center"
        />
      )}
    </Group>
  );
};

export default Weight;