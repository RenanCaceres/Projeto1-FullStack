import axios from "axios";

const api = axios.create({
    baseURL: "https://wizard-world-api.herokuapp.com",
    timeout: 10000, // 10s: evita ficar carregando para sempre
});

export async function getCasas() {
    const response = await api.get("/Houses");
    return response.data;
}
