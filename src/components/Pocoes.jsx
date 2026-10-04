import { useId, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getPocoes } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import { useDebounce } from '../hooks/useDebounce';
import { dificuldades, nomesDePessoas, traduzir } from '../utils/traducoes';
import { aparecerSubindo } from '../styles/animacoes';
import {
  Aviso,
  BotaoMais,
  CampoBusca,
  Contagem,
  Filtros,
  GradeCards,
  Pilula,
} from './Controles';

const POR_PAGINA = 12;

// ordem dos filtros e cor do selo de cada dificuldade
const NIVEIS = [
  ['Beginner', '#3fbf6f'],
  ['Moderate', '#ecb939'],
  ['Advanced', '#e23b3b'],
  ['OrdinaryWizardingLevel', '#4a7dff'],
  ['OneOfAKind', '#9b59d0'],
  ['Unknown', '#7d7789'],
];
const corDoNivel = Object.fromEntries(NIVEIS);

// os cards abertos não esticam os vizinhos da mesma linha
const Grade = styled(GradeCards)`
  align-items: start;
`;

const Card = styled.article`
  padding: 18px;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-left: 4px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.normal}
    ${({ theme }) => theme.animacao.curva} backwards;
  animation-delay: ${({ $indice }) => ($indice % POR_PAGINA) * 0.04}s;

  h3 {
    margin: 8px 0 6px;
    font-size: 1.1rem;
  }
`;

const Selo = styled.span`
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  color: ${({ $cor }) => $cor};
  background: ${({ $cor }) => $cor}22;
  border: 1px solid ${({ $cor }) => $cor};
`;

const Efeito = styled.p`
  margin: 0;
  color: ${({ $vazio, theme }) => ($vazio ? theme.cores.textoSuave : theme.cores.texto)};
`;

const BotaoDetalhes = styled.button`
  margin: 12px 0 0;
  padding: 6px 14px;
  font-size: 0.85rem;
`;

// Animação feita com auxílio de IA (Claude)
// abre e fecha os detalhes animando a altura: a linha da grade vai de 0fr a 1fr
const Gaveta = styled.div`
  display: grid;
  grid-template-rows: ${({ $aberta }) => ($aberta ? '1fr' : '0fr')};
  opacity: ${({ $aberta }) => ($aberta ? 1 : 0)};
  transition:
    grid-template-rows ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva},
    opacity ${({ theme }) => theme.animacao.normal};

  > div {
    overflow: hidden;
  }
`;

const Detalhes = styled.dl`
  margin: 12px 0 0;
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

function CardPocao({ pocao, indice }) {
  const [aberta, setAberta] = useState(false);
  const idDetalhes = useId();
  const cor = corDoNivel[pocao.difficulty] ?? corDoNivel.Unknown;

  // só os campos que a API preencheu para esta poção
  const detalhes = [
    ['Ingredientes', (pocao.ingredients ?? []).map(i => i.name).join(', ')],
    ['Inventores', nomesDePessoas(pocao.inventors)],
    ['Fabricante', pocao.manufacturer],
    ['Efeitos colaterais', pocao.sideEffects],
    ['Características', pocao.characteristics],
    ['Tempo de preparo', pocao.time],
  ].filter(([, valor]) => valor);

  return (
    <Card $cor={cor} $indice={indice}>
      <Selo $cor={cor}>{traduzir(dificuldades, pocao.difficulty)}</Selo>
      <h3>{pocao.name}</h3>
      <Efeito $vazio={!pocao.effect}>{pocao.effect || 'Efeito não informado.'}</Efeito>

      {detalhes.length > 0 && (
        <>
          <BotaoDetalhes
            aria-expanded={aberta}
            aria-controls={idDetalhes}
            onClick={() => setAberta(a => !a)}
          >
            {aberta ? 'Fechar detalhes' : 'Ver detalhes'}
          </BotaoDetalhes>

          <Gaveta id={idDetalhes} $aberta={aberta} inert={!aberta}>
            <div>
              <Detalhes>
                {detalhes.map(([titulo, valor]) => (
                  <div key={titulo}>
                    <dt>{titulo}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </Detalhes>
            </div>
          </Gaveta>
        </>
      )}
    </Card>
  );
}

function Pocoes() {
  const { dados, carregando, erro, tentarDeNovo } = useApi(getPocoes);
  const [busca, setBusca] = useState('');
  const [nivel, setNivel] = useState('');
  const [limite, setLimite] = useState(POR_PAGINA);
  const termo = useDebounce(busca.trim().toLowerCase());

  // em ordem alfabética, com as poções que têm efeito descrito primeiro
  const ordenadas = useMemo(() => {
    if (!dados) return [];
    return [...dados].sort(
      (a, b) => Boolean(b.effect) - Boolean(a.effect) || a.name.localeCompare(b.name)
    );
  }, [dados]);

  // quantas poções existem em cada dificuldade (mostrado nos filtros)
  const totalPorNivel = useMemo(() => {
    const total = {};
    ordenadas.forEach(p => {
      total[p.difficulty] = (total[p.difficulty] || 0) + 1;
    });
    return total;
  }, [ordenadas]);

  const filtradas = useMemo(
    () =>
      ordenadas.filter(p => {
        if (nivel && p.difficulty !== nivel) return false;
        if (!termo) return true;
        return [p.name, p.effect, ...(p.ingredients ?? []).map(i => i.name)]
          .some(texto => texto?.toLowerCase().includes(termo));
      }),
    [ordenadas, nivel, termo]
  );

  if (carregando) return <Aviso>Abrindo o livro de poções...</Aviso>;

  if (erro) {
    return (
      <>
        <Aviso role="alert">{erro}</Aviso>
        <button onClick={tentarDeNovo}>Tentar de novo</button>
      </>
    );
  }

  function escolherNivel(novo) {
    setNivel(novo);
    setLimite(POR_PAGINA);
  }

  const visiveis = filtradas.slice(0, limite);

  return (
    <div>
      <Filtros>
        <CampoBusca
          placeholder="Buscar poção ou ingrediente"
          aria-label="Buscar poção"
          value={busca}
          onChange={e => {
            setBusca(e.target.value);
            setLimite(POR_PAGINA);
          }}
        />
      </Filtros>

      <Filtros role="group" aria-label="Filtrar por dificuldade">
        <Pilula $ativo={nivel === ''} aria-pressed={nivel === ''} onClick={() => escolherNivel('')}>
          Todas ({ordenadas.length})
        </Pilula>
        {NIVEIS.filter(([n]) => totalPorNivel[n]).map(([n, cor]) => (
          <Pilula
            key={n}
            $cor={cor}
            $ativo={nivel === n}
            aria-pressed={nivel === n}
            onClick={() => escolherNivel(n)}
          >
            {traduzir(dificuldades, n)} ({totalPorNivel[n]})
          </Pilula>
        ))}
      </Filtros>

      <Contagem aria-live="polite">
        Mostrando {visiveis.length} de {filtradas.length} poções
      </Contagem>

      {filtradas.length === 0 && <Aviso>Nenhuma poção encontrada.</Aviso>}

      <Grade>
        {visiveis.map((p, i) => (
          <CardPocao key={p.id} pocao={p} indice={i} />
        ))}
      </Grade>

      {limite < filtradas.length && (
        <BotaoMais onClick={() => setLimite(n => n + POR_PAGINA)}>
          Carregar mais
        </BotaoMais>
      )}
    </div>
  );
}

export default Pocoes;
