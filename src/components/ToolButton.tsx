/**
 * COMPONENTE TOOL BUTTON - BOTÃO DE FERRAMENTA REUTILIZÁVEL
 * 
 * Um botão de ícone estilizado para a barra de ferramentas.
 * Mostra um tooltip com o nome da ferramenta e tem um estado visual para seleção.
 */

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface ToolButtonProps {
  icon: React.ReactElement;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon, label, selected, onClick }) => {
  return (
    <Tooltip title={label} placement="top">
      <IconButton
        onClick={onClick}
        color={selected ? 'primary' : 'default'}
        size="large"
        sx={{
          bgcolor: selected ? 'action.selected' : 'transparent',
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ToolButton;