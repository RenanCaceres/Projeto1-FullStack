import styled, { useTheme } from 'styled-components';
import { getCasas } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import Casa from '../components/Casa';
import { Aviso, Descricao, Secao } from '../components/Layout';

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr; /* celular: uma coluna */
  }
`;

function PaginaCasas() {
  const tema = useTheme(); // acesso ao tema fora do CSS (para pegar a cor de cada casa)
  const { dados: casas, carregando, erro, tentarDeNovo } = useApi(getCasas);

  return (
    <Secao>
      <h2>As Casas</h2>
      <Descricao>
        Cada aluno de Hogwarts pertence a uma das quatro casas, com seus fundadores,
        diretores e qualidades.
      </Descricao>

      {carregando && <Aviso>Carregando casas...</Aviso>}

      {erro && (
        <>
          <Aviso>{erro}</Aviso>
          <button onClick={tentarDeNovo}>Tentar de novo</button>
        </>
      )}

      {casas && (
        <Grade>
          {casas.map(casa => (
            <Casa key={casa.id} casa={casa} cor={tema.casas[casa.name]} />
          ))}
        </Grade>
      )}
    </Secao>
  );
}

export default PaginaCasas;
