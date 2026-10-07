import styled from 'styled-components';
import { paginas } from '../paginas/lista';

const Barra = styled.nav`
  position: sticky; /* fica presa no topo ao rolar */
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: ${({ theme }) => theme.cores.fundo};
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda};
`;

const Link = styled.a`
  padding: 8px 10px;
  font-family: ${({ theme }) => theme.fontes.titulo};
  font-weight: 700;
  text-decoration: none;
  color: ${({ $ativo, theme }) => ($ativo ? theme.cores.destaque : theme.cores.texto)};
`;

function Navegacao({ rota }) {
  return (
    <Barra>
      <Link href="#/" $ativo>
        Hogwarts
      </Link>

      <div>
        {paginas.map(p => (
          <Link key={p.caminho} href={`#/${p.caminho}`} $ativo={rota === p.caminho}>
            {p.titulo}
          </Link>
        ))}
      </div>
    </Barra>
  );
}

export default Navegacao;
