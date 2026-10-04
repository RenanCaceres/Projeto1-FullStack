import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { getFeiticos } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import { useDebounce } from '../hooks/useDebounce';
import { tiposFeitico, traduzir } from '../utils/traducoes';
import { aparecerSubindo } from '../styles/animacoes';
import {
  Aviso,
  BotaoMais,
  CampoBusca,
  Contagem,
  Filtros,
  GradeCards,
  Selecao,
} from './Controles';

const POR_PAGINA = 12;

// cor e nome em português de cada luz que a API informa
// luz "None" ou "Transparent" (feitiço sem luz visível) usa um cinza neutro
const luzes = {
  Blue: ['#4a7dff', 'Azul'],
  IcyBlue: ['#a8e6ff', 'Azul gelo'],
  BrightBlue: ['#2fa8ff', 'Azul brilhante'],
  BlueishWhite: ['#dbe8ff', 'Branco azulado'],
  Red: ['#e23b3b', 'Vermelha'],
  DarkRed: ['#a01010', 'Vermelho escuro'],
  Scarlet: ['#ff2400', 'Escarlate'],
  FieryScarlet: ['#ff3b1f', 'Escarlate flamejante'],
  Fire: ['#ff6a00', 'Fogo'],
  Orange: ['#ff8c32', 'Laranja'],
  Gold: ['#d4af37', 'Dourada'],
  Yellow: ['#f5d442', 'Amarela'],
  BrightYellow: ['#ffee33', 'Amarelo brilhante'],
  Green: ['#3fbf6f', 'Verde'],
  Turquoise: ['#30d5c8', 'Turquesa'],
  Purple: ['#9b59d0', 'Roxa'],
  Violet: ['#8f5cff', 'Violeta'],
  Pink: ['#ff7ac8', 'Rosa'],
  White: ['#f5f5f5', 'Branca'],
  Silver: ['#c0c0c0', 'Prateada'],
  Grey: ['#8a8a8a', 'Cinza'],
  BlackSmoke: ['#6b6b6b', 'Fumaça preta'],
  PsychedelicTransparentWave: ['#c77dff', 'Onda psicodélica'],
};
const SEM_LUZ = ['#7d7789', 'Sem luz'];

function corDaLuz(luz) {
  return luzes[luz] ?? SEM_LUZ;
}

const Card = styled.article`
  position: relative;
  overflow: hidden;
  padding: 18px;
  background: ${({ theme }) => theme.cores.fundo};
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};

  /* Animação feita com auxílio de IA (Claude) */
  /* cards entram em cascata; no hover sobem e brilham na cor da luz do feitiço */
  animation: ${aparecerSubindo} ${({ theme }) => theme.animacao.normal}
    ${({ theme }) => theme.animacao.curva} backwards;
  animation-delay: ${({ $indice }) => ($indice % POR_PAGINA) * 0.04}s;
  transition:
    transform ${({ theme }) => theme.animacao.normal} ${({ theme }) => theme.animacao.curva},
    border-color ${({ theme }) => theme.animacao.normal},
    box-shadow ${({ theme }) => theme.animacao.normal};

  &:hover {
    transform: translateY(-4px);
    border-color: var(--cor-brilho);
    box-shadow: 0 0 22px -4px var(--cor-brilho);
  }

  /* Animação feita com auxílio de IA (Claude) */
  /* mancha de luz no canto do card, na cor do feitiço */
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--cor-brilho) 0%, transparent 70%);
    opacity: 0.25;
    transition: opacity ${({ theme }) => theme.animacao.normal};
    pointer-events: none;
  }

  &:hover::before {
    opacity: 0.55;
  }

  h3 {
    margin: 8px 0 4px;
    font-size: 1.1rem;
  }
`;

const Topo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Luz = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--cor-brilho);
    box-shadow: 0 0 8px var(--cor-brilho);
  }
`;

const Encantamento = styled.p`
  font-style: italic;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.cores.destaque};
`;

const Efeito = styled.p`
  margin: 0;
`;

function Feiticos() {
  const { dados, carregando, erro, tentarDeNovo } = useApi(getFeiticos);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [limite, setLimite] = useState(POR_PAGINA);
  const termo = useDebounce(busca.trim().toLowerCase());

  // tipos que realmente aparecem nos dados, em ordem alfabética (já traduzidos)
  const tipos = useMemo(() => {
    if (!dados) return [];
    return [...new Set(dados.map(f => f.type))]
      .filter(t => t && t !== 'None')
      .sort((a, b) => traduzir(tiposFeitico, a).localeCompare(traduzir(tiposFeitico, b)));
  }, [dados]);

  // só refaz o filtro quando a busca (já com debounce), o tipo ou os dados mudam
  const filtrados = useMemo(() => {
    if (!dados) return [];
    return dados.filter(f => {
      if (tipo && f.type !== tipo) return false;
      if (!termo) return true;
      return [f.name, f.incantation, f.effect]
        .some(texto => texto?.toLowerCase().includes(termo));
    });
  }, [dados, termo, tipo]);

  if (carregando) return <Aviso>Abrindo o grimório...</Aviso>;

  if (erro) {
    return (
      <>
        <Aviso role="alert">{erro}</Aviso>
        <button onClick={tentarDeNovo}>Tentar de novo</button>
      </>
    );
  }

  const visiveis = filtrados.slice(0, limite);

  return (
    <div>
      <Filtros>
        <CampoBusca
          placeholder="Buscar feitiço ou encantamento"
          aria-label="Buscar feitiço"
          value={busca}
          onChange={e => {
            setBusca(e.target.value);
            setLimite(POR_PAGINA);
          }}
        />
        <Selecao
          aria-label="Filtrar por tipo"
          value={tipo}
          onChange={e => {
            setTipo(e.target.value);
            setLimite(POR_PAGINA);
          }}
        >
          <option value="">Todos os tipos</option>
          {tipos.map(t => (
            <option key={t} value={t}>
              {traduzir(tiposFeitico, t)}
            </option>
          ))}
        </Selecao>
      </Filtros>

      <Contagem aria-live="polite">
        Mostrando {visiveis.length} de {filtrados.length} feitiços
      </Contagem>

      {filtrados.length === 0 && <Aviso>Nenhum feitiço encontrado.</Aviso>}

      <GradeCards>
        {visiveis.map((f, i) => {
          const [cor, nomeLuz] = corDaLuz(f.light);
          return (
            <Card key={f.id} $indice={i} style={{ '--cor-brilho': cor }}>
              <Topo>
                <span>{traduzir(tiposFeitico, f.type)}</span>
                <Luz>{nomeLuz}</Luz>
              </Topo>
              <h3>{f.name}</h3>
              {f.incantation && <Encantamento>“{f.incantation}”</Encantamento>}
              <Efeito>{f.effect}</Efeito>
            </Card>
          );
        })}
      </GradeCards>

      {limite < filtrados.length && (
        <BotaoMais onClick={() => setLimite(n => n + POR_PAGINA)}>
          Carregar mais
        </BotaoMais>
      )}
    </div>
  );
}

export default Feiticos;
