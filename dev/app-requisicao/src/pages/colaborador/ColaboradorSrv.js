import api from "../../services/axios-common";

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

  async obterPeloId(id) {
    return await api.get(this.url + "/" + id).catch((err) => {
      throw err;
    });
  }

  async filtrar(filtro) {
    return await api.get(this.url + "filtro" + filtro).catch((err) => {
      throw err;
    });
  }
}
export default new ColaboradorSrv();
