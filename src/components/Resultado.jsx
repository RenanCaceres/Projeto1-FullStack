import { useEffect, useMemo, useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { aparecerSubindo, brilhoPulsante, flutuar } from '../styles/animacoes';

// tempo de suspense antes de revelar a casa (em ms)
const TEMPO_SUSPENSE = 2000;

// Animação feita com auxílio de IA (Claude)
// posição final de cada faísca: espalhadas em círculo, a distâncias diferentes
const FAISCAS = Array.from({ length: 16 }, (_, i) => {
  const angulo = (i / 16) * 2 * Math.PI;
  const distancia = 110 + (i % 3) * 35;
  return {
    x: Math.round(Math.cos(angulo) * distancia),
    y: Math.round(Math.sin(angulo) * distancia),
    atraso: (i % 4) * 0.06,
  };
});

// Animação feita com auxílio de IA (Claude)
// a casa vencedora cresce, passa um pouco do tamanho e volta ao normal
const revelar = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  70% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animação feita com auxílio de IA (Claude)
// faísca sai do centro até a posição (--x, --y) e some
const explodir = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0.2);
  }
`;

// Animação feita com auxílio de IA (Claude)
// barra do placar cresce do zero até a pontuação
const crescer = keyframes`
  from {
    width: 0;
  }
`;

// Animação feita com auxílio de IA (Claude)
// pontinhos de "pensando..." acendendo um de cada vez
const piscarPonto = keyframes`
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

const Pensando = styled.div`
  padding: 32px 0;

  p {
    margin: 16px 0 0;
    font-family: ${({ theme }) => theme.fontes.titulo};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.cores.destaque};
  }
`;

const Chapeu = styled.div`
  font-size: 4rem;
  line-height: 1;

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${flutuar} 1.5s ease-in-out infinite;
`;

const Ponto = styled.span`
  /* Animação feita com auxílio de IA (Claude) */
  animation: ${piscarPonto} 1.2s infinite;
  animation-delay: ${({ $atraso }) => $atraso}s;
`;

const Destaque = styled.div`
  position: relative;
  margin: 0 auto 32px;
  max-width: 520px;
  padding: 24px;
  background: ${({ $cor }) => $cor}22;
  border: 2px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};

  /* Animação feita com auxílio de IA (Claude) */
  /* revela a casa e depois deixa um brilho pulsando na cor dela (--cor-brilho) */
  animation:
    ${revelar} 0.8s ${({ theme }) => theme.animacao.curva} both,
    ${brilhoPulsante} 2.5s ease-in-out 0.8s infinite;

  p {
    margin: 4px 0;
  }
`;

const Faiscas = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Faisca = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $cor }) => $cor};
  box-shadow: 0 0 8px ${({ $cor }) => $cor};

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${explodir} 1.1s ease-out both;
  animation-delay: ${({ $atraso }) => 0.3 + $atraso}s;
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

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.normal}
    ${({ theme }) => theme.animacao.curva} both;
  animation-delay: ${({ $atraso }) => $atraso}s;
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

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${crescer} ${({ theme }) => theme.animacao.lenta}
    ${({ theme }) => theme.animacao.curva} backwards;
  animation-delay: ${({ $atraso }) => $atraso + 0.2}s;
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
  const [pensando, setPensando] = useState(true);

  // suspense: o Chapéu "pensa" antes de mostrar a casa
  useEffect(() => {
    const espera = setTimeout(() => setPensando(false), TEMPO_SUSPENSE);
    return () => clearTimeout(espera);
  }, []);

  // maior pontuação primeiro; empate segue a ordem de desempate do quiz
  const placar = useMemo(
    () =>
      ordem
        .map(nome => ({ nome, pontos: pontos[nome] || 0 }))
        .sort((a, b) => b.pontos - a.pontos),
    [ordem, pontos]
  );

  if (pensando) {
    return (
      <Pensando role="status">
        <Chapeu aria-hidden="true">🎩</Chapeu>
        <p>
          O Chapéu Seletor está pensando
          <Ponto $atraso={0}>.</Ponto>
          <Ponto $atraso={0.2}>.</Ponto>
          <Ponto $atraso={0.4}>.</Ponto>
        </p>
      </Pensando>
    );
  }

  return (
    <div>
      <Destaque $cor={cor} style={{ '--cor-brilho': cor }}>
        <Faiscas aria-hidden="true">
          {FAISCAS.map((faisca, i) => (
            <Faisca
              key={i}
              $cor={i % 2 === 0 ? cor : tema.cores.destaque}
              $atraso={faisca.atraso}
              style={{ '--x': `${faisca.x}px`, '--y': `${faisca.y}px` }}
            />
          ))}
        </Faiscas>

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
        {placar.map((item, i) => (
          <Linha
            key={item.nome}
            $vencedora={item.nome === vencedora}
            $atraso={0.5 + i * 0.15}
          >
            <Rotulo>
              <span>{item.nome}</span>
              <span>{item.pontos} de {total}</span>
            </Rotulo>
            <Barra>
              <Preenchimento
                $cor={tema.casas[item.nome] ?? tema.cores.destaque}
                $porcentagem={(item.pontos / total) * 100}
                $atraso={0.5 + i * 0.15}
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
