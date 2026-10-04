import { useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { getCasas } from './services/hogwartsService';
import { aparecerSubindo } from './styles/animacoes';
import Casa, { CasaEsqueleto } from './components/Casa';
import Quiz from './components/Quiz';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';

// barra fixa no topo com atalhos para as seções
const Navegacao = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(15, 14, 23, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda};

  a {
    padding: 6px 14px;
    font-family: ${({ theme }) => theme.fontes.titulo};
    font-weight: 700;
    color: ${({ theme }) => theme.cores.texto};
    text-decoration: none;
    border-radius: ${({ theme }) => theme.raio};
    transition:
      color ${({ theme }) => theme.animacao.rapida},
      background ${({ theme }) => theme.animacao.rapida};

    &:hover {
      color: ${({ theme }) => theme.cores.destaque};
      background: ${({ theme }) => theme.cores.superficie};
    }
  }
`;

const Pagina = styled.main`
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

  @media (max-width: 480px) {
    padding: 16px;
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* a seção aparece conforme a página é rolada (só CSS, sem JavaScript) */
  /* navegadores sem suporte a animation-timeline mostram a seção normalmente */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${aparecerSubindo} linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }
  }
`;

// 2 colunas no computador (as 4 casas ficam em 2×2), 1 no celular
const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
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
    <>
      <Navegacao aria-label="Seções da página">
        <a href="#casas">Casas</a>
        <a href="#quiz">Quiz</a>
      </Navegacao>

      <Pagina id="topo">
        <Cabecalho />

        <Secao id="casas">
          <h2>As Casas</h2>

          {/* enquanto a API responde, mostra 4 cards "vazios" pulsando */}
          {carregando && (
            <Grade role="status" aria-label="Carregando casas">
              {[0, 1, 2, 3].map((n) => (
                <CasaEsqueleto key={n} />
              ))}
            </Grade>
          )}

          {erro && (
            <>
              <Aviso role="alert">{erro}</Aviso>
              <button onClick={tentarDeNovo}>Tentar de novo</button>
            </>
          )}

          {!carregando && !erro && (
            <Grade>
              {casas.map((casa, i) => (
                <Casa
                  key={casa.id}
                  data={casa}
                  cor={tema.casas[casa.name] ?? tema.cores.destaque}
                  indice={i}
                />
              ))}
            </Grade>
          )}
        </Secao>

        {/* o quiz só aparece depois que as casas carregarem */}
        {!carregando && !erro && (
          <Secao id="quiz">
            <h2>Quiz</h2>
            <Quiz casas={casas} />
          </Secao>
        )}
      </Pagina>

      <Rodape />
    </>
  );
}

export default App;
