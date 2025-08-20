/**
 * FUNÇÕES UTILITÁRIAS - FORMATADORES DE TEXTO
 * 
 * Funções para formatar valores numéricos em strings
 * legíveis para exibição na interface.
 */

// Formata o tamanho do pincel para exibição
export const formatBrushSize = (size: number): string => {
  return `${size}px`;
};

// Format opacity percentage
export const formatOpacity = (opacity: number): string => {
  return `${Math.round(opacity * 100)}%`;
};

// Format color hex value
export const formatColorHex = (color: string): string => {
  return color.toUpperCase();
};