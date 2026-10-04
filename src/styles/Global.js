import { createGlobalStyle } from 'styled-components';
import { cintilar } from './animacoes';

// estrelas feitas com pontinhos de radial-gradient que se repetem pela tela
const estrelasPequenas = `
  radial-gradient(1px 1px at 20px 30px, #fff, transparent),
  radial-gradient(1px 1px at 120px 80px, #fff, transparent),
  radial-gradient(1px 1px at 60px 150px, #fff, transparent),
  radial-gradient(1px 1px at 190px 20px, #fff, transparent),
  radial-gradient(1px 1px at 160px 170px, #fff, transparent)
`;

const estrelasGrandes = `
  radial-gradient(1.5px 1.5px at 50px 90px, #fff, transparent),
  radial-gradient(2px 2px at 240px 40px, #f5e6b8, transparent),
  radial-gradient(1.5px 1.5px at 300px 260px, #fff, transparent),
  radial-gradient(2px 2px at 130px 320px, #f5e6b8, transparent)
`;

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* rolagem suave ao clicar nos links da navegação */
  /* scroll-padding-top desconta a altura da barra fixa, para ela não cobrir o título */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 64px;
  }

  body {
    margin: 0;
    min-height: 100vh;
    /* céu noturno: mais claro no topo e escurecendo para baixo */
    background:
      radial-gradient(ellipse at top, #241f3d 0%, transparent 60%),
      ${({ theme }) => theme.cores.fundo};
    background-attachment: fixed;
    color: ${({ theme }) => theme.cores.texto};
    font-family: ${({ theme }) => theme.fontes.texto};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* duas camadas de estrelas fixas atrás de todo o conteúdo */
  body::before,
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* as camadas piscam em ritmos diferentes, então as estrelas não piscam todas juntas */
  body::before {
    background-image: ${estrelasPequenas};
    background-size: 210px 210px;
    animation: ${cintilar} 5s ease-in-out infinite;
  }

  body::after {
    background-image: ${estrelasGrandes};
    background-size: 350px 350px;
    animation: ${cintilar} 7s ease-in-out 2s infinite;
  }

  h1,
  h2,
  h3 {
    font-family: ${({ theme }) => theme.fontes.titulo};
    color: ${({ theme }) => theme.cores.destaque};
    font-weight: 700;
    margin: 0 0 16px;
  }

  h1 {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
  }

  h2 {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
  }

  button {
    font: inherit;
    cursor: pointer;
    margin: 4px;
    padding: 10px 18px;
    border: 1px solid ${({ theme }) => theme.cores.destaque};
    border-radius: ${({ theme }) => theme.raio};
    background: transparent;
    color: ${({ theme }) => theme.cores.texto};
    transition:
      background ${({ theme }) => theme.animacao.rapida},
      color ${({ theme }) => theme.animacao.rapida};

    &:hover {
      background: ${({ theme }) => theme.cores.destaque};
      color: ${({ theme }) => theme.cores.fundo};
    }
  }

  /* contorno dourado só para quem navega pelo teclado */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.cores.destaque};
    outline-offset: 3px;
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* quem pediu menos movimento no sistema não vê as animações */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default Global;
