/**
 * DEFINIÇÕES DE TIPOS - ENUMS DA APLICAÇÃO
 * 
 * Define os tipos de ferramentas, estilos de pincel
 * e operações disponíveis na aplicação.
 */

// Tipos de ferramentas disponíveis
export enum ToolType {
  BRUSH = 'brush',
  ERASER = 'eraser', 
  PENCIL = 'pencil'
}

// Brush styles
export enum BrushStyle {
  ROUND = 'round',
  SQUARE = 'square',
  SOFT = 'soft'
}

// Canvas operations
export enum CanvasOperation {
  DRAW = 'draw',
  ERASE = 'erase',
  CLEAR = 'clear'
}