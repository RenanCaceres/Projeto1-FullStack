import { memo } from 'react';
import styled from 'styled-components';
import { qualidades, traduzir, nomesDePessoas } from '../utils/traducoes';

const Card = styled.article`
  padding: 20px;
  text-align: left;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-top: 6px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-6px);
  }
`;

// <dl> = lista de "título: valor"
const Infos = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 12px;

  dt {
    color: ${({ theme }) => theme.cores.destaque};
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
`;

// também usadas no resultado do quiz
export const Etiquetas = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  list-style: none;
`;

export const Etiqueta = styled.li`
  padding: 2px 10px;
  font-size: 0.8rem;
  border: 1px solid ${({ $cor }) => $cor};
  border-radius: 999px;
`;

function Casa({ casa, cor }) {
  return (
    <Card $cor={cor}>
      <h3>{casa.name}</h3>

      <Infos>
        <dt>Cores</dt>
        <dd>{casa.houseColours}</dd>
        <dt>Fundador</dt>
        <dd>{casa.founder}</dd>
        <dt>Animal</dt>
        <dd>{casa.animal}</dd>
        <dt>Elemento</dt>
        <dd>{casa.element}</dd>
        <dt>Fantasma</dt>
        <dd>{casa.ghost}</dd>
        <dt>Salão comunal</dt>
        <dd>{casa.commonRoom}</dd>
        <dt>Diretores</dt>
        <dd>{nomesDePessoas(casa.heads)}</dd>
      </Infos>

      <Etiquetas>
        {casa.traits.map(t => (
          <Etiqueta key={t.id} $cor={cor}>
            {traduzir(qualidades, t.name)}
          </Etiqueta>
        ))}
      </Etiquetas>
    </Card>
  );
}

// memo: só redesenha o card se as props mudarem
export default memo(Casa);
