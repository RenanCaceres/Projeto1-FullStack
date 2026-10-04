import { getCasas } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import Quiz from '../components/Quiz';
import { Aviso } from '../components/Controles';
import { Descricao, Secao } from '../components/Layout';

function PaginaQuiz() {
  // o resultado do quiz mostra os dados da casa vencedora, então espera as casas
  // (se a página de casas já foi aberta, a resposta vem do cache)
  const { dados: casas, carregando, erro, tentarDeNovo } = useApi(getCasas);

  return (
    <Secao>
      <h2>Quiz do Chapéu Seletor</h2>
      <Descricao>Responda com sinceridade. O Chapéu nunca erra.</Descricao>

      {carregando && <Aviso>Preparando o Chapéu Seletor...</Aviso>}

      {erro && (
        <>
          <Aviso role="alert">{erro}</Aviso>
          <button onClick={tentarDeNovo}>Tentar de novo</button>
        </>
      )}

      {casas && <Quiz casas={casas} />}
    </Secao>
  );
}

export default PaginaQuiz;
