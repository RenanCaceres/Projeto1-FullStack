import { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

const Destaque = styled.div`
  margin: 0 auto 32px;
  max-width: 520px;
  padding: 24px;
  background: ${({ $cor }) => $cor}22;
  border: 2px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};
  box-shadow: 0 0 24px ${({ $cor }) => $cor}66;

  p {
    margin: 4px 0;
  }
`;

const Subtitulo = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Placar = styled.ul`
  max-width: 520px;
  margin: 0 auto 24px;
  padding: 0;
  list-style: none;
  text-align: left;
`;

const Linha = styled.li`
  margin-bottom: 12px;
  font-weight: ${({ $vencedora }) => ($vencedora ? 700 : 400)};
`;

const Rotulo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Barra = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.cores.borda};
  border-radius: 999px;
  overflow: hidden;
`;

const Preenchimento = styled.div`
  height: 100%;
  width: ${({ $porcentagem }) => $porcentagem}%;
  background: ${({ $cor }) => $cor};
  transition: width 0.5s;
`;

const BotaoRefazer = styled.button`
  padding: 12px 32px;
  font-family: ${({ theme }) => theme.fontes.titulo};
  font-weight: 700;
  background: ${({ theme }) => theme.cores.destaque};
  color: ${({ theme }) => theme.cores.fundo};

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.cores.destaque};
  }
`;

// tela final do quiz: casa vencedora em destaque e placar de todas as casas
function Resultado({ vencedora, casa, pontos, ordem, total, onRefazer }) {
  const tema = useTheme();
  const cor = tema.casas[vencedora] ?? tema.cores.destaque;

  // maior pontuação primeiro; empate segue a ordem de desempate do quiz
  const placar = useMemo(
    () =>
      ordem
        .map(nome => ({ nome, pontos: pontos[nome] || 0 }))
        .sort((a, b) => b.pontos - a.pontos),
    [ordem, pontos]
  );

  return (
    <div>
      <Destaque $cor={cor}>
        <Subtitulo>O Chapéu Seletor decidiu...</Subtitulo>
        <h2>Você é da {vencedora}!</h2>
        {casa && (
          <>
            <p>Fundador: {casa.founder}</p>
            <p>Animal: {casa.animal}</p>
          </>
        )}
      </Destaque>

      <h3>Placar</h3>
      <Placar>
        {placar.map(item => (
          <Linha key={item.nome} $vencedora={item.nome === vencedora}>
            <Rotulo>
              <span>{item.nome}</span>
              <span>{item.pontos} de {total}</span>
            </Rotulo>
            <Barra>
              <Preenchimento
                $cor={tema.casas[item.nome] ?? tema.cores.destaque}
                $porcentagem={(item.pontos / total) * 100}
              />
            </Barra>
          </Linha>
        ))}
      </Placar>

      <BotaoRefazer onClick={onRefazer}>Refazer</BotaoRefazer>
    </div>
  );
}

export default Resultado;
