import { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, saveStateForUndo, clearCanvasHistory } from '../store/paintStore';

interface UseCanvasReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: (x: number, y: number) => void;
  draw: (x: number, y: number) => void;
  stopDrawing: () => void;
  clearCanvas: () => void;
  saveCanvas: () => void;
}

export const useCanvas = (): UseCanvasReturn => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const dispatch = useDispatch();
  const { brushColor, brushSize, opacity, currentTool, canvasHistory, historyIndex } = useSelector(
    (state: RootState) => state.paint
  );

  // Função para configurar o contexto do canvas
  const setupContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;
  }, []);

  // Função para restaurar o canvas a partir do histórico
  const restoreCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || historyIndex < 0 || !canvasHistory[historyIndex]) return;

    const image = new Image();
    image.src = canvasHistory[historyIndex];
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };
  }, [canvasHistory, historyIndex]);

  // Efeito para configurar o contexto e carregar o estado inicial
  useEffect(() => {
    setupContext();
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context && canvasHistory.length === 0) {
      // Define o fundo branco inicial
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // Salva o estado inicial em branco no histórico
      dispatch(saveStateForUndo(canvas.toDataURL()));
    } else {
      restoreCanvas();
    }
  }, [setupContext, dispatch, canvasHistory.length, restoreCanvas]);

  // Efeito para lidar com mudanças de estado de desfazer/refazer
  useEffect(() => {
    restoreCanvas();
  }, [historyIndex, restoreCanvas]);

  const startDrawing = useCallback((x: number, y: number) => {
    const context = contextRef.current;
    if (!context) return;

    // Configura as propriedades do contexto com base na ferramenta selecionada
    if (currentTool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = brushSize;
    } else if (currentTool === 'pencil') {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = brushColor;
      context.globalAlpha = 1.0; // Lápis tem opacidade total e não é afetado pelo slider
      context.lineWidth = 1; // Lápis tem uma ponta fina e fixa
    } else {
      // Configuração padrão para 'brush' e outras ferramentas de desenho
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = brushColor;
      context.globalAlpha = opacity;
      context.lineWidth = brushSize;
    }

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  }, [brushColor, brushSize, opacity, currentTool]);

  const draw = useCallback((x: number, y: number) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;
    context.lineTo(x, y);
    context.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!isDrawing || !canvas) return;
    contextRef.current?.closePath();
    setIsDrawing(false);

    // Importante: Reseta a operação de composição após o desenho para não afetar outras ferramentas.
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation = 'source-over';
    }

    // Salva o novo estado no histórico após o término do desenho.
    dispatch(saveStateForUndo(canvas.toDataURL()));
  }, [isDrawing, dispatch]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    dispatch(clearCanvasHistory());
    // Salva o estado limpo como o novo estado inicial
    dispatch(saveStateForUndo(canvas.toDataURL()));
  }, [dispatch]);

  const saveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my-masterpiece.png';
    link.click();
  }, []);

  return { canvasRef, startDrawing, draw, stopDrawing, clearCanvas, saveCanvas };
};