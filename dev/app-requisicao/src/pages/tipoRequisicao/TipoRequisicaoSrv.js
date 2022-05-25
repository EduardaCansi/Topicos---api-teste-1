import api from "../../services/axios-common";

class TipoRequisicaoSrv {
  url = "/tipoRequisicoes";

  async getTipoRequisicoes() {
    try {
      const response = await api.get(this.url);
      return response.data;
    } catch (error) {}
  }

  async postTipoRequisicoes(TipoRequisicao) {
    try {
      const response = await api.post(this.url, JSON.stringify(TipoRequisicao));
      return response.data;
    } catch (error) {}
  }

  async putTipoRequisicoes(TipoRequisicao) {
    try {
      const response = await api.put(this.url, JSON.stringify(TipoRequisicao));
      return response.data;
    } catch (error) {}
  }

  async deletTipoRequisicoes(id) {
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
export default new TipoRequisicaoSrv();
