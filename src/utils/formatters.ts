/**
 * Formata o tamanho do pincel para exibição.
 * @param size - O tamanho numérico (ex: 5).
 * @returns A string formatada (ex: "5px").
 */
export const formatBrushSize = (size: number): string => `${size}px`;

/**
 * Formata a opacidade para exibição.
 * @param opacity - O valor da opacidade (ex: 0.85).
 * @returns A string formatada em porcentagem (ex: "85%").
 */
export const formatOpacity = (opacity: number): string => `${Math.round(opacity * 100)}%`;