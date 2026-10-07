import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { getFeiticos } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import { useDebounce } from '../hooks/useDebounce';
import { tiposFeitico, traduzir } from '../utils/traducoes';
import { Aviso } from './Layout';
import { BotaoMais, CampoBusca, Card, Contagem, Filtros, GradeCards, Selecao } from './Controles';

const POR_PAGINA = 12;

const Tipo = styled.small`
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Encantamento = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.cores.destaque};
`;

function Feiticos() {
  const { dados: feiticos, carregando, erro, tentarDeNovo } = useApi(getFeiticos);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [limite, setLimite] = useState(POR_PAGINA);
  const termo = useDebounce(busca.toLowerCase());

  // useMemo: só refaz o filtro quando a lista, o tipo ou a busca mudam
  const filtrados = useMemo(() => {
    if (!feiticos) return [];

    return feiticos.filter(f => {
      const tipoCerto = tipo === '' || f.type === tipo;
      // ?. porque alguns feitiços vêm sem encantamento (null)
      const achouTexto =
        f.name?.toLowerCase().includes(termo) || f.incantation?.toLowerCase().includes(termo);
      return tipoCerto && achouTexto;
    });
  }, [feiticos, tipo, termo]);

  if (carregando) return <Aviso>Abrindo o grimório...</Aviso>;

  if (erro) {
    return (
      <>
        <Aviso>{erro}</Aviso>
        <button onClick={tentarDeNovo}>Tentar de novo</button>
      </>
    );
  }

  const visiveis = filtrados.slice(0, limite);

  return (
    <div>
      <Filtros>
        <CampoBusca
          type="search"
          placeholder="Buscar feitiço ou encantamento"
          value={busca}
          onChange={e => {
            setBusca(e.target.value);
            setLimite(POR_PAGINA); // busca nova começa mostrando só os primeiros
          }}
        />
        <Selecao
          value={tipo}
          onChange={e => {
            setTipo(e.target.value);
            setLimite(POR_PAGINA);
          }}
        >
          <option value="">Todos os tipos</option>
          {Object.keys(tiposFeitico).map(t => (
            <option key={t} value={t}>
              {tiposFeitico[t]}
            </option>
          ))}
        </Selecao>
      </Filtros>

      <Contagem>
        Mostrando {visiveis.length} de {filtrados.length} feitiços
      </Contagem>

      <GradeCards>
        {visiveis.map(f => (
          <Card key={f.id}>
            <Tipo>{traduzir(tiposFeitico, f.type)}</Tipo>
            <h3>{f.name}</h3>
            {f.incantation && <Encantamento>“{f.incantation}”</Encantamento>}
            <p>{f.effect}</p>
          </Card>
        ))}
      </GradeCards>

      {limite < filtrados.length && (
        <BotaoMais onClick={() => setLimite(limite + POR_PAGINA)}>Carregar mais</BotaoMais>
      )}
    </div>
  );
}

export default Feiticos;
