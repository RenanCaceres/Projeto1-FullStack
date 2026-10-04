import axios from "axios";

const api = axios.create({
    baseURL: "https://wizard-world-api.herokuapp.com",
    timeout: 10000, // 10s: evita ficar carregando para sempre
});

// cache das respostas: cada rota é buscada uma vez só por visita
// (ex.: os feitiços são usados no grimório e no resultado do quiz)
const cache = new Map();

function buscar(rota) {
    if (!cache.has(rota)) {
        const pedido = api.get(rota)
            .then((response) => response.data)
            .catch((erro) => {
                cache.delete(rota); // se falhar, a próxima tentativa busca de novo
                throw erro;
            });
        cache.set(rota, pedido);
    }
    return cache.get(rota);
}

// 4 casas: nome, cores, fundador, animal, elemento, fantasma, salão comunal, diretores e qualidades
export function getCasas() {
    return buscar("/Houses");
}

// 306 feitiços: nome, encantamento, efeito, tipo e cor da luz
export function getFeiticos() {
    return buscar("/Spells");
}

// 145 poções: efeito, efeitos colaterais, dificuldade, ingredientes e inventores
export function getPocoes() {
    return buscar("/Elixirs");
}
