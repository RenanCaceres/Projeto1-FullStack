import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { aparecerSubindo } from '../styles/animacoes';

const Card = styled.article`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: left;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-top: 6px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};

  /* Animação feita com auxílio de IA (Claude) */
  /* os cards entram um depois do outro (efeito cascata) */
  /* "backwards" solta o transform no fim, senão o hover não conseguiria inclinar o card */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.lenta}
    ${({ theme }) => theme.animacao.curva} backwards;
  animation-delay: ${({ $indice }) => $indice * 0.15}s;
  transition:
    transform ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva},
    box-shadow ${({ theme }) => theme.animacao.normal};

  /* Animação feita com auxílio de IA (Claude) */
  /* reflexo de luz na cor da casa, parado fora do card até o hover */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 30%,
      ${({ $cor }) => $cor}40 45%,
      rgba(255, 255, 255, 0.12) 50%,
      transparent 65%
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
    pointer-events: none;
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* no hover o card sobe, inclina levemente e o reflexo atravessa */
  &:hover {
    transform: perspective(800px) translateY(-6px) rotateX(3deg) rotateY(-3deg);
    box-shadow: 0 12px 28px ${({ $cor }) => $cor}55;
  }

  &:hover::after {
    transform: translateX(100%);
  }

  h3 {
    margin-bottom: 4px;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
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
// indice: posição do card na grade, usada no atraso da animação de entrada
function Casa({ data, cor, indice = 0 }) {
  return (
    <Card $cor={cor} $indice={indice}>
      <h3>{data.name}</h3>
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

// Animação feita com auxílio de IA (Claude)
// faixa de luz que passa pelas linhas do esqueleto enquanto a API responde
const pulsar = keyframes`
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
`;

const CardEsqueleto = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-top: 6px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

const LinhaEsqueleto = styled.div`
  height: ${({ $altura = 14 }) => $altura}px;
  width: ${({ $largura }) => $largura}%;
  margin-bottom: 12px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.cores.borda} 25%,
    ${({ theme }) => theme.cores.superficie} 50%,
    ${({ theme }) => theme.cores.borda} 75%
  );
  background-size: 200% 100%;

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${pulsar} 1.6s linear infinite;
`;

// card "vazio" mostrado no lugar de cada casa enquanto ela carrega
export function CasaEsqueleto() {
  return (
    <CardEsqueleto aria-hidden="true">
      <LinhaEsqueleto $altura={24} $largura={60} />
      <LinhaEsqueleto $largura={40} />
      <LinhaEsqueleto $largura={90} />
      <LinhaEsqueleto $largura={80} />
      <LinhaEsqueleto $largura={85} />
      <LinhaEsqueleto $largura={70} />
    </CardEsqueleto>
  );
}

export default memo(Casa);
