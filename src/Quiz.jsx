import { useState } from 'react';
import { perguntas } from './perguntas';

function Quiz({ casas }) {
  const [indice, setIndice] = useState(0);   // pergunta atual
  const [pontos, setPontos] = useState({});  // ex: { Gryffindor: 2, Slytherin: 1 }

  function responder(nomeCasa) {
    setPontos({ ...pontos, [nomeCasa]: (pontos[nomeCasa] || 0) + 1 });
    setIndice(indice + 1);
  }

  function reiniciar() {
    setIndice(0);
    setPontos({});
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