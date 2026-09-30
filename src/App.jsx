import './App.css';
import { useEffect, useState } from 'react';
import { getCasas } from './hogwartsService';
import Casa from './Casas';
import Quiz from './Quiz';
import casasHeader from './assets/casasHeader.png';

function App() {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    getCasas()
      .then((data) => setCasas(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-Header">
        {/*  <img src={casasHeader} className="App-banner" alt="banner" /> */}
      </header>

      <div>
        <h1>Casas de Hogwarts</h1>
        {casas.map((casa) => (
          <Casa key={casa.id} data={casa} />
        ))}

        <h1>Quiz</h1>
        <Quiz casas={casas} />
      </div>
    </div>
  );
}

export default App;
