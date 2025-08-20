/**
 * COMPONENTE DO CANVAS - ÁREA DE DESENHO PRINCIPAL
 * 
 * Este componente renderiza o canvas HTML5 onde o usuário desenha.
 * Gerencia eventos de mouse e aplica os estilos visuais do canvas.
 */

import React, { useCallback } from 'react';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCanvas } from '../hooks/useCanvas';
import { useSelector } from 'react-redux';
import { RootState } from '../store/paintStore';

const CanvasContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const StyledCanvas = styled('canvas')(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'crosshair',
  backgroundColor: '#FFFFFF',
  '&.brush': {
    cursor: 'crosshair',
  },
  '&.pencil': {
    cursor: 'crosshair',
  },
  '&.eraser': {
    cursor: 'grab',
  }
}));

const PaintCanvas: React.FC = () => {
  const { canvasRef, startDrawing, draw, stopDrawing } = useCanvas();
  const { currentTool } = useSelector((state: RootState) => state.paint);

  const getMousePos = useCallback((canvas: HTMLCanvasElement, e: React.MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pos = getMousePos(canvas, e);
    startDrawing(pos.x, pos.y);
  }, [canvasRef, getMousePos, startDrawing]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pos = getMousePos(canvas, e);
    draw(pos.x, pos.y);
  }, [canvasRef, getMousePos, draw]);

  const handleMouseUp = useCallback(() => {
    stopDrawing();
  }, [stopDrawing]);

  const handleMouseLeave = useCallback(() => {
    stopDrawing();
  }, [stopDrawing]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <CanvasContainer elevation={3}>
        <StyledCanvas
          ref={canvasRef}
          className={currentTool}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          width={800}
          height={600}
        />
      </CanvasContainer>
    </Box>
  );
};

export default PaintCanvas;