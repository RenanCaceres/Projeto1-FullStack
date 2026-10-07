import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { getPocoes } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import { useDebounce } from '../hooks/useDebounce';
import { dificuldades, nomesDePessoas, traduzir } from '../utils/traducoes';
import { Aviso } from './Layout';
import { BotaoMais, CampoBusca, Card, Contagem, Filtros, GradeCards, Selecao } from './Controles';

const POR_PAGINA = 12;

const Selo = styled.small`
  padding: 2px 10px;
  border: 1px solid ${({ theme }) => theme.cores.destaque};
  border-radius: 999px;
  color: ${({ theme }) => theme.cores.destaque};
`;

const Detalhes = styled.dl`
  font-size: 0.9rem;

  dt {
    margin-top: 8px;
    color: ${({ theme }) => theme.cores.destaque};
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
`;

// componente separado porque cada card precisa do seu próprio "aberta"
function CardPocao({ pocao }) {
  const [aberta, setAberta] = useState(false);

  const ingredientes = (pocao.ingredients ?? []).map(i => i.name).join(', '); // algumas vêm sem a lista
  const inventores = nomesDePessoas(pocao.inventors);

  return (
    <Card>
      <Selo>{traduzir(dificuldades, pocao.difficulty)}</Selo>
      <h3>{pocao.name}</h3>
      <p>{pocao.effect || 'Efeito não informado.'}</p>

      <button onClick={() => setAberta(!aberta)}>
        {aberta ? 'Fechar detalhes' : 'Ver detalhes'}
      </button>

      {aberta && (
        <Detalhes>
          <dt>Ingredientes</dt>
          <dd>{ingredientes || 'Não informado'}</dd>
          <dt>Inventores</dt>
          <dd>{inventores || 'Não informado'}</dd>
          <dt>Efeitos colaterais</dt>
          <dd>{pocao.sideEffects || 'Não informado'}</dd>
          <dt>Tempo de preparo</dt>
          <dd>{pocao.time || 'Não informado'}</dd>
        </Detalhes>
      )}
    </Card>
  );
}

function Pocoes() {
  const { dados: pocoes, carregando, erro, tentarDeNovo } = useApi(getPocoes);
  const [busca, setBusca] = useState('');
  const [nivel, setNivel] = useState('');
  const [limite, setLimite] = useState(POR_PAGINA);
  const termo = useDebounce(busca.toLowerCase());

  const filtradas = useMemo(() => {
    if (!pocoes) return [];

    return pocoes.filter(p => {
      const nivelCerto = nivel === '' || p.difficulty === nivel;
      const achouTexto =
        p.name?.toLowerCase().includes(termo) || p.effect?.toLowerCase().includes(termo);
      return nivelCerto && achouTexto;
    });
  }, [pocoes, nivel, termo]);

  if (carregando) return <Aviso>Abrindo o livro de poções...</Aviso>;

  if (erro) {
    return (
      <>
        <Aviso>{erro}</Aviso>
        <button onClick={tentarDeNovo}>Tentar de novo</button>
      </>
    );
  }

  const visiveis = filtradas.slice(0, limite);

  return (
    <div>
      <Filtros>
        <CampoBusca
          type="search"
          placeholder="Buscar poção ou efeito"
          value={busca}
          onChange={e => {
            setBusca(e.target.value);
            setLimite(POR_PAGINA);
          }}
        />
        <Selecao
          value={nivel}
          onChange={e => {
            setNivel(e.target.value);
            setLimite(POR_PAGINA);
          }}
        >
          <option value="">Todas as dificuldades</option>
          {Object.keys(dificuldades).map(n => (
            <option key={n} value={n}>
              {dificuldades[n]}
            </option>
          ))}
        </Selecao>
      </Filtros>

      <Contagem>
        Mostrando {visiveis.length} de {filtradas.length} poções
      </Contagem>

      <GradeCards>
        {visiveis.map(p => (
          <CardPocao key={p.id} pocao={p} />
        ))}
      </GradeCards>

      {limite < filtradas.length && (
        <BotaoMais onClick={() => setLimite(limite + POR_PAGINA)}>Carregar mais</BotaoMais>
      )}
    </div>
  );
}

export default Pocoes;
