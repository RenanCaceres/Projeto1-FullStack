import styled from 'styled-components';

// usados no grimório de feitiços e no livro de poções

export const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap; /* no celular quebra em várias linhas */
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
`;

export const CampoBusca = styled.input`
  flex: 1 1 260px;
  max-width: 420px;
  padding: 10px 14px;
  font: inherit;
  color: ${({ theme }) => theme.cores.texto};
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

export const Selecao = styled.select`
  padding: 10px 14px;
  font: inherit;
  color: ${({ theme }) => theme.cores.texto};
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

export const Contagem = styled.p`
  margin: 0 0 20px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

// quantas colunas couberem, cada uma com pelo menos 260px
export const GradeCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  align-items: start;
  text-align: left;
`;

export const Card = styled.article`
  padding: 18px;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};

  h3 {
    margin: 8px 0 4px;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 8px;
  }
`;

export const BotaoMais = styled.button`
  margin-top: 24px;
`;
