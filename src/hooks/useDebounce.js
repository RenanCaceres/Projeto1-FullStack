import { useEffect, useState } from 'react';

// só devolve o valor novo depois que a pessoa para de digitar por "espera" ms
export function useDebounce(valor, espera = 300) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), espera);
    return () => clearTimeout(timer); // digitou de novo antes do tempo: cancela o anterior
  }, [valor, espera]);

  return valorAtrasado;
}
