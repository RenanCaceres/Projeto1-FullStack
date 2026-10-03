import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCasas } from './services/hogwartsService';
import Casa from './components/Casa';
import Quiz from './components/Quiz';

const Pagina = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
  text-align: center;
`;

const Secao = styled.section`
  margin-bottom: 48px;
  padding: 24px;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

const Aviso = styled.p`
  color: ${({ theme }) => theme.cores.textoSuave};
`;

function App() {
  const [casas, setCasas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarCasas = useCallback(() => {
    getCasas()
      .then((data) => setCasas(data))
      .catch((err) => {
        console.error(err);
        setErro('Não foi possível carregar as casas. Verifique sua conexão.');
      })
      .finally(() => setCarregando(false));
  }, []);

  // primeira busca: o estado inicial já é "carregando"
  useEffect(() => {
    buscarCasas();
  }, [buscarCasas]);

  function tentarDeNovo() {
    setCarregando(true);
    setErro(null);
    buscarCasas();
  }

  return (
    <Pagina>
      <header>
      </header>

      <Secao>
        <h1>Casas de Hogwarts</h1>

        {carregando && <Aviso>Carregando casas...</Aviso>}

        {erro && (
          <>
            <Aviso role="alert">{erro}</Aviso>
            <button onClick={tentarDeNovo}>Tentar de novo</button>
          </>
        )}

        {!carregando && !erro && casas.map((casa) => (
          <Casa key={casa.id} data={casa} />
        ))}
      </Secao>

      {/* o quiz só aparece depois que as casas carregarem */}
      {!carregando && !erro && (
        <Secao>
          <h1>Quiz</h1>
          <Quiz casas={casas} />
        </Secao>
      )}
    </Pagina>
  );
}

export default App;
