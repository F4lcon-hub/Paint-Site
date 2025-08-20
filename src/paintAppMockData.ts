// Mock data for paint application

// Data for global state store
export const mockStore = {
  currentTool: 'brush' as const,
  brushSize: 10,
  opacity: 1.0,
  currentColor: '#000000',
  recentColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  canvasHistory: [],
  isDrawing: false
};

// Data for gradient color palette
export const mockQuery = {
  gradientColors: [
    ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'],
    ['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC'],
    ['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF'],
    ['#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC'],
    ['#FF00FF', '#FF33FF', '#FF66FF', '#FF99FF', '#FFCCFF'],
    ['#00FFFF', '#33FFFF', '#66FFFF', '#99FFFF', '#CCFFFF'],
    ['#000000', '#333333', '#666666', '#999999', '#CCCCCC']
  ]
};

// Root component props
export const mockRootProps = {
  canvasWidth: 800,
  canvasHeight: 600,
  defaultBrushSize: 10,
  maxBrushSize: 50,
  minBrushSize: 1
};