import styled from 'styled-components';
import { paginas } from '../paginas/lista';

// barra fixa no topo: marca do site à esquerda e as páginas à direita
const Barra = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(15, 14, 23, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda};
`;

const Conteudo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 8px 16px;

  @media (max-width: 480px) {
    padding: 6px 8px;
    gap: 4px;
  }
`;

const Marca = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fontes.titulo};
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.cores.destaque};
  text-decoration: none;

  img {
    width: 28px;
    height: 28px;
  }

  /* no celular fica só o brasão, para os links caberem */
  @media (max-width: 600px) {
    span {
      display: none;
    }
  }
`;

const Links = styled.ul`
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Link = styled.a`
  position: relative;
  display: block;
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.fontes.titulo};
  font-weight: 700;
  color: ${({ theme }) => theme.cores.texto};
  text-decoration: none;
  transition: color ${({ theme }) => theme.animacao.rapida};

  &:hover,
  &[aria-current='page'] {
    color: ${({ theme }) => theme.cores.destaque};
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* linha dourada embaixo da página atual, que cresce a partir do centro */
  &::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 2px;
    height: 2px;
    background: ${({ theme }) => theme.cores.destaque};
    box-shadow: 0 0 8px ${({ theme }) => theme.cores.destaque};
    transform: scaleX(0);
    transition: transform ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva};
  }

  &[aria-current='page']::after {
    transform: scaleX(1);
  }

  @media (max-width: 480px) {
    padding: 8px 7px;
    font-size: 0.85rem;

    &::after {
      left: 7px;
      right: 7px;
    }
  }
`;

function Navegacao({ rota }) {
  return (
    <Barra aria-label="Páginas do site">
      <Conteudo>
        <Marca href="#/" aria-label="Início">
          <img src="/favicon.svg" alt="" />
          <span>Hogwarts</span>
        </Marca>

        <Links>
          {paginas.map(p => (
            <li key={p.caminho}>
              <Link
                href={`#/${p.caminho}`}
                aria-current={rota === p.caminho ? 'page' : undefined}
              >
                {p.titulo}
              </Link>
            </li>
          ))}
        </Links>
      </Conteudo>
    </Barra>
  );
}

export default Navegacao;
