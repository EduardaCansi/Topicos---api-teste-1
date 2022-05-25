import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";

const RequisicaoForm = (props) => {
  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);

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
  };

  return (
    <form>
      <div class="form-group">
        <label>Titulo</label>
        <input
          class="form-control"
          type="text"
          name="titulo"
          value={props.requisicao.titulo}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input
          class="form-control"
          type="text"
          name="descricao"
          value={props.requisicao.descricao}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Data Hora Criada</label>
        <input
          class="form-control"
          type="date"
          name="dataHoraCriada"
          value={props.requisicao.dataHoraCriada}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Status</label>
        <input
          class="form-control"
          type="text"
          name="status"
          value={props.requisicao.status}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Prazo Atendimento</label>
        <input
          class="form-control"
          type="date"
          name="prazoAtendimento"
          value={props.requisicao.prazoAtendimento}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Tipo Requisicao</label>

        <Dropdown
          name="tipoRequisicao"
          value={props.requisicao.tipoRequisicao}
          options={tipoRequisicoes}
          onChange={handleInputChange}
          placeholder="Select a City"
        />
      </div>
      <div class="form-group">
        <label>solicitante</label>
        <input
          class="form-control"
          type="date"
          name="solicitante"
          value={props.requisicao.solicitante}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <button
          type="button"
          onClick={props.salvar}
          className="btn btn-primary btn-sm"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={props.cancelar}
          className="btn btn-primary btn-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default RequisicaoForm;
