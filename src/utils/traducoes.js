// a API devolve tudo em inglês
// "Chivalary", "Inteligence" e "Selfpreservation" vêm escritos errado da própria API

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

// sem tradução cadastrada: mostra o texto original da API
export function traduzir(dicionario, valor) {
  return dicionario[valor] ?? valor;
}

// [{ firstName, lastName }, ...] -> "Minerva McGonagall, Godric Gryffindor"
export function nomesDePessoas(pessoas = []) {
  return pessoas
    .map(p => [p.firstName, p.lastName].filter(Boolean).join(' '))
    .join(', ');
}
