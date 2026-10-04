import styled from 'styled-components';
import Cabecalho from '../components/Cabecalho';
import { aparecerSubindo, flutuar } from '../styles/animacoes';
import { paginas } from './lista';

// 2×2 no computador, 1 coluna no celular
const Portais = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Icone = styled.span`
  font-size: 2.6rem;
  line-height: 1;
`;

const Portal = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 24px;
  color: ${({ theme }) => theme.cores.texto};
  text-decoration: none;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};

  /* Animação feita com auxílio de IA (Claude) */
  /* portais entram em cascata; no hover sobem, ganham borda dourada e o ícone flutua */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.lenta}
    ${({ theme }) => theme.animacao.curva} backwards;
  animation-delay: ${({ $indice }) => 0.5 + $indice * 0.12}s;
  transition:
    transform ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva},
    border-color ${({ theme }) => theme.animacao.normal},
    box-shadow ${({ theme }) => theme.animacao.normal};

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.cores.destaque};
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
  }

  &:hover ${Icone} {
    animation: ${flutuar} 1.5s ease-in-out infinite;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.cores.textoSuave};
  }
`;

const Entrar = styled.strong`
  margin-top: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.destaque};
`;

function Inicio() {
  return (
    <>
      <Cabecalho />
      <Portais aria-label="Áreas do site">
        {paginas.map((p, i) => (
          <Portal key={p.caminho} href={`#/${p.caminho}`} $indice={i}>
            <Icone aria-hidden="true">{p.icone}</Icone>
            <h2>{p.titulo}</h2>
            <p>{p.descricao}</p>
            <Entrar>Entrar →</Entrar>
          </Portal>
        ))}
      </Portais>
    </>
  );
}

export default Inicio;
