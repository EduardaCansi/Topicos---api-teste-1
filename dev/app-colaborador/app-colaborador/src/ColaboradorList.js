const ColaboradorList = (props) => {


    return (
        <div>
            <h4>Manter Colaborador</h4>

            <button onClick={props.onClickAtualizar} type="button"
                class="btn btn-primary btn-sm">Atualizar Lista</button>
            <button type="button" class="btn btn-primary btn-sm"
                onClick={props.inserir}>Inserir</button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Index</th><th>Id</th><th>Nome</th><th>Email</th><th>Senha</th>
                    </tr>
                </thead>
                <tbody>
                    {props.colaboradores.length > 0 ? (props.colaboradores.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{o._id}</td>
                            <td>{o.nome}</td>
                            <td>{o.email}</td>
                            <td>{o.senha}</td>
                            <td>
                                <button onClick={() => props.editar(o._id)} className="btn btn-primary btn-sm">Editar</button>
                                <button onClick={() => props.excluir(o._id)} className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={5}>Nenhum colaborador.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default ColaboradorList