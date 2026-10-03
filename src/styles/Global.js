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
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: ${({ theme }) => theme.cores.destaque};
      color: ${({ theme }) => theme.cores.fundo};
    }
  }
`;

export default Global;
