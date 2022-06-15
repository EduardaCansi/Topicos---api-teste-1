import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { locale } from "primereact/api";
import AtividadeSrv from "../atividade/AtividadeSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";

const AndamentoForm = (props) => {
    const [atividades, setAtividades] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);

    //locale("br");

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
        props.setAndamento({ ...props.andamento, [name]: value });
    };

    const atualizarLista = () => {
        AtividadeSrv.getAtividades().then((resp) => {
            setAtividades(
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
                    <h4 style={{ textAlign: "center" }}>Cadastro de Andamento</h4>

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
                                defaultValue={props.andamento.titulo}
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
                                defaultValue={props.andamento.descricao}
                                onChange={handleInputChange}
                            />
                            {errors.descricao && (
                                <span style={{ color: "red" }}>{errors.descricao.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataHoraTermino">Data Hora*</label>
                            <Calendar
                                name="dataHoraTermino"
                                value={props.andamento.dataHoraTermino}
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
                        <div class="field col-12 md:col-4">
                            <label htmlFor="atividade">Atividades*</label>
                            <Dropdown
                                name="atividade"
                                value={props.andamento.atividade}
                                options={atividades}
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
                                value={props.andamento.colaborador}
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

export default AndamentoForm;
