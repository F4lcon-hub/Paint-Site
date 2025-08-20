/**
 * COMPONENTE TOOL BUTTON - BOTÃO DE FERRAMENTA REUTILIZÁVEL
 * 
 * Botão estilizado para seleção de ferramentas com:
 * - Estado visual de selecionado/não selecionado
 * - Tooltip informativo
 * - Ícone da ferramenta
 */

import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToolButton = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  height: '48px',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
  '&.selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }
}));

interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon, label, selected, onClick }) => {
  return (
    <Tooltip title={label} placement="right">
      <StyledToolButton
        className={selected ? 'selected' : ''}
        onClick={onClick}
        variant="outlined"
      >
        {icon}
      </StyledToolButton>
    </Tooltip>
  );
};

export default ToolButton;