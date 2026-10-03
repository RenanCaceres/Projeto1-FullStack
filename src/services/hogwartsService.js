import axios from "axios";

export async function getCasas() {
    const response = await axios.get("https://wizard-world-api.herokuapp.com/Houses");
    return response.data;
}
