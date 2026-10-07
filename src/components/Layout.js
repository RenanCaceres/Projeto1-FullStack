import styled from 'styled-components';

// caixa em volta do conteúdo de cada página
export const Secao = styled.section`
  padding: 24px;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

export const Descricao = styled.p`
  max-width: 600px;
  margin: 0 auto 24px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

export const Aviso = styled.p`
  color: ${({ theme }) => theme.cores.textoSuave};
`;
