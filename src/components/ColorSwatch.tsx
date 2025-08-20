/**
 * COMPONENTE COLOR SWATCH - AMOSTRA DE COR
 * 
 * Um pequeno quadrado clicável que exibe uma única cor.
 * Usado no ColorPicker para paletas e cores recentes.
 */

import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ColorSwatchProps {
  color: string;
  selected: boolean;
  onClick: () => void;
  size?: 'small' | 'medium';
}

const SwatchBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'swatchSize',
})<{ selected: boolean; swatchSize: 'small' | 'medium' }>(({ theme, selected, swatchSize }) => ({
  width: swatchSize === 'medium' ? theme.spacing(4) : theme.spacing(3),
  height: swatchSize === 'medium' ? theme.spacing(4) : theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  border: `2px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
  outline: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['border-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.1)',
    borderColor: theme.palette.primary.light,
  },
}));

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, selected, onClick, size = 'small' }) => {
  return (
    <Tooltip title={color.toUpperCase()} placement="top">
      <SwatchBox swatchSize={size} selected={selected} onClick={onClick} sx={{ backgroundColor: color }} />
    </Tooltip>
  );
};

export default ColorSwatch;