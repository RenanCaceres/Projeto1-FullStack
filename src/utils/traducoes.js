// A API devolve tudo em inglês. Aqui ficam as traduções dos valores fixos
// (os nomes "Chivalary", "Inteligence" e "Selfpreservation" vêm escritos assim da API).

export const qualidades = {
  Courage: 'Coragem',
  Bravery: 'Bravura',
  Determination: 'Determinação',
  Daring: 'Ousadia',
  Nerve: 'Audácia',
  Chivalary: 'Cavalheirismo',
  Hardworking: 'Esforço',
  Patience: 'Paciência',
  Fairness: 'Imparcialidade',
  Just: 'Justiça',
  Loyalty: 'Lealdade',
  Modesty: 'Modéstia',
  Wit: 'Perspicácia',
  Learning: 'Aprendizado',
  Wisdom: 'Sabedoria',
  Acceptance: 'Aceitação',
  Inteligence: 'Inteligência',
  Creativity: 'Criatividade',
  Resourcefulness: 'Engenhosidade',
  Pride: 'Orgulho',
  Cunning: 'Astúcia',
  Ambition: 'Ambição',
  Selfpreservation: 'Autopreservação',
};

export const tiposFeitico = {
  Charm: 'Encantamento',
  Conjuration: 'Conjuração',
  Spell: 'Feitiço',
  Transfiguration: 'Transfiguração',
  HealingSpell: 'Cura',
  DarkCharm: 'Encantamento das trevas',
  Jinx: 'Azaração',
  Curse: 'Maldição',
  MagicalTransportation: 'Transporte mágico',
  Hex: 'Feitiço maligno',
  CounterSpell: 'Contrafeitiço',
  DarkArts: 'Artes das trevas',
  CounterJinx: 'Contra-azaração',
  CounterCharm: 'Contraencantamento',
  Untransfiguration: 'Destransfiguração',
  BindingMagicalContract: 'Contrato mágico',
  Vanishment: 'Desaparecimento',
};

export const dificuldades = {
  Beginner: 'Iniciante',
  Moderate: 'Moderada',
  Advanced: 'Avançada',
  OrdinaryWizardingLevel: 'N.O.M.',
  OneOfAKind: 'Única',
  Unknown: 'Desconhecida',
};

// devolve a tradução ou, se não houver, o próprio texto da API
export function traduzir(dicionario, valor) {
  return dicionario[valor] ?? valor;
}

// "Minerva McGonagall, Godric Gryffindor": junta os nomes ignorando partes vazias
export function nomesDePessoas(pessoas = []) {
  return pessoas
    .map(p => [p.firstName, p.lastName].filter(Boolean).join(' '))
    .join(', ');
}
