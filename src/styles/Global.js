import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${({ theme }) => theme.cores.fundo};
    color: ${({ theme }) => theme.cores.texto};
    font-family: ${({ theme }) => theme.fontes.texto};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
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
