/**
 * COMPONENTE TOOLBOX - BARRA DE FERRAMENTAS LATERAL
 * 
 * Componente que organiza todas as ferramentas de desenho:
 * - Seleção de ferramentas (pincel, lápis, borracha)
 * - Configurações do pincel (tamanho, opacidade)
 * - Seletor de cores
 */

import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCurrentTool } from '../store/paintStore';
import ToolButton from './ToolButton';
import BrushSettings from './BrushSettings';
import ColorPicker from './ColorPicker';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ScreenRotationOutlinedIcon from '@mui/icons-material/ScreenRotationOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTool } = useSelector((state: RootState) => state.paint);

  const tools = [
    {
      id: 'brush',
      label: 'Brush',
      icon: <BrushOutlinedIcon />
    },
    {
      id: 'pencil',
      label: 'Pencil',
      icon: <ModeEditOutlineOutlinedIcon />
    },
    {
      id: 'eraser',
      label: 'Eraser',
      icon: <ScreenRotationOutlinedIcon />
    }
  ];

  const handleToolSelect = (toolId: string) => {
    dispatch(setCurrentTool(toolId));
  };

  return (
    <Stack spacing={2} sx={{ width: '280px', height: 'fit-content' }}>
      {/* Tools Section */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Tools
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tools.map((tool) => (
            <ToolButton
              key={tool.id}
              icon={tool.icon}
              label={tool.label}
              selected={currentTool === tool.id}
              onClick={() => handleToolSelect(tool.id)}
            />
          ))}
        </Stack>
      </Paper>

      {/* Brush Settings */}
      <BrushSettings />

      {/* Color Picker */}
      <ColorPicker />
    </Stack>
  );
};

export default Toolbox;