import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";

const RequisicaoForm = (props) => {
  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);

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
          <h5>Cadastro de Requisições</h5>

          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="titulo">Titulo</label>
              <InputText
                name="titulo"
                {...register("titulo", {
                  required: { value: true, message: "O titulo é obrigatório!" },
                  maxLength: {
                    value: 50,
                    message: "O titulo pode ter no máximo 50 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O titulo pode ter no mínimo 2 caracteres!",
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
              <label htmlFor="descricao">Descrição</label>
              <InputText
                name="descricao"
                {...register("descricao", {
                  required: {
                    value: true,
                    message: "O descrição é obrigatório!",
                  },
                  maxLength: {
                    value: 50,
                    message: "O descrição pode ter no máximo 50 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O descrição pode ter no mínimo 2 caracteres!",
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

          <div>
            <Button
              type="submit"
              icon="pi pi-check"
              className="p-button-rounded p-button-text "
              label="Salvar"
            ></Button>
            <Button
              type="button"
              icon="pi pi-times"
              className="p-button-rounded p-button-text"
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
