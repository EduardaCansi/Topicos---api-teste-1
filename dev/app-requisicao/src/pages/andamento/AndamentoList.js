import "../../App.css";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const AndamentoList = (props) => {

    const parseDate = (row) => {
        const data = new Date(row.dataHoraTermino);

        return data.toLocaleString();
    };

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
                label="Excluir"
                onClick={() => props.excluir(row._id)}
            ></Button>
        </>
    );

    return (
        <div style={{ padding: 15 }}>
            <h4 style={{ textAlign: "center" }}>Manter Andamento</h4>

            <div style={{ textAlign: "end", padding: 5 }}>
                <Button
                    type="button"
                    icon="pi pi-refresh"
                    className="p-button-raised p-button-rounded p-button-text"
                    label="Atualizar Lista"
                    onClick={props.onClickAtualizar}
                ></Button>
                <Button
                    type="button"
                    icon="pi pi-plus"
                    className="p-button-raised p-button-rounded p-button-text"
                    label="Inserir"
                    onClick={props.inserir}
                ></Button>
            </div>

            <div className="card">
                <DataTable
                    value={props.andamentos}
                    paginator
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    selectionMode="single"
                    selection={props.andamento}
                    onSelectionChange={(e) => props.setAndamentos(e.value)}
                >
                    <Column field="titulo" header="Titulo" sortable filter></Column>
                    <Column field="descricao" header="Descrição" sortable filter></Column>
                    <Column
                        field="dataHoraTermino"
                        header="Data Hora"
                        sortable
                        filter
                        body={parseDate}
                    ></Column>
                    <Column
                        field="atividade.titulo"
                        header="Atividade"
                        sortable
                        filter
                    ></Column>
                    <Column
                        field="colaborador.nome"
                        header="Colaborador"
                        sortable
                        filter
                    ></Column>
                    <Column header="Operações" body={operacoes}></Column>
                </DataTable>
            </div>
        </div>
    );
};
export default AndamentoList;
