import { useCallback, useEffect, useState } from 'react';

// Hook próprio: busca dados com uma função do serviço e controla
// carregamento, erro e "tentar de novo".
// Uso: const { dados, carregando, erro, tentarDeNovo } = useApi(getFeiticos);
export function useApi(buscarDados) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    // ignora a resposta se o componente sair da tela antes dela chegar
    let ativo = true;

    buscarDados()
      .then((resposta) => {
        if (ativo) setDados(resposta);
      })
      .catch((err) => {
        console.error(err);
        if (ativo) setErro('Não foi possível carregar os dados. Verifique sua conexão.');
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [buscarDados, tentativa]);

  // mudar "tentativa" faz o useEffect rodar de novo
  const tentarDeNovo = useCallback(() => {
    setCarregando(true);
    setErro(null);
    setTentativa((n) => n + 1);
  }, []);

  return { dados, carregando, erro, tentarDeNovo };
}
