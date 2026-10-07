import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { aparecerSubindo } from '../styles/animacoes';
import { getFeiticos } from '../services/hogwartsService';
import { useApi } from '../hooks/useApi';
import { nomesDePessoas, qualidades, traduzir } from '../utils/traducoes';
import { Etiqueta, Etiquetas } from './Casa';

const Chapeu = styled.p`
  padding: 32px 0;
  font-family: ${({ theme }) => theme.fontes.titulo};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.cores.destaque};
`;

const Destaque = styled.div`
  max-width: 520px;
  margin: 0 auto 32px;
  padding: 24px;
  border: 2px solid ${({ $cor }) => $cor};
  border-radius: ${({ theme }) => theme.raio};
  box-shadow: 0 0 24px ${({ $cor }) => $cor};

  /* Animação feita com auxílio de IA (Claude) */
  animation: ${aparecerSubindo} 0.8s ease-out;

  p {
    margin: 4px 0;
  }
`;

const SeuFeitico = styled.div`
  max-width: 520px;
  margin: 0 auto 32px;
  padding: 16px 20px;
  border: 1px dashed ${({ theme }) => theme.cores.destaque};
  border-radius: ${({ theme }) => theme.raio};
`;

const Placar = styled.ul`
  max-width: 520px;
  margin: 0 auto 24px;
  padding: 0;
  list-style: none;
  text-align: left;

  li {
    margin-bottom: 12px;
  }
`;

const Barra = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.cores.borda};
  border-radius: 999px;
  overflow: hidden;
`;

const Preenchimento = styled.div`
  height: 100%;
  width: ${({ $porcentagem }) => $porcentagem}%;
  background: ${({ $cor }) => $cor};
`;

function Resultado({ vencedora, casas, pontos, total, onRefazer }) {
  const tema = useTheme();
  const cor = tema.casas[vencedora];
  const casa = casas.find(c => c.name === vencedora);

  const [pensando, setPensando] = useState(true);
  const { dados: feiticos } = useApi(getFeiticos); // vem do cache se o grimório já foi aberto

  // a função só roda na primeira vez: o sorteio não muda a cada re-render
  const [sorteio] = useState(() => Math.random());

  // suspense de 2s antes de mostrar a casa
  useEffect(() => {
    const espera = setTimeout(() => setPensando(false), 2000);
    return () => clearTimeout(espera); // se sair da página antes, cancela o timer
  }, []);

  if (pensando) {
    return <Chapeu>🎩 O Chapéu Seletor está pensando...</Chapeu>;
  }

  // só feitiços com palavras mágicas (alguns vêm sem encantamento)
  const comEncantamento = (feiticos ?? []).filter(f => f.incantation);
  const feitico = comEncantamento[Math.floor(sorteio * comEncantamento.length)];

  const placar = casas
    .map(c => ({ nome: c.name, pontos: pontos[c.name] || 0 }))
    .sort((a, b) => b.pontos - a.pontos);

  return (
    <div>
      <Destaque $cor={cor}>
        <p>O Chapéu Seletor decidiu...</p>
        <h2>Você é da {vencedora}!</h2>
        <p>Fundador: {casa.founder}</p>
        <p>Animal: {casa.animal}</p>
        <p>Diretores: {nomesDePessoas(casa.heads)}</p>
        <Etiquetas style={{ justifyContent: 'center' }}>
          {casa.traits.map(t => (
            <Etiqueta key={t.id} $cor={cor}>
              {traduzir(qualidades, t.name)}
            </Etiqueta>
          ))}
        </Etiquetas>
      </Destaque>

      {feitico && (
        <SeuFeitico>
          <p>Seu feitiço sorteado</p>
          <h3>“{feitico.incantation}”</h3>
          <p>
            <strong>{feitico.name}</strong>: {feitico.effect}
          </p>
        </SeuFeitico>
      )}

      <h3>Placar</h3>
      <Placar>
        {placar.map(item => (
          <li key={item.nome}>
            {item.nome}: {item.pontos} de {total}
            <Barra>
              <Preenchimento
                $cor={tema.casas[item.nome]}
                $porcentagem={(item.pontos / total) * 100}
              />
            </Barra>
          </li>
        ))}
      </Placar>

      <button onClick={onRefazer}>Refazer</button>
    </div>
  );
}

export default Resultado;
