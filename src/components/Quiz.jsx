import { useMemo, useReducer } from 'react';
import styled from 'styled-components';
import { perguntas } from '../data/perguntas';
import { aparecerSubindo } from '../styles/animacoes';
import Resultado from './Resultado';

const Contador = styled.p`
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
  height: 100%;
  width: ${({ $porcentagem }) => $porcentagem}%;
  background: ${({ theme }) => theme.cores.destaque};
  transition: width 0.5s;
`;

const Pergunta = styled.div`
  /* Animação feita com auxílio de IA (Claude) */
  animation: ${aparecerSubindo} 0.5s ease-out;
`;

const Opcoes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;
`;

const Opcao = styled.button`
  margin: 0;
  min-height: 72px;
  font-size: 1.05rem;
`;

const estadoInicial = {
  indice: 0,  // pergunta atual
  pontos: {}, // ex.: { Gryffindor: 3, Slytherin: 1 }
};

// recebe o estado atual e a ação, devolve o estado novo (sem alterar o antigo)
function quizReducer(estado, acao) {
  switch (acao.type) {
    case 'RESPONDER':
      return {
        indice: estado.indice + 1,
        pontos: {
          ...estado.pontos,
          [acao.casa]: (estado.pontos[acao.casa] || 0) + 1,
        },
      };
    case 'REINICIAR':
      return estadoInicial;
    default:
      return estado;
  }
}

function Quiz({ casas }) {
  const [estado, dispatch] = useReducer(quizReducer, estadoInicial);
  const { indice, pontos } = estado;
  const total = perguntas.length;

  // ordena as casas da maior pontuação para a menor e pega a primeira
  // useMemo: só recalcula quando os pontos mudam
  const vencedora = useMemo(
    () => Object.keys(pontos).sort((a, b) => pontos[b] - pontos[a])[0],
    [pontos]
  );

  if (indice >= total) {
    return (
      <Resultado
        vencedora={vencedora}
        casas={casas}
        pontos={pontos}
        total={total}
        onRefazer={() => dispatch({ type: 'REINICIAR' })}
      />
    );
  }

  const pergunta = perguntas[indice];

  return (
    <div>
      <Contador>Pergunta {indice + 1} de {total}</Contador>
      <Barra>
        <Preenchimento $porcentagem={(indice / total) * 100} />
      </Barra>

      {/* key muda a cada pergunta, então a animação de entrada roda de novo */}
      <Pergunta key={indice}>
        <h3>{pergunta.texto}</h3>
        <Opcoes>
          {pergunta.opcoes.map(opcao => (
            <Opcao
              key={opcao.texto}
              onClick={() => dispatch({ type: 'RESPONDER', casa: opcao.casa })}
            >
              {opcao.texto}
            </Opcao>
          ))}
        </Opcoes>
      </Pergunta>
    </div>
  );
}

export default Quiz;
