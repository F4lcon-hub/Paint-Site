/**
 * COMPONENTE BRUSH SETTINGS - CONFIGURAÇÕES DO PINCEL
 * 
 * Controla as propriedades do pincel:
 * - Tamanho (1-50px)
 * - Opacidade (10-100%)
 */

import React from 'react';
import { Paper, Typography, Slider, Stack, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setBrushSize, setOpacity } from '../store/paintStore';
import { formatBrushSize, formatOpacity } from '../utils/formatters';

const BrushSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { brushSize, opacity, currentTool } = useSelector((state: RootState) => state.paint);

  const handleBrushSizeChange = (_: Event, newValue: number | number[]) => {
    dispatch(setBrushSize(newValue as number));
  };

  const handleOpacityChange = (_: Event, newValue: number | number[]) => {
    dispatch(setOpacity((newValue as number) / 100));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Brush Settings
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Size: {formatBrushSize(brushSize)}
          </Typography>
          <Slider
            value={brushSize}
            onChange={handleBrushSizeChange}
            min={1}
            max={50}
            step={1}
            size="small"
            disabled={currentTool === 'eraser'}
          />
        </Box>
        
        <Box>
          <Typography variant="body2" gutterBottom>
            Opacity: {formatOpacity(opacity)}
          </Typography>
          <Slider
            value={opacity * 100}
            onChange={handleOpacityChange}
            min={10}
            max={100}
            step={5}
            size="small"
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default BrushSettings;