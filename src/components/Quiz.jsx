import { useMemo, useReducer } from 'react';
import styled from 'styled-components';
import { perguntas } from '../data/perguntas';
import { embaralhar } from '../utils/embaralhar';

const Contador = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Barra = styled.div`
  height: 8px;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.cores.borda};
  border-radius: 999px;
  overflow: hidden;
`;

const Preenchimento = styled.div`
  height: 100%;
  width: ${({ $porcentagem }) => $porcentagem}%;
  background: ${({ theme }) => theme.cores.destaque};
  transition: width 0.3s;
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
    const casa = casas.find(c => c.name === vencedora);

    return (
      <div>
        <h2>Você é da {vencedora}!</h2>
        {casa && <p>Fundador: {casa.founder} - Animal: {casa.animal}</p>}
        <button onClick={reiniciar}>Refazer</button>
      </div>
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

      <h2>{pergunta.texto}</h2>
      {pergunta.opcoes.map(opcao => (
        <button key={opcao.texto} onClick={() => responder(opcao.casa)}>
          {opcao.texto}
        </button>
      ))}
    </div>
  );
}

export default Quiz;
