import api from "../../services/axios-common";

class SolicitanteSrv {
  url = "/solicitantes";

  async getSolicitantes() {
    try {
      const response = await api.get(this.url);
      return response.data;
    } catch (error) {}
  }

  async postSolicitantes(Solicitante) {
    try {
      const response = await api.post(this.url, JSON.stringify(Solicitante));
      return response.data;
    } catch (error) {}
  }

  async putSolicitantes(Solicitante) {
    try {
      const response = await api.put(this.url, JSON.stringify(Solicitante));
      return response.data;
    } catch (error) {}
  }

  async deletSolicitantes(id) {
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
export default new SolicitanteSrv();
