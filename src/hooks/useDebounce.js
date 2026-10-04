import { useEffect, useState } from 'react';

// Hook próprio: devolve o valor só depois que ele parar de mudar por "espera" ms.
// Na busca, evita filtrar a lista inteira a cada tecla digitada.
export function useDebounce(valor, espera = 300) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), espera);
    return () => clearTimeout(timer); // digitou de novo: cancela e recomeça a contagem
  }, [valor, espera]);

  return valorAtrasado;
}
