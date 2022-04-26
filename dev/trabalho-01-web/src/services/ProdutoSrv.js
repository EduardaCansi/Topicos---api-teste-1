import api from "./axios-common";

class ProdutoSrv {
  url = "/produtos";

  getProdutos = async () => {
    try {
      const response = await api.get(this.url);

      return response?.data;
    } catch (error) {
      return { error };
    }
  };

  inserirProduto = async (produto) => {
    try {
      const newProduto = { ...produto };
      newProduto.estoque = Number(newProduto.estoque);
      newProduto.precoUnitario = Number(newProduto.precoUnitario);
      delete newProduto._id;

      const response = await api.post(this.url, JSON.stringify(newProduto));

      return response?.data;
    } catch (error) {
      return { error };
    }
  };

  atualizarProduto = async (produto) => {
    try {
      const newProduto = { ...produto };
      newProduto.estoque = Number(newProduto.estoque);
      newProduto.precoUnitario = Number(newProduto.precoUnitario);

      const response = await api.put(
        `${this.url}/${newProduto._id}`,
        JSON.stringify(newProduto)
      );

      return response?.data;
    } catch (error) {
      return { error };
    }
  };

  excluirProduto = async (id) => {
    try {
      const response = await api.delete(`${this.url}/${id}`);

      return response?.data;
    } catch (error) {
      return { error };
    }
  };
}

export default new ProdutoSrv();
