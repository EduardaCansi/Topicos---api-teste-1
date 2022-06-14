import api from "../../services/axios-common";

class AtividadeSrv {
    url = "/atividade";

    async getAtividades() {
        try {
            const response = await api.get(this.url);
            return response.data;
        } catch (error) { }
    }

    async postAtividades(Atividade) {
        try {
            const response = await api.post(this.url, JSON.stringify(Atividade));
            return response.data;
        } catch (error) { }
    }

    async putAtividades(Atividade) {
        try {
            const response = await api.put(this.url, JSON.stringify(Atividade));
            return response.data;
        } catch (error) { }
    }

    async deletAtividades(id) {
        try {
            const response = await api.delete(this.url + "/" + id);
            return response.data;
        } catch (error) { }
    }
}
export default new AtividadeSrv();
