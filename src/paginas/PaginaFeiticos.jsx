import Feiticos from '../components/Feiticos';
import { Descricao, Secao } from '../components/Layout';

function PaginaFeiticos() {
  return (
    <Secao>
      <h2>Grimório de Feitiços</h2>
      <Descricao>Todos os feitiços da Wizard World API.</Descricao>
      <Feiticos />
    </Secao>
  );
}

export default PaginaFeiticos;
