import { useEffect, useState } from 'react';

// recebe uma função do service, ex.: useApi(getCasas)
export function useApi(buscarDados) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  // roda quando o componente aparece e a cada nova tentativa
  useEffect(() => {
    buscarDados()
      .then((resposta) => setDados(resposta))
      .catch(() => setErro('Não foi possível carregar os dados. Verifique sua conexão.'))
      .finally(() => setCarregando(false));
  }, [buscarDados, tentativa]);

  function tentarDeNovo() {
    setCarregando(true);
    setErro(null);
    setTentativa(tentativa + 1); // muda a dependência do useEffect, então ele roda de novo
  }

  return { dados, carregando, erro, tentarDeNovo };
}
