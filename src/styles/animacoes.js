import { keyframes } from 'styled-components';

// Animações reutilizáveis do projeto.
// Uso: animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva} both;

// Animação feita com auxílio de IA (Claude)
// elemento surge de baixo para cima, ficando visível aos poucos
export const aparecerSubindo = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animação feita com auxílio de IA (Claude)
// brilho que aumenta e diminui em volta do elemento
// a cor vem da variável CSS --cor-brilho (padrão: dourado)
export const brilhoPulsante = keyframes`
  0%,
  100% {
    box-shadow: 0 0 8px var(--cor-brilho, #d4af37);
  }
  50% {
    box-shadow: 0 0 28px var(--cor-brilho, #d4af37);
  }
`;

// Animação feita com auxílio de IA (Claude)
// pisca suavemente, usada nas estrelas do fundo
export const cintilar = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;

// Animação feita com auxílio de IA (Claude)
// sobe e desce devagar, como se estivesse flutuando
export const flutuar = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;
