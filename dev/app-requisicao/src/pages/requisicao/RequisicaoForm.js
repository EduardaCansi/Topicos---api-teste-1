import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { locale } from "primereact/api";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";

const RequisicaoForm = (props) => {
  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);

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
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const atualizarLista = () => {
    TipoRequisicaoSrv.getTipoRequisicoes().then((resp) => {
      setTipoRequisicoes(
        resp.map((tipo) => ({ label: tipo.descricao, value: tipo._id }))
      );
    });
    SolicitanteSrv.getSolicitantes().then((resp) => {
      setSolicitantes(
        resp.map((tipo) => ({ label: tipo.nome, value: tipo._id }))
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h4 style={{ textAlign: "center" }}>Cadastro de Requisições</h4>

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
                defaultValue={props.requisicao.titulo}
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
                defaultValue={props.requisicao.descricao}
                onChange={handleInputChange}
              />
              {errors.descricao && (
                <span style={{ color: "red" }}>{errors.descricao.message}</span>
              )}
            </div>
          </div>

          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="dataHoraCriada">Data Hora Criada*</label>
              <Calendar
                name="dataHoraCriada"
                value={props.requisicao.dataHoraCriada}
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
              <label htmlFor="prazoAtendimento">Prazo Atendimento*</label>
              <Calendar
                name="prazoAtendimento"
                value={props.requisicao.prazoAtendimento}
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
                defaultValue={props.requisicao.status}
                onChange={handleInputChange}
              />
              {errors.status && (
                <span style={{ color: "red" }}>{errors.status.message}</span>
              )}
            </div>
          </div>

          <div className="p-fluid grid formgrid">
            <div class="field col-12 md:col-4">
              <label htmlFor="tipoRequisicao">Tipo Requisicao*</label>
              <Dropdown
                name="tipoRequisicao"
                value={props.requisicao.tipoRequisicao}
                options={tipoRequisicoes}
                onChange={handleInputChange}
                placeholder="Selecione o Tipo de Requisição"
              />
            </div>
          </div>

          <div className="p-fluid grid formgrid">
            <div class="field col-12 md:col-4">
              <label htmlFor="solicitante">Solicitante*</label>
              <Dropdown
                name="solicitante"
                value={props.requisicao.solicitante}
                options={solicitantes}
                onChange={handleInputChange}
                placeholder="Selecione o Solicitante"
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

export default RequisicaoForm;
