import styled from 'styled-components';
import { useRota } from './hooks/useRota';
import { aparecerSubindo } from './styles/animacoes';
import Navegacao from './components/Navegacao';
import Rodape from './components/Rodape';
import Inicio from './paginas/Inicio';
import PaginaCasas from './paginas/PaginaCasas';
import PaginaQuiz from './paginas/PaginaQuiz';
import PaginaFeiticos from './paginas/PaginaFeiticos';
import PaginaPocoes from './paginas/PaginaPocoes';

const paginasPorRota = {
  casas: PaginaCasas,
  quiz: PaginaQuiz,
  feiticos: PaginaFeiticos,
  pocoes: PaginaPocoes,
};

const Conteudo = styled.main`
  max-width: 1100px;
  min-height: calc(100vh - 160px); /* empurra o rodapé para baixo em páginas curtas */
  margin: 0 auto;
  padding: 32px 16px 48px;
  text-align: center;

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${aparecerSubindo} 0.5s ease-out;
`;

function App() {
  const rota = useRota();
  const PaginaAtual = paginasPorRota[rota] ?? Inicio; // rota desconhecida cai no início

  return (
    <>
      <Navegacao rota={rota} />

      {/* key muda a cada página, então o React recria o <main> e a animação roda de novo */}
      <Conteudo key={rota}>
        <PaginaAtual />
      </Conteudo>

      <Rodape />
    </>
  );
}

export default App;
