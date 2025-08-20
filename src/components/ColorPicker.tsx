/**
 * COMPONENTE COLOR PICKER - SELETOR DE CORES
 * 
 * Permite ao usuário selecionar cores através de:
 * - Paleta de cores gradiente predefinida
 * - Cores recentemente usadas
 * - Entrada de cor customizada (hex)
 */

import React, { useState } from 'react';
import { Paper, Typography, Stack, Box, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCurrentColor } from '../store/paintStore';
import ColorSwatch from './ColorSwatch';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';

const ColorPicker: React.FC = () => {
  const dispatch = useDispatch();
  const { currentColor, recentColors } = useSelector((state: RootState) => state.paint);
  const [customColor, setCustomColor] = useState('#000000');

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

  const handleColorSelect = (color: string) => {
    dispatch(setCurrentColor(color));
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(event.target.value);
  };

  const handleCustomColorApply = () => {
    dispatch(setCurrentColor(customColor));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <PaletteOutlinedIcon color="primary" />
        <Typography variant="h6">
          Color Picker
        </Typography>
      </Stack>
      
      <Stack spacing={2}>
        {/* Current Color Display */}
        <Box>
          <Typography variant="body2" gutterBottom>
            Current Color
          </Typography>
          <ColorSwatch
            color={currentColor}
            selected={true}
            onClick={() => {}}
            size="medium"
          />
        </Box>

        {/* Recent Colors */}
        {recentColors.length > 0 && (
          <Box>
            <Typography variant="body2" gutterBottom>
              Recent Colors
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {recentColors.map((color, index) => (
                <ColorSwatch
                  key={index}
                  color={color}
                  selected={color === currentColor}
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
            Color Palette
          </Typography>
          <Stack spacing={1}>
            {gradientColors.map((row, rowIndex) => (
              <Stack key={rowIndex} direction="row" spacing={1}>
                {row.map((color, colIndex) => (
                  <ColorSwatch
                    key={`${rowIndex}-${colIndex}`}
                    color={color}
                    selected={color === currentColor}
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
            Custom Color
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              size="small"
              sx={{ width: '60px' }}
            />
            <TextField
              value={customColor}
              onChange={handleCustomColorChange}
              size="small"
              placeholder="#000000"
              sx={{ flexGrow: 1 }}
            />
            <Button
              onClick={handleCustomColorApply}
              variant="outlined"
              size="small"
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ColorPicker;