import { useMemo, useReducer } from 'react';
import styled, { keyframes } from 'styled-components';
import { perguntas } from '../data/perguntas';
import { embaralhar } from '../utils/embaralhar';
import Resultado from './Resultado';

// Animação feita com auxílio de IA (Claude)
// a pergunta nova entra deslizando da direita
const entrarDeslizando = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Animação feita com auxílio de IA (Claude)
// brilho que corre da esquerda para a direita na barra de progresso
const correrBrilho = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const Contador = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Barra = styled.div`
  max-width: 640px;
  height: 10px;
  margin: 0 auto 32px;
  background: ${({ theme }) => theme.cores.borda};
  border-radius: 999px;
  overflow: hidden;
`;

const Preenchimento = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: ${({ $porcentagem }) => $porcentagem}%;
  background: linear-gradient(90deg, #b8912a, ${({ theme }) => theme.cores.destaque});
  border-radius: 999px;

  /* Animação feita com auxílio de IA (Claude) */
  /* a barra cresce suavemente e um reflexo passa por ela sem parar */
  transition: width ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${correrBrilho} 1.8s ease-in-out infinite;
  }
`;

// key={indice} recria este bloco a cada pergunta, então a animação roda de novo
const Pergunta = styled.div`
  /* Animação feita com auxílio de IA (Claude) */
  animation: ${entrarDeslizando} ${({ theme }) => theme.animacao.normal}
    ${({ theme }) => theme.animacao.curva} both;

  h3 {
    margin-bottom: 24px;
    font-size: clamp(1.15rem, 3vw, 1.4rem);
  }
`;

// 2 colunas no computador, 1 no celular
const Opcoes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Opcao = styled.button`
  margin: 0;
  min-height: 72px;
  padding: 16px 20px;
  font-size: 1.05rem;
  background: ${({ theme }) => theme.cores.fundo};
  border-color: ${({ theme }) => theme.cores.borda};

  /* Animação feita com auxílio de IA (Claude) */
  /* no hover a opção sobe um pouco e ganha borda e brilho dourados */
  transition:
    transform ${({ theme }) => theme.animacao.rapida},
    border-color ${({ theme }) => theme.animacao.rapida},
    box-shadow ${({ theme }) => theme.animacao.rapida},
    background ${({ theme }) => theme.animacao.rapida};

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.cores.superficie};
    color: ${({ theme }) => theme.cores.texto};
    border-color: ${({ theme }) => theme.cores.destaque};
    box-shadow: 0 6px 18px rgba(212, 175, 55, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;

// todas as casas que aparecem nas opções do quiz
const nomesCasas = [...new Set(perguntas.flatMap(p => p.opcoes.map(o => o.casa)))];

// embaralha as opções de cada pergunta e sorteia a ordem de desempate
function criarEstado() {
  return {
    indice: 0,   // pergunta atual
    pontos: {},  // ex: { Gryffindor: 2, Slytherin: 1 }
    perguntas: perguntas.map(p => ({ ...p, opcoes: embaralhar(p.opcoes) })),
    desempate: embaralhar(nomesCasas),
  };
}

function quizReducer(estado, acao) {
  switch (acao.type) {
    case 'RESPONDER':
      return {
        ...estado,
        indice: estado.indice + 1,
        pontos: {
          ...estado.pontos,
          [acao.casa]: (estado.pontos[acao.casa] || 0) + 1,
        },
      };
    case 'REINICIAR':
      return acao.novoEstado;
    default:
      return estado;
  }
}

function Quiz({ casas }) {
  const [estado, dispatch] = useReducer(quizReducer, undefined, criarEstado);
  const { indice, pontos, desempate } = estado;
  const total = estado.perguntas.length;

  function responder(nomeCasa) {
    dispatch({ type: 'RESPONDER', casa: nomeCasa });
  }

  function reiniciar() {
    // o sorteio fica fora do reducer para ele continuar puro
    dispatch({ type: 'REINICIAR', novoEstado: criarEstado() });
  }

  // só recalcula quando a pontuação muda
  // empate: vence a casa que vem primeiro na ordem sorteada em "desempate"
  const vencedora = useMemo(() => {
    const nomes = Object.keys(pontos);
    if (nomes.length === 0) return null;
    const maior = Math.max(...nomes.map(nome => pontos[nome]));
    return desempate.find(nome => pontos[nome] === maior);
  }, [pontos, desempate]);

  // acabaram as perguntas: mostra o resultado
  if (indice >= total) {
    return (
      <Resultado
        vencedora={vencedora}
        casa={casas.find(c => c.name === vencedora)}
        pontos={pontos}
        ordem={desempate}
        total={total}
        onRefazer={reiniciar}
      />
    );
  }

  // ainda tem pergunta: mostra a atual
  const pergunta = estado.perguntas[indice];

  return (
    <div>
      <Contador>Pergunta {indice + 1} de {total}</Contador>
      <Barra
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={indice}
      >
        <Preenchimento $porcentagem={(indice / total) * 100} />
      </Barra>

      <Pergunta key={indice}>
        <h3>{pergunta.texto}</h3>
        <Opcoes>
          {pergunta.opcoes.map(opcao => (
            <Opcao key={opcao.texto} onClick={() => responder(opcao.casa)}>
              {opcao.texto}
            </Opcao>
          ))}
        </Opcoes>
      </Pergunta>
    </div>
  );
}

export default Quiz;
