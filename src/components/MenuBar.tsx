/**
 * COMPONENTE MENU BAR - BARRA DE MENU SUPERIOR
 * 
 * Barra superior com operações principais:
 * - Novo canvas, Salvar, Limpar
 * - Desfazer (Undo) e Refazer (Redo)
 */

import React from 'react';
import { AppBar, Toolbar, Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, undo, redo, clearCanvas } from '../store/paintStore';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';

interface MenuBarProps {
  onNewCanvas: () => void;
  onSaveCanvas: () => void;
  onClearCanvas: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onNewCanvas, onSaveCanvas, onClearCanvas }) => {
  const dispatch = useDispatch();
  const { canvasHistory, historyIndex } = useSelector((state: RootState) => state.paint);

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleClear = () => {
    dispatch(clearCanvas());
    onClearCanvas();
  };

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
          Paint Application
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<PostAddOutlinedIcon />}
            onClick={onNewCanvas}
            variant="outlined"
            size="small"
          >
            New
          </Button>
          
          <Button
            startIcon={<SaveOutlinedIcon />}
            onClick={onSaveCanvas}
            variant="outlined"
            size="small"
          >
            Save
          </Button>
          
          <Button
            startIcon={<DeleteForeverOutlinedIcon />}
            onClick={handleClear}
            variant="outlined"
            size="small"
            color="error"
          >
            Clear
          </Button>
          
          <Button
            startIcon={<UndoOutlinedIcon />}
            onClick={handleUndo}
            variant="outlined"
            size="small"
            disabled={historyIndex <= 0}
          >
            Undo
          </Button>
          
          <Button
            startIcon={<RedoOutlinedIcon />}
            onClick={handleRedo}
            variant="outlined"
            size="small"
            disabled={historyIndex >= canvasHistory.length - 1}
          >
            Redo
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;