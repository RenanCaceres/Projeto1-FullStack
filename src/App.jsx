import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCasas } from './services/hogwartsService';
import Casa from './components/Casa';
import Quiz from './components/Quiz';

const Pagina = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
  text-align: center;
`;

const Secao = styled.section`
  margin-bottom: 48px;
  padding: 24px;
  background: ${({ theme }) => theme.cores.superficie};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
`;

function App() {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    getCasas()
      .then((data) => setCasas(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Pagina>
      <header>
      </header>

      <Secao>
        <h1>Casas de Hogwarts</h1>
        {casas.map((casa) => (
          <Casa key={casa.id} data={casa} />
        ))}
      </Secao>

      <Secao>
        <h1>Quiz</h1>
        <Quiz casas={casas} />
      </Secao>
    </Pagina>
  );
}

export default App;
