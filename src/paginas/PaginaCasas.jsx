import styled, { useTheme } from 'styled-components';
import { getCasas } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import Casa, { CasaEsqueleto } from '../components/Casa';
import { Aviso } from '../components/Controles';
import { Descricao, Secao } from '../components/Layout';

// 2 colunas no computador (as 4 casas ficam em 2×2), 1 no celular
const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

function PaginaCasas() {
  const tema = useTheme();
  // carregamento, erro e "tentar de novo" ficam no hook useApi
  const { dados: casas, carregando, erro, tentarDeNovo } = useApi(getCasas);

  return (
    <Secao>
      <h2>As Casas</h2>
      <Descricao>
        Cada aluno de Hogwarts pertence a uma das quatro casas, com seus fundadores,
        diretores e qualidades.
      </Descricao>

      {/* enquanto a API responde, mostra 4 cards "vazios" pulsando */}
      {carregando && (
        <Grade role="status" aria-label="Carregando casas">
          {[0, 1, 2, 3].map((n) => (
            <CasaEsqueleto key={n} />
          ))}
        </Grade>
      )}

      {erro && (
        <>
          <Aviso role="alert">{erro}</Aviso>
          <button onClick={tentarDeNovo}>Tentar de novo</button>
        </>
      )}

      {casas && (
        <Grade>
          {casas.map((casa, i) => (
            <Casa
              key={casa.id}
              data={casa}
              cor={tema.casas[casa.name] ?? tema.cores.destaque}
              indice={i}
            />
          ))}
        </Grade>
      )}
    </Secao>
  );
}

export default PaginaCasas;
