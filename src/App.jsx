import styled, { useTheme } from 'styled-components';
import { getCasas } from './services/hogwartsService';
import { useApi } from './hooks/useApi';
import { aparecerSubindo } from './styles/animacoes';
import Casa, { CasaEsqueleto } from './components/Casa';
import Quiz from './components/Quiz';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Feiticos from './components/Feiticos';
import Pocoes from './components/Pocoes';

// barra fixa no topo com atalhos para as seções
const Navegacao = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
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

  /* no celular os 4 links precisam caber numa linha só */
  @media (max-width: 480px) {
    gap: 0;
    padding: 8px 4px;

    a {
      padding: 6px 8px;
      font-size: 0.9rem;
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

const Descricao = styled.p`
  max-width: 600px;
  margin: -8px auto 24px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Aviso = styled.p`
  color: ${({ theme }) => theme.cores.textoSuave};
`;

function App() {
  const tema = useTheme();
  // carregamento, erro e "tentar de novo" ficam no hook useApi
  const { dados, carregando, erro, tentarDeNovo } = useApi(getCasas);
  const casas = dados ?? [];

  return (
    <>
      <Navegacao aria-label="Seções da página">
        <a href="#casas">Casas</a>
        <a href="#quiz">Quiz</a>
        <a href="#feiticos">Feitiços</a>
        <a href="#pocoes">Poções</a>
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

        {/* feitiços e poções buscam os próprios dados, independentes das casas */}
        <Secao id="feiticos">
          <h2>Grimório de Feitiços</h2>
          <Descricao>
            Todos os feitiços da Wizard World API. Cada card brilha na cor da luz do feitiço.
          </Descricao>
          <Feiticos />
        </Secao>

        <Secao id="pocoes">
          <h2>Livro de Poções</h2>
          <Descricao>
            Poções e elixires com ingredientes, inventores e efeitos colaterais.
          </Descricao>
          <Pocoes />
        </Secao>
      </Pagina>

      <Rodape />
    </>
  );
}

export default App;
