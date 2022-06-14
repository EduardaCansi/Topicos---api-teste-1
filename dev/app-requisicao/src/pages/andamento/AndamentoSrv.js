import api from "../../services/axios-common";

class AndamentoSrv {
    url = "/andamento";

    async getAndamentos() {
        try {
            const response = await api.get(this.url);
            return response.data;
        } catch (error) { }
    }

    async postAndamentos(Andamento) {
        try {
            const response = await api.post(this.url, JSON.stringify(Andamento));
            return response.data;
        } catch (error) { }
    }

    async putAndamentos(Andamento) {
        try {
            const response = await api.put(this.url, JSON.stringify(Andamento));
            return response.data;
        } catch (error) { }
    }

    async deletAndamentos(id) {
        try {
            const response = await api.delete(this.url + "/" + id);
            return response.data;
        } catch (error) { }
    }
}
export default new AndamentoSrv();
