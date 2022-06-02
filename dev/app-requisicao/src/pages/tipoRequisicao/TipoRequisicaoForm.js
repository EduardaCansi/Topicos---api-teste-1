import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const TipoRequisicaoForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.salvar();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoRequisicao({ ...props.tipoRequisicao, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h4 style={{ textAlign: "center" }}>
            Cadastro de Tipos de Requisições
          </h4>

          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descrição*</label>
              <InputText
                name="descricao"
                {...register("descricao", {
                  required: { value: true, message: "Campo obrigatório!" },
                  maxLength: {
                    value: 100,
                    message: "O campo deve ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 5,
                    message: "O campo deve ter no mínimo 5 caracteres!",
                  },
                })}
                defaultValue={props.tipoRequisicao.descricao}
                onChange={handleInputChange}
              />
              {errors.descricao && (
                <span style={{ color: "red" }}>{errors.descricao.message}</span>
              )}
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

export default TipoRequisicaoForm;
