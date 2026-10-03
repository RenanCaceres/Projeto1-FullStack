import { useReducer } from 'react';
import { perguntas } from '../data/perguntas';

const estadoInicial = {
  indice: 0,   // pergunta atual
  pontos: {},  // ex: { Gryffindor: 2, Slytherin: 1 }
};

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
  const [{ indice, pontos }, dispatch] = useReducer(quizReducer, estadoInicial);

  function responder(nomeCasa) {
    dispatch({ type: 'RESPONDER', casa: nomeCasa });
  }

  function reiniciar() {
    dispatch({ type: 'REINICIAR' });
  }

  // acabaram as perguntas: mostra o resultado
  if (indice >= perguntas.length) {
    const vencedora = Object.keys(pontos).reduce((a, b) =>
      pontos[a] >= pontos[b] ? a : b
    );
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
  const pergunta = perguntas[indice];

  return (
    <div>
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