import { useEffect, useState } from 'react';

// "#/quiz" -> "quiz"
function lerRota() {
  return window.location.hash.replace('#/', '');
}

// navegação pelo "#" do endereço, sem biblioteca de rotas
export function useRota() {
  const [rota, setRota] = useState(lerRota());

  useEffect(() => {
    function aoMudar() {
      setRota(lerRota());
      window.scrollTo(0, 0);
    }

    // "hashchange" dispara quando o "#" muda (clicar num link ou voltar no navegador)
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, []);

  return rota;
}
