import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: radial-gradient(ellipse at top, #241f3d 0%, transparent 60%),
      ${({ theme }) => theme.cores.fundo};
    background-attachment: fixed;
    color: ${({ theme }) => theme.cores.texto};
    font-family: ${({ theme }) => theme.fontes.texto};
    line-height: 1.5;
  }

  h1,
  h2,
  h3 {
    margin: 0 0 16px;
    font-family: ${({ theme }) => theme.fontes.titulo};
    color: ${({ theme }) => theme.cores.destaque};
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
