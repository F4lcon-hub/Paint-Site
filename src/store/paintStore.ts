/**
 * GERENCIAMENTO DE ESTADO - REDUX STORE
 * 
 * Este arquivo é responsável por todo o gerenciamento de estado da aplicação.
 * Controla: ferramentas, cores, tamanho do pincel, histórico de ações, etc.
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface que define o estado global da aplicação de pintura
 */
interface PaintState {
  currentTool: string;
  brushSize: number;
  opacity: number;
  currentColor: string;
  recentColors: string[];
  canvasHistory: string[];
  historyIndex: number;
  isDrawing: boolean;
}

const initialState: PaintState = {
  currentTool: 'brush',
  brushSize: 10,
  opacity: 1.0,
  currentColor: '#000000',
  recentColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  canvasHistory: [],
  historyIndex: -1,
  isDrawing: false
};

const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {
    setCurrentTool: (state, action: PayloadAction<string>) => {
      state.currentTool = action.payload;
    },
    setBrushSize: (state, action: PayloadAction<number>) => {
      state.brushSize = action.payload;
    },
    setOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    setCurrentColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
      // Add to recent colors if not already present
      if (!state.recentColors.includes(action.payload)) {
        state.recentColors = [action.payload, ...state.recentColors.slice(0, 5)];
      }
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      // Remove any history after current index
      state.canvasHistory = state.canvasHistory.slice(0, state.historyIndex + 1);
      state.canvasHistory.push(action.payload);
      state.historyIndex = state.canvasHistory.length - 1;
      // Limit history to 50 steps
      if (state.canvasHistory.length > 50) {
        state.canvasHistory = state.canvasHistory.slice(-50);
        state.historyIndex = state.canvasHistory.length - 1;
      }
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.canvasHistory.length - 1) {
        state.historyIndex++;
      }
    },
    setIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    clearCanvas: (state) => {
      state.canvasHistory = [];
      state.historyIndex = -1;
    }
  }
});

export const {
  setCurrentTool,
  setBrushSize,
  setOpacity,
  setCurrentColor,
  addToHistory,
  undo,
  redo,
  setIsDrawing,
  clearCanvas
} = paintSlice.actions;

export const store = configureStore({
  reducer: {
    paint: paintSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;