import styled from 'styled-components';

const Container = styled.footer`
  padding: 32px 16px;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
  border-top: 1px solid ${({ theme }) => theme.cores.borda};
  background: rgba(15, 14, 23, 0.7);

  p {
    margin: 4px 0;
  }

  a {
    color: ${({ theme }) => theme.cores.destaque};
  }
`;

// botão com cara de link, igual aos outros links do rodapé
const BotaoTopo = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  font-size: inherit;
  color: ${({ theme }) => theme.cores.destaque};
  text-decoration: underline;

  &:hover {
    background: none;
    color: ${({ theme }) => theme.cores.texto};
  }
`;

function Rodape() {
  return (
    <Container>
      <p>
        Dados:{' '}
        <a href="https://wizard-world-api.herokuapp.com/swagger/index.html" target="_blank" rel="noreferrer">
          Wizard World API
        </a>
      </p>
      <p>Feito por Pedro Lucas e Renan Cáceres</p>
      <p>
        {/* botão em vez de link "#topo": o "#" do endereço agora indica a página */}
        <BotaoTopo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Voltar ao topo ↑
        </BotaoTopo>
      </p>
    </Container>
  );
}

export default Rodape;
