import styled from 'styled-components';

// Peças de interface compartilhadas pelo grimório de feitiços e pelo livro de poções.

// linha com a busca e os filtros (quebra em várias linhas no celular)
export const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
`;

const estiloCampo = ({ theme }) => `
  font: inherit;
  padding: 10px 14px;
  color: ${theme.cores.texto};
  background: ${theme.cores.fundo};
  border: 1px solid ${theme.cores.borda};
  border-radius: ${theme.raio};
  transition: border-color ${theme.animacao.rapida};

  &:hover,
  &:focus {
    border-color: ${theme.cores.destaque};
  }
`;

export const CampoBusca = styled.input.attrs({ type: 'search' })`
  ${estiloCampo}
  flex: 1 1 260px;
  max-width: 420px;
`;

export const Selecao = styled.select`
  ${estiloCampo}
  flex: 0 1 220px;
  cursor: pointer;
`;

// botões de filtro em formato de "pílula"; $ativo marca o selecionado
export const Pilula = styled.button`
  margin: 0;
  padding: 6px 14px;
  font-size: 0.9rem;
  border-radius: 999px;
  border-color: ${({ $cor, theme }) => $cor ?? theme.cores.borda};
  background: ${({ $ativo, $cor, theme }) =>
    $ativo ? ($cor ?? theme.cores.destaque) : 'transparent'};
  color: ${({ $ativo, theme }) => ($ativo ? theme.cores.fundo : theme.cores.texto)};
`;

export const Contagem = styled.p`
  margin: 0 0 20px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

// grade de cards: quantas colunas couberem, com no mínimo 260px cada
export const GradeCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 16px;
  text-align: left;
`;

export const Aviso = styled.p`
  color: ${({ theme }) => theme.cores.textoSuave};
`;

export const BotaoMais = styled.button`
  margin-top: 24px;
  padding: 10px 28px;
`;
