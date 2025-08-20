/**
 * COMPONENTE BRUSH SETTINGS - CONFIGURAÇÕES DO PINCEL
 * 
 * Controla as propriedades do pincel:
 * - Tamanho (1-50px)
 * - Opacidade (10-100%)
 */
import React, { useCallback } from 'react';
import { Paper, Typography, Slider, Stack, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setBrushSize, setOpacity } from '../store/paintStore';
import { formatBrushSize, formatOpacity } from '../utils/formatters';

const BrushSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { brushSize, opacity, currentTool } = useSelector(
    (state: RootState) => state.paint
  );

  // Corrige o erro de lógica: desabilita os controles se a ferramenta não for um pincel.
  const isBrushTool = currentTool === 'brush' || currentTool === 'eraser';

  // Corrige o erro de performance: usa useCallback para evitar recriar as funções.
  const handleBrushSizeChange = useCallback((_: Event, newValue: number | number[]) => {
      dispatch(setBrushSize(newValue as number));
    }, [dispatch]);

  const handleOpacityChange = useCallback((_: Event, newValue: number | number[]) => {
      dispatch(setOpacity((newValue as number) / 100));
    }, [dispatch]);

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Configurações do Pincel
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Tamanho: {formatBrushSize(brushSize)}
          </Typography>
          <Slider
            value={brushSize}
            onChange={handleBrushSizeChange}
            min={1}
            max={50}
            step={1}
            size="small"
            disabled={!isBrushTool}
          />
        </Box>
        
        <Box>
          <Typography variant="body2" gutterBottom>
            Opacidade: {formatOpacity(opacity)}
          </Typography>
          <Slider
            value={opacity * 100}
            onChange={handleOpacityChange}
            min={10}
            max={100}
            step={5}
            size="small"
            disabled={!isBrushTool}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default BrushSettings;