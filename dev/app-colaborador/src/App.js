import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColaboradorList from "./ColaboradorList";
import ColaboradorForm from "./ColaboradorForm";
import ColaboradorSrv from "./services/ColaboradorSrv";
import PrimeReact from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";

function App() {
  const [colaboradores, setColaboradores] = useState([]);
  const toastRef = useRef();
  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    ColaboradorSrv.getColaboradores()
      .then((resp) => {
        setColaboradores(resp);
        console.log("Usuarios atualizados");
      })
      .catch((e) => {
        console.log("Erro: " + e.message);
      });
  };

  const editar = (id) => {
    setColaborador(
      colaboradores.filter((colaborador) => colaborador._id == id)[0]
    );
    setEditando(true);
  };

  const excluir = (id) => {
    ColaboradorSrv.deletColaboradores(id).then(() => atualizarLista());
  };

  // operação inserir
  const initialState = { id: null, nome: "", email: "", senha: "" };
  const [colaborador, setColaborador] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setColaborador(initialState);
    setEditando(true);
  };

  const salvar = () => {
    console.log("Salvar ...");
    if (colaborador._id == null) {
      // inclussão
      ColaboradorSrv.postColaboradores(colaborador).then(() =>
        atualizarLista()
      );
    } else {
      // alteração
      ColaboradorSrv.putColaboradores(colaborador).then(() => atualizarLista());
    }
    setEditando(false);
  };

  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
  };

  if (!editando) {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <ColaboradorList
          colaboradores={colaboradores}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
          onClickAtualizar={atualizarLista}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ColaboradorForm
          colaborador={colaborador}
          setColaborador={setColaborador}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}

export default App;
