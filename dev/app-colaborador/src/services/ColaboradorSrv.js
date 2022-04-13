import api from "./axios-common";

class ColaboradorSrv {
  url = "/colaboradores";

  async getColaboradores() {
    try {
      const response = await api.get(this.url);
      return response.data;
    } catch (error) {}
  }

  async postColaboradores(colaborador) {
    try {
      const response = await api.post(this.url, JSON.stringify(colaborador));
      return response.data;
    } catch (error) {}
  }

  async putColaboradores(colaborador) {
    try {
      const response = await api.put(this.url, JSON.stringify(colaborador));
      return response.data;
    } catch (error) {}
  }

  async deletColaboradores(id) {
    try {
      const response = await api.delete(this.url + "/" + id);
      return response.data;
    } catch (error) {}
  }
}
export default new ColaboradorSrv();
