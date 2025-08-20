/**
 * COMPONENTE COLOR PICKER - SELETOR DE CORES
 * 
 * Permite ao usuário selecionar cores através de:
 * - Paleta de cores gradiente predefinida
 * - Cores recentemente usadas
 * - Entrada de cor customizada (hex)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Typography, Stack, Box, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setBrushColor } from '../store/paintStore';
import ColorSwatch from './ColorSwatch';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';

const ColorPicker: React.FC = () => {
  const dispatch = useDispatch();
  const { brushColor, recentColors } = useSelector((state: RootState) => state.paint);
  const [customColor, setCustomColor] = useState(brushColor);
  const [isCustomColorValid, setIsCustomColorValid] = useState(true);

  // Efeito para sincronizar o estado local com o estado global do Redux.
  // Isso garante que o seletor de cor customizada sempre mostre a cor atual.
  useEffect(() => {
    setCustomColor(brushColor);
  }, [brushColor]);

  // Gradient color palette
  const gradientColors = [
    ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'],
    ['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC'],
    ['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF'],
    ['#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC'],
    ['#FF00FF', '#FF33FF', '#FF66FF', '#FF99FF', '#FFCCFF'],
    ['#00FFFF', '#33FFFF', '#66FFFF', '#99FFFF', '#CCFFFF'],
    ['#000000', '#333333', '#666666', '#999999', '#CCCCCC']
  ];

  // Usamos useCallback para otimizar a performance, evitando recriar a função a cada renderização.
  const handleColorSelect = useCallback((color: string) => {
      dispatch(setBrushColor(color));
    }, [dispatch]);

  // Handler para o campo de texto. Atualiza o estado local e valida.
  const handleCustomColorTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCustomColor(newColor);
    // Valida o formato da cor em tempo real
    setIsCustomColorValid(/^#([0-9A-F]{3}){1,2}$/i.test(newColor));
  };

  // Handler para o seletor de cores nativo. Atualiza o estado e assume que a cor é válida.
  const handleNativeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(event.target.value);
    setIsCustomColorValid(true);
  };

  const handleCustomColorApply = useCallback(() => {
    // Aplica a cor apenas se ela for válida
    if (isCustomColorValid) {
      dispatch(setBrushColor(customColor));
    } else {
      console.warn('Formato de cor inválido. Use o formato #RRGGBB ou #RGB.');
    }
  }, [customColor, dispatch, isCustomColorValid]);

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <PaletteOutlinedIcon color="primary" />
        <Typography variant="h6">
          Seletor de Cores
        </Typography>
      </Stack>
      
      <Stack spacing={2}>
        {/* Current Color Display */}
        <Box>
          <Typography variant="body2" gutterBottom>
            Cor Atual
          </Typography>
          <Box
            sx={{
              width: (theme) => theme.spacing(4),
              height: (theme) => theme.spacing(4),
              backgroundColor: brushColor,
              borderRadius: 1,
              border: (theme) => `2px solid ${theme.palette.divider}`,
            }}
          />
        </Box>

        {/* Recent Colors */}
        {recentColors.length > 0 && (
          <Box>
            <Typography variant="body2" gutterBottom>
              Cores Recentes
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {recentColors.map((color) => (
                <ColorSwatch
                  key={color}
                  color={color}
                  selected={color.toLowerCase() === brushColor.toLowerCase()}
                  onClick={() => handleColorSelect(color)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Gradient Color Palette */}
        <Box>
          <Typography variant="body2" gutterBottom>
            Paleta de Cores
          </Typography>
          <Stack spacing={1}>
            {gradientColors.map((row, rowIndex) => (
              <Stack key={rowIndex} direction="row" spacing={1}>
                {row.map((color, colIndex) => (
                  <ColorSwatch
                    key={`${rowIndex}-${colIndex}`}
                    color={color}
                    selected={color.toLowerCase() === brushColor.toLowerCase()}
                    onClick={() => handleColorSelect(color)}
                    size="small"
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Custom Color Input */}
        <Box>
          <Typography variant="body2" gutterBottom>
            Cor Customizada
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              type="color"
              value={isCustomColorValid ? customColor : '#000000'} // Evita passar valor inválido para o input
              onChange={handleNativeColorChange}
              size="small"
              sx={{ width: '60px' }}
            />
            <TextField
              value={customColor}
              onChange={handleCustomColorTextChange}
              size="small"
              placeholder="#000000"
              sx={{ flexGrow: 1 }}
              error={!isCustomColorValid}
              helperText={!isCustomColorValid ? 'Formato inválido' : ''}
            />
            <Button
              onClick={handleCustomColorApply}
              variant="outlined"
              size="small"
            >
              Aplicar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ColorPicker;