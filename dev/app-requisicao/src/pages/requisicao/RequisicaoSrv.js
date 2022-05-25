import api from "../../services/axios-common";

class RequisicaoSrv {
  url = "/requisicoes";

  async getRequisicoes() {
    try {
      const response = await api.get(this.url);
      return response.data;
    } catch (error) {}
  }

  async postRequisicoes(requisicao) {
    try {
      const response = await api.post(this.url, JSON.stringify(requisicao));
      return response.data;
    } catch (error) {}
  }

  async putRequisicoes(requisicao) {
    try {
      const response = await api.put(this.url, JSON.stringify(requisicao));
      return response.data;
    } catch (error) {}
  }

  async deletRequisicoes(id) {
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
export default new RequisicaoSrv();
