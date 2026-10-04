import Pocoes from '../components/Pocoes';
import { Descricao, Secao } from '../components/Layout';

function PaginaPocoes() {
  return (
    <Secao>
      <h2>Livro de Poções</h2>
      <Descricao>
        Poções e elixires com ingredientes, inventores e efeitos colaterais.
      </Descricao>
      <Pocoes />
    </Secao>
  );
}

export default PaginaPocoes;
