/**
 * COMPONENTE COLOR SWATCH - AMOSTRA DE COR INDIVIDUAL
 * 
 * Representa uma cor específica na paleta:
 * - Exibe a cor visualmente
 * - Indica se está selecionada
 * - Permite seleção por clique
 */

import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledColorSwatch = styled(Button)(({ theme }) => ({
  minWidth: '32px',
  height: '32px',
  padding: 0,
  borderRadius: '4px',
  border: `2px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'scale(1.1)',
    borderColor: theme.palette.text.primary,
  },
  '&.selected': {
    borderColor: theme.palette.text.primary,
    borderWidth: '3px',
    transform: 'scale(1.1)',
  }
}));

interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick: () => void;
  size?: 'small' | 'medium';
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, selected = false, onClick, size = 'medium' }) => {
  const swatchSize = size === 'small' ? '24px' : '32px';
  
  return (
    <Tooltip title={color.toUpperCase()}>
      <StyledColorSwatch
        className={selected ? 'selected' : ''}
        onClick={onClick}
        sx={{
          backgroundColor: color,
          minWidth: swatchSize,
          height: swatchSize,
          '&:hover': {
            backgroundColor: color,
          }
        }}
      />
    </Tooltip>
  );
};

export default ColorSwatch;