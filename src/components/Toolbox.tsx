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
import { RootState, setCurrentTool, Tool } from '../store/paintStore';
import ToolButton from './ToolButton';
import BrushSettings from './BrushSettings';
import ColorPicker from './ColorPicker';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined'; // Ícone mais intuitivo para a borracha

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTool } = useSelector((state: RootState) => state.paint);

  const tools = [
    {
      id: 'brush' as Tool,
      label: 'Pincel',
      icon: <BrushOutlinedIcon />
    },
    {
      id: 'pencil' as Tool,
      label: 'Lápis',
      icon: <ModeEditOutlineOutlinedIcon />
    },
    {
      id: 'eraser' as Tool,
      label: 'Borracha',
      icon: <CropSquareOutlinedIcon />
    }
  ];

  const handleToolSelect = (toolId: Tool) => {
    dispatch(setCurrentTool(toolId));
  };

  return (
    <Stack spacing={2} sx={{ width: '280px', height: 'fit-content' }}>
      {/* Tools Section */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Ferramentas
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