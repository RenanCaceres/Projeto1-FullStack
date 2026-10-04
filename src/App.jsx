import { useEffect } from 'react';
import styled from 'styled-components';
import { useRota } from './hooks/useRota';
import { getCasas } from './services/hogwartsService';
import { aparecerSubindo } from './styles/animacoes';
import { paginas } from './paginas/lista';
import Navegacao from './components/Navegacao';
import Rodape from './components/Rodape';
import Inicio from './paginas/Inicio';
import PaginaCasas from './paginas/PaginaCasas';
import PaginaQuiz from './paginas/PaginaQuiz';
import PaginaFeiticos from './paginas/PaginaFeiticos';
import PaginaPocoes from './paginas/PaginaPocoes';

// qual componente mostrar em cada endereço; qualquer outro cai na página inicial
const componentes = {
  casas: PaginaCasas,
  quiz: PaginaQuiz,
  feiticos: PaginaFeiticos,
  pocoes: PaginaPocoes,
};

// min-height empurra o rodapé para baixo mesmo em páginas curtas
const Pagina = styled.main`
  max-width: 1100px;
  min-height: calc(100vh - 220px);
  margin: 0 auto;
  padding: 32px 16px 48px;
  text-align: center;

  /* Animação feita com auxílio de IA (Claude) */
  /* key={rota} recria o <main> a cada troca de página, então ela entra subindo */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.normal}
    ${({ theme }) => theme.animacao.curva} both;
`;

function App() {
  const rota = useRota();
  const PaginaAtual = componentes[rota] ?? Inicio;
  const titulo = paginas.find(p => p.caminho === rota)?.titulo;

  // já começa a buscar as casas ao abrir o site: quando a pessoa entrar em
  // Casas ou no Quiz, a resposta provavelmente já está no cache do serviço
  // (se falhar aqui, a própria página mostra o erro e o "Tentar de novo")
  useEffect(() => {
    getCasas().catch(() => {});
  }, []);

  // título da aba do navegador acompanha a página
  useEffect(() => {
    document.title = titulo ? `${titulo} · Casas de Hogwarts` : 'Casas de Hogwarts';
  }, [titulo]);

  return (
    <>
      <Navegacao rota={rota} />

      <Pagina key={rota}>
        <PaginaAtual />
      </Pagina>

      <Rodape />
    </>
  );
}

export default App;
