import React from 'react';
import { Box, Typography } from '@mui/material';
import BrushSettings from './components/BrushSettings';

const App: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Paint Application
      </Typography>
      <BrushSettings />
    </Box>
  );
};

export default App;