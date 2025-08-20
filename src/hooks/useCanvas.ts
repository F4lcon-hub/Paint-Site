/**
 * HOOK PRINCIPAL DO CANVAS - LÓGICA DE DESENHO
 * 
 * Este hook contém toda a lógica de desenho no canvas HTML5.
 * Responsável por: inicializar canvas, controlar desenho, salvar/carregar histórico
 */

import { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/paintStore';
import { addToHistory, setIsDrawing } from '../store/paintStore';

/**
 * Hook customizado para gerenciar todas as operações do canvas
 * Retorna funções para iniciar, desenhar, parar desenho, limpar e salvar
 */
export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  
  const dispatch = useDispatch();
  const { currentTool, brushSize, opacity, currentColor, canvasHistory, historyIndex } = useSelector((state: RootState) => state.paint);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Configure context
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.imageSmoothingEnabled = true;
    
    // Fill with white background
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    contextRef.current = context;
  }, []);

  const updateContextSettings = useCallback(() => {
    const context = contextRef.current;
    if (!context) return;

    context.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
    context.lineWidth = brushSize;
    context.globalAlpha = opacity;
    context.strokeStyle = currentColor;
  }, [currentTool, brushSize, opacity, currentColor]);

  const startDrawing = useCallback((x: number, y: number) => {
    const context = contextRef.current;
    if (!context) return;

    isDrawingRef.current = true;
    lastPointRef.current = { x, y };
    
    updateContextSettings();
    
    context.beginPath();
    context.moveTo(x, y);
    
    dispatch(setIsDrawing(true));
  }, [dispatch, updateContextSettings]);

  const draw = useCallback((x: number, y: number) => {
    const context = contextRef.current;
    if (!context || !isDrawingRef.current || !lastPointRef.current) return;

    if (currentTool === 'pencil') {
      // Pencil tool - draw line from last point to current point
      context.beginPath();
      context.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      context.lineTo(x, y);
      context.stroke();
    } else {
      // Brush and eraser - smoother drawing
      context.lineTo(x, y);
      context.stroke();
    }
    
    lastPointRef.current = { x, y };
  }, [currentTool]);

  const stopDrawing = useCallback(() => {
    if (!isDrawingRef.current) return;
    
    isDrawingRef.current = false;
    lastPointRef.current = null;
    
    const canvas = canvasRef.current;
    if (canvas) {
      // Save canvas state to history
      const dataURL = canvas.toDataURL();
      dispatch(addToHistory(dataURL));
    }
    
    dispatch(setIsDrawing(false));
  }, [dispatch]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const dataURL = canvas.toDataURL();
    dispatch(addToHistory(dataURL));
  }, [dispatch]);

  const saveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'painting.png';
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  const loadFromHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || historyIndex < 0 || historyIndex >= canvasHistory.length) return;

    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = canvasHistory[historyIndex];
  }, [canvasHistory, historyIndex]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    updateContextSettings();
  }, [updateContextSettings]);

  useEffect(() => {
    loadFromHistory();
  }, [loadFromHistory]);

  return {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    saveCanvas
  };
};