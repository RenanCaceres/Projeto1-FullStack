import { useEffect, useState } from 'react';

// "#/quiz" -> "quiz"; "", "#" ou "#/" -> "" (página inicial)
function lerRota() {
  return window.location.hash.replace(/^#\/?/, '');
}

// Hook próprio: diz em qual página o site está, usando o "#" do endereço.
// Assim cada página tem link próprio (ex.: .../#/feiticos) e o botão voltar
// do navegador funciona, sem precisar de biblioteca de rotas.
export function useRota() {
  const [rota, setRota] = useState(lerRota);

  useEffect(() => {
    function aoMudar() {
      setRota(lerRota());
      window.scrollTo({ top: 0, behavior: 'instant' }); // página nova começa do topo, sem rolagem animada
    }
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, []);

  return rota;
}
