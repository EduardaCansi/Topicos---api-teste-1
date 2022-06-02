import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import "../../App.css";

const ColaboradorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setColaborador({ ...props.colaborador, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.salvar();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h4 style={{ textAlign: "center" }}>Cadastro de Colaboradores</h4>

          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="nome">Nome*</label>
              <InputText
                name="nome"
                {...register("nome", {
                  required: { value: true, message: "Campo obrigatório!" },
                  maxLength: {
                    value: 100,
                    message: "O campo deve ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O campo deve ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.colaborador.nome}
                onChange={handleInputChange}
              />
              {errors.nome && (
                <span style={{ color: "red" }}>{errors.nome.message}</span>
              )}
            </div>
          </div>
          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="email">Email*</label>
              <InputText
                name="email"
                {...register("email", {
                  required: { value: true, message: "Campo obrigatório!" },
                })}
                defaultValue={props.colaborador.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="p-fluid grid formgrid">
            <div className="field col-12 md:col-4">
              <label htmlFor="senha">Senha*</label>
              <Password
                toggleMask
                name="senha"
                required="true"
                defaultValue={props.colaborador.senha}
                onChange={handleInputChange}
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

export default ColaboradorForm;
