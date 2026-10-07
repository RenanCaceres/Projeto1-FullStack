import { keyframes } from 'styled-components';

// Animação feita com auxílio de IA (Claude)
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
