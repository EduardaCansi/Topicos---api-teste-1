import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ColaboradorList = (props) => {
  const operacoes = (row) => (
    <>
      <Button
        type="button"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text "
        label="Editar"
        onClick={() => props.editar(row._id)}
      ></Button>
      <Button
        type="button"
        icon="pi pi-trash"
        className="p-button-rounded p-button-text "
        label="Cancelar"
        onClick={() => props.excluir(row._id)}
      ></Button>
    </>
  );

  return (
    <div>
      <h4>Manter Colaborador</h4>

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
          value={props.colaboradores}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          selectionMode="single"
          selection={props.colaborador}
          onSelectionChange={(e) => props.setColaboradores(e.value)}
        >
          <Column field="nome" header="Nome" sortable filter></Column>
          <Column field="email" header="Email" sortable filter></Column>
          <Column header="Operações" body={operacoes}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default ColaboradorList;
