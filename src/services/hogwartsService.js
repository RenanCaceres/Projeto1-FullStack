import axios from "axios";

const api = axios.create({
    baseURL: "https://wizard-world-api.herokuapp.com",
    timeout: 10000, // 10s: evita ficar carregando para sempre
});

// guarda o que já foi baixado (os feitiços são usados no grimório e no quiz)
const cache = new Map();

async function buscar(rota) {
    if (cache.has(rota)) {
        return cache.get(rota);
    }

    const resposta = await api.get(rota);
    cache.set(rota, resposta.data); // só o .data: o axios devolve também status, headers etc.
    return resposta.data;
}

export function getCasas() {
    return buscar("/Houses");
}

export function getFeiticos() {
    return buscar("/Spells");
}

export function getPocoes() {
    return buscar("/Elixirs");
}
