const ProdutoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setProduto({ ...props.produto, [name]: value });
  };

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="form-group col-sm-6">
            <label>Nome</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={props.produto.nome}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-sm-6">
            <label>Descricao</label>
            <input
              className="form-control"
              type="text"
              name="descricao"
              value={props.produto.descricao}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-6">
            <label>Estoque</label>
            <input
              className="form-control"
              type="number"
              name="estoque"
              value={props.produto.estoque}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-sm-6">
            <label>Preco Unitário</label>
            <input
              className="form-control"
              type="number"
              name="precoUnitario"
              value={props.produto.precoUnitario}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <button
              type="button"
              onClick={props.salvar}
              className="btn btn-primary btn-sm m-2"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={props.cancelar}
              className="btn btn-secondary btn-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProdutoForm;
