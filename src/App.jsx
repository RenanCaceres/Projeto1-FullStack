import { useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { getCasas } from './services/hogwartsService';
import Casa from './components/Casa';
import Quiz from './components/Quiz';
import Cabecalho from './components/Cabecalho';

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

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
  gap: 20px;
`;

const Aviso = styled.p`
  color: ${({ theme }) => theme.cores.textoSuave};
`;

function App() {
  const tema = useTheme();
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
      <Cabecalho />

      <Secao>
        <h2>As Casas</h2>

        {carregando && <Aviso>Carregando casas...</Aviso>}

        {erro && (
          <>
            <Aviso role="alert">{erro}</Aviso>
            <button onClick={tentarDeNovo}>Tentar de novo</button>
          </>
        )}

        {!carregando && !erro && (
          <Grade>
            {casas.map((casa) => (
              <Casa
                key={casa.id}
                data={casa}
                cor={tema.casas[casa.name] ?? tema.cores.destaque}
              />
            ))}
          </Grade>
        )}
      </Secao>

      {/* o quiz só aparece depois que as casas carregarem */}
      {!carregando && !erro && (
        <Secao>
          <h2>Quiz</h2>
          <Quiz casas={casas} />
        </Secao>
      )}
    </Pagina>
  );
}

export default App;
