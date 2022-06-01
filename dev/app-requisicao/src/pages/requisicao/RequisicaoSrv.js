import api from "../../services/axios-common";

class RequisicaoSrv {
  url = "/requisicao";

  async getRequisicoes() {
    try {
      const response = await api.get(this.url);
      return response.data;
    } catch (error) {}
  }

  async postRequisicoes(Requisicao) {
    try {
      const response = await api.post(this.url, JSON.stringify(Requisicao));
      return response.data;
    } catch (error) {}
  }

  async putRequisicoes(Requisicao) {
    try {
      const response = await api.put(this.url, JSON.stringify(Requisicao));
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
