import styled from 'styled-components';

// Peças de layout usadas por todas as páginas.

// caixa principal de cada página
export const Secao = styled.section`
  padding: 24px;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// texto curto abaixo do título da página
export const Descricao = styled.p`
  max-width: 600px;
  margin: -8px auto 24px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;
