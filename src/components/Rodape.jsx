import styled from 'styled-components';

const Container = styled.footer`
  padding: 32px 16px;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
  border-top: 1px solid ${({ theme }) => theme.cores.borda};

  p {
    margin: 4px 0;
  }

  a {
    color: ${({ theme }) => theme.cores.destaque};
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
    </Container>
  );
}

export default Rodape;
