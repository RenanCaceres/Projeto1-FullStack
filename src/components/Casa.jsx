import { memo } from 'react';
import styled from 'styled-components';

const Card = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: left;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-top: 6px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px ${({ $cor }) => $cor}55;
  }

  h2 {
    margin-bottom: 4px;
  }
`;

const Cores = styled.p`
  margin: 0 0 16px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Infos = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 12px;
  margin: 0;

  dt {
    color: ${({ theme }) => theme.cores.destaque};
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
`;

// memo: só re-renderiza se os dados da casa mudarem
function Casa({ data, cor }) {
  return (
    <Card $cor={cor}>
      <h2>{data.name}</h2>
      <Cores>{data.houseColours}</Cores>

      <Infos>
        <dt>Fundador</dt>
        <dd>{data.founder}</dd>
        <dt>Animal</dt>
        <dd>{data.animal}</dd>
        <dt>Elemento</dt>
        <dd>{data.element}</dd>
        <dt>Fantasma</dt>
        <dd>{data.ghost}</dd>
        <dt>Salão comunal</dt>
        <dd>{data.commonRoom}</dd>
      </Infos>
    </Card>
  );
}

export default memo(Casa);
