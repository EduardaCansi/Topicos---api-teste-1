import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";

const AtividadeForm = (props) => {
    const [requisicoes, setRequisicoes] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        props.salvar();
    };

    useEffect(() => {
        atualizarLista();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        props.setAtividade({ ...props.atividade, [name]: value });
    };

    const atualizarLista = () => {
        RequisicaoSrv.getRequisicoes().then((resp) => {
            setRequisicoes(
                resp.map((tipo) => ({ label: tipo.titulo, value: tipo._id }))
            );
        });
        ColaboradorSrv.getColaboradores().then((resp) => {
            setColaboradores(
                resp.map((tipo) => ({ label: tipo.nome, value: tipo._id }))
            );
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: 15 }}>
                <div className="card">
                    <h4 style={{ textAlign: "center" }}>Cadastro de Atividades</h4>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="titulo">Titulo*</label>
                            <InputText
                                name="titulo"
                                {...register("titulo", {
                                    required: { value: true, message: "Campo obrigatório!" },
                                    maxLength: {
                                        value: 50,
                                        message: "O campo deve ter no máximo 50 caracteres!",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "O campo deve ter no mínimo 2 caracteres!",
                                    },
                                })}
                                defaultValue={props.atividade.titulo}
                                onChange={handleInputChange}
                            />
                            {errors.titulo && (
                                <span style={{ color: "red" }}>{errors.titulo.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="descricao">Descrição*</label>
                            <InputText
                                name="descricao"
                                {...register("descricao", {
                                    required: {
                                        value: true,
                                        message: "Campo obrigatório!",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "O campo deve ter no máximo 50 caracteres!",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "O campo deve ter no mínimo 2 caracteres!",
                                    },
                                })}
                                defaultValue={props.atividade.descricao}
                                onChange={handleInputChange}
                            />
                            {errors.descricao && (
                                <span style={{ color: "red" }}>{errors.descricao.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="status">Status*</label>
                            <InputText
                                name="status"
                                {...register("status", {
                                    required: {
                                        value: true,
                                        message: "Campo obrigatório!",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "O campo deve ter no máximo 50 caracteres!",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "O campo deve ter no mínimo 2 caracteres!",
                                    },
                                })}
                                defaultValue={props.atividade.status}
                                onChange={handleInputChange}
                            />
                            {errors.status && (
                                <span style={{ color: "red" }}>{errors.status.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="prazo">Prazo Atendimento*</label>
                            <Calendar
                                name="prazo"
                                value={props.atividade.prazo}
                                onChange={handleInputChange}
                                showTime
                                showSeconds
                                dateFormat="dd/mm/yy"
                                showButtonBar
                                required="true"
                                showIcon
                            />
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="agendaInicio">Agenda Inicio*</label>
                            <Calendar
                                name="agendaInicio"
                                value={props.atividade.agendaInicio}
                                onChange={handleInputChange}
                                showTime
                                showSeconds
                                dateFormat="dd/mm/yy"
                                showButtonBar
                                required="true"
                                showIcon
                            />
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataHoraTermino">Data e Hora do Termino*</label>
                            <Calendar
                                name="dataHoraTermino"
                                value={props.atividade.dataHoraTermino}
                                onChange={handleInputChange}
                                showTime
                                showSeconds
                                dateFormat="dd/mm/yy"
                                showButtonBar
                                showIcon
                            />
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div class="field col-12 md:col-4">
                            <label htmlFor="requisicao">Requisicao*</label>
                            <Dropdown
                                name="requisicao"
                                value={props.atividade.requisicao}
                                options={requisicoes}
                                onChange={handleInputChange}
                                placeholder="Selecione a Requisição"
                            />
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div class="field col-12 md:col-4">
                            <label htmlFor="colaborador">Colaborador*</label>
                            <Dropdown
                                name="colaborador"
                                value={props.atividade.colaborador}
                                options={colaboradores}
                                onChange={handleInputChange}
                                placeholder="Selecione o Colaborador"
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: "center", padding: 8 }}>
                        <Button
                            type="submit"
                            icon="pi pi-check"
                            className="p-button-raised p-button-rounded p-button-text"
                            label="Salvar"
                        ></Button>
                        <Button
                            type="button"
                            icon="pi pi-times"
                            className="p-button-raised p-button-rounded p-button-text"
                            label="Cancelar"
                            onClick={props.cancelar}
                        ></Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AtividadeForm;
