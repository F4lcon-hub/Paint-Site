/**
 * ARQUIVO PRINCIPAL - COMPONENTE RAIZ DA APLICAÇÃO
 * 
 * Este é o componente principal que organiza toda a aplicação de pintura.
 * Responsável por:
 * - Configurar o Provider do Redux para gerenciamento de estado
 * - Aplicar o tema Material-UI
 * - Organizar o layout principal da aplicação
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack, Box } from '@mui/material';
import { store } from '../store/paintStore';
import theme from '../theme/theme';
import MenuBar from './MenuBar';
import Toolbox from './Toolbox';
import PaintCanvas from './PaintCanvas';
import { useCanvas } from '../hooks/useCanvas';

/**
 * Componente interno que contém o conteúdo principal da aplicação
 * Organiza o layout em: MenuBar (topo) + Toolbox (esquerda) + Canvas (centro)
 */
const PaintAppContent: React.FC = () => {
  const { clearCanvas, saveCanvas } = useCanvas();

  const handleNewCanvas = () => {
    clearCanvas();
  };

  const handleSaveCanvas = () => {
    saveCanvas();
  };

  const handleClearCanvas = () => {
    clearCanvas();
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MenuBar
        onNewCanvas={handleNewCanvas}
        onSaveCanvas={handleSaveCanvas}
        onClearCanvas={handleClearCanvas}
      />
      
      <Stack direction="row" sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ p: 2 }}>
          <Toolbox />
        </Box>
        
        <PaintCanvas />
      </Stack>
    </Box>
  );
};

/**
 * Componente raiz que configura todos os providers necessários
 * Este é o ponto de entrada principal da aplicação
 */
const PaintApp: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaintAppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default PaintApp;