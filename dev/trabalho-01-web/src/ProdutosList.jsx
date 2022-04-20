const ProdutosList = (props) => (
  <div>
    <h4>Listagem de produtos</h4>

    <button
      className="btn btn-primary btn-sm me-2"
      onClick={props.onClickAtualizar}
      type="button"
    >
      Atualizar Lista
    </button>
    <button
      className="btn btn-primary btn-sm"
      onClick={props.inserir}
      type="button"
    >
      Inserir
    </button>

    <table className="table">
      <thead>
        <tr>
          <th>Index</th>
          <th>ID</th>
          <th>Nome</th>
          <th>Descricao</th>
          <th>Estoque</th>
          <th>Preço unitário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.produtos.length > 0 ? (
          props.produtos.map((o, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{o._id}</td>
              <td>{o.nome}</td>
              <td>{o.descricao}</td>
              <td>{o.estoque}</td>
              <td>{o.precoUnitario}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => props.editar(o._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => props.excluir(o._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7}>Nenhum produto.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProdutosList;
