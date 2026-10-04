import styled, { css, keyframes } from 'styled-components';
import { aparecerSubindo } from '../styles/animacoes';
import banner from '../assets/casasHeader.webp';

// Animação feita com auxílio de IA (Claude)
// cada parte do cabeçalho surge subindo, uma depois da outra ($atraso)
const entrada = css`
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.lenta}
    ${({ theme }) => theme.animacao.curva} both;
  animation-delay: ${({ $atraso = 0 }) => $atraso}s;
`;

// Animação feita com auxílio de IA (Claude)
// brilho dourado que aumenta e diminui em volta das letras do título
const brilhoTexto = keyframes`
  0%,
  100% {
    text-shadow: 0 0 6px rgba(212, 175, 55, 0.35);
  }
  50% {
    text-shadow:
      0 0 14px rgba(212, 175, 55, 0.8),
      0 0 32px rgba(212, 175, 55, 0.4);
  }
`;

const Topo = styled.header`
  margin-bottom: 40px;
`;

// height: auto + width/height no <img> reservam o espaço e evitam que a página "pule"
const Banner = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 28px;
  border-radius: ${({ theme }) => theme.raio};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  ${entrada}
`;

const Titulo = styled.h1`
  margin-bottom: 8px;
  letter-spacing: 0.06em;

  /* Animação feita com auxílio de IA (Claude) */
  /* aparece como o resto do cabeçalho e depois continua brilhando devagar */
  animation:
    ${aparecerSubindo} ${({ theme }) => theme.animacao.lenta} ${({ theme }) => theme.animacao.curva} both,
    ${brilhoTexto} 4s ease-in-out infinite;
  animation-delay: ${({ $atraso }) => $atraso}s, ${({ $atraso }) => $atraso + 1}s;
`;

const Subtitulo = styled.p`
  max-width: 560px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.cores.textoSuave};
  ${entrada}
`;

function Cabecalho() {
  return (
    <Topo>
      <Banner
        src={banner}
        width={1600}
        height={476}
        alt="Brasões de Gryffindor, Hufflepuff, Ravenclaw e Slytherin"
      />
      <Titulo $atraso={0.2}>Casas de Hogwarts</Titulo>
      <Subtitulo $atraso={0.4}>
        Conheça as quatro casas e faça o quiz do Chapéu Seletor para descobrir a sua.
      </Subtitulo>
    </Topo>
  );
}

export default Cabecalho;
