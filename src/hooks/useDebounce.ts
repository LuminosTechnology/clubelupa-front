import { useState, useEffect } from "react";

// O nosso Custom Hook que recebe um valor e um tempo de atraso (delay)
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para guardar o valor "debounceado"
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um temporizador que só irá atualizar o 'debouncedValue'
    // depois que o 'delay' especificado passar sem que o 'value' mude.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Esta é a parte mágica: a função de limpeza do useEffect.
    // Se o 'value' mudar (o usuário digitar outra letra), o temporizador
    // antigo é limpo, e um novo é criado.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // O efeito só é re-executado se o valor ou o delay mudarem

  return debouncedValue;
}
