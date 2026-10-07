import styled from 'styled-components';
import Cabecalho from '../components/Cabecalho';
import { paginas } from './lista';

const Atalhos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const Atalho = styled.a`
  padding: 28px 24px;
  color: ${({ theme }) => theme.cores.texto};
  text-decoration: none;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
  transition: transform 0.3s, border-color 0.3s;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.cores.destaque};
  }

  span {
    font-size: 2.6rem;
  }

  p {
    color: ${({ theme }) => theme.cores.textoSuave};
  }
`;

function Inicio() {
  return (
    <>
      <Cabecalho />
      <Atalhos>
        {paginas.map(p => (
          <Atalho key={p.caminho} href={`#/${p.caminho}`}>
            <span>{p.icone}</span>
            <h2>{p.titulo}</h2>
            <p>{p.descricao}</p>
          </Atalho>
        ))}
      </Atalhos>
    </>
  );
}

export default Inicio;
