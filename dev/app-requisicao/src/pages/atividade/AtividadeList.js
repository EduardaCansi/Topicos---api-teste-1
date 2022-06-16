import "../../App.css";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const AtividadeList = (props) => {

    const dataPrazo = (row) => {
        const prazo = new Date(row.prazo);
        return prazo.toLocaleString();

    };
    const dataAgendaInicio = (row) => {
        const agendaInicio = new Date(row.agendaInicio);
        return agendaInicio.toLocaleString();
    };
    const dataHoraTermino = (row) => {
        const dataHoraTermino = new Date(row.dataHoraTermino);
        return dataHoraTermino.toLocaleString();
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
            <h4 style={{ textAlign: "center" }}>Manter Atividades</h4>

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
                    value={props.atividades}
                    paginator
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    selectionMode="single"
                    selection={props.atividade}
                    onSelectionChange={(e) => props.setAtividades(e.value)}
                >
                    <Column field="titulo" header="Titulo" sortable filter></Column>
                    <Column field="descricao" header="Descrição" sortable filter></Column>
                    <Column field="status" header="Status" sortable filter></Column>
                    <Column
                        field="prazo"
                        header="Prazo"
                        sortable
                        filter
                        body={dataPrazo}
                    ></Column>
                    <Column
                        field="agendaInicio"
                        header="Agenda Inicio"
                        sortable
                        filter
                        body={dataAgendaInicio}
                    ></Column>
                    <Column
                        field="dataHoraTermino"
                        header="Data e Hora do Término"
                        sortable
                        filter
                        body={dataHoraTermino}
                    ></Column>
                    <Column
                        field="requisicao.titulo"
                        header="Requisição"
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
export default AtividadeList;
