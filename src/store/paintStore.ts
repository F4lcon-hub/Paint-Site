import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// O tipo 'pencil' estava faltando
export type Tool = 'brush' | 'eraser' | 'line' | 'rect' | 'pencil';

interface PaintState {
  brushColor: string;
  brushSize: number;
  opacity: number;
  currentTool: Tool;
  // Estado para a funcionalidade de desfazer/refazer
  canvasHistory: string[];
  historyIndex: number;
  // Estado para as cores recentes
  recentColors: string[];
}

const initialState: PaintState = {
  brushColor: '#000000',
  brushSize: 5,
  opacity: 1.0,
  currentTool: 'brush',
  // Inicializa o histórico com um estado em branco
  canvasHistory: [],
  historyIndex: -1,
  // Preenche com algumas cores recentes padrão
  recentColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
};

const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {
    setBrushColor: (state, action: PayloadAction<string>) => {
      state.brushColor = action.payload;
      // Adiciona às cores recentes se ainda não estiver lá
      if (!state.recentColors.includes(action.payload)) {
        state.recentColors.unshift(action.payload);
        // Mantém apenas as últimas 10 cores recentes
        if (state.recentColors.length > 10) {
          state.recentColors.pop();
        }
      }
    },
    setBrushSize: (state, action: PayloadAction<number>) => {
      state.brushSize = action.payload;
    },
    setOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<Tool>) => {
      state.currentTool = action.payload;
    },
    // Reducers para gerenciamento de histórico
    saveStateForUndo: (state, action: PayloadAction<string>) => {
      // Quando um novo estado é salvo, descarta qualquer histórico de "refazer"
      const newHistory = state.canvasHistory.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      state.canvasHistory = newHistory;
      state.historyIndex = newHistory.length - 1;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.canvasHistory.length - 1) {
        state.historyIndex += 1;
      }
    },
    // Esta ação reinicia o histórico, limpando o estado do canvas
    clearCanvasHistory: (state) => {
        // Mantemos o primeiro estado (o canvas em branco) e reiniciamos o índice
        if (state.canvasHistory.length > 0) {
            state.canvasHistory = [state.canvasHistory[0]];
            state.historyIndex = 0;
        } else {
            state.canvasHistory = [];
            state.historyIndex = -1;
        }
    }
  },
});

export const { setBrushColor, setBrushSize, setOpacity, setCurrentTool, saveStateForUndo, undo, redo, clearCanvasHistory } = paintSlice.actions;

export const store = configureStore({
  reducer: {
    paint: paintSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;