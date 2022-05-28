import "../../App.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const RequisicaoList = (props) => {
  const operacoes = (row) => (
    <>
      <button
        onClick={() => props.editar(row._id)}
        className="btn btn-primary btn-sm"
      >
        Editar
      </button>
      <button
        onClick={() => props.excluir(row._id)}
        className="btn btn-danger btn-sm"
      >
        Excluir
      </button>
    </>
  );

  return (
    <div>
      <h4>Manter Requisições</h4>

      <button
        onClick={props.onClickAtualizar}
        type="button"
        class="btn btn-primary btn-sm"
      >
        Atualizar Lista
      </button>

      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={props.inserir}
      >
        Inserir
      </button>

      <div className="card">
        <DataTable
          value={props.requisicoes}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          selectionMode="single"
          selection={props.requisicao}
          onSelectionChange={(e) => props.setRequisicoes(e.value)}
        >
          <Column field="titulo" header="Titulo" sortable filter></Column>
          <Column
            field="dataHoraCriada"
            header="Data Hora Criada"
            sortable
            filter
          ></Column>
          <Column field="status" header="Status" sortable filter></Column>
          <Column
            field="tipoRequisicao"
            header="Tipo Requisição"
            sortable
            filter
          ></Column>
          <Column
            field="solicitante"
            header="Solicitante"
            sortable
            filter
          ></Column>
          <Column header="Operações" body={operacoes}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default RequisicaoList;
