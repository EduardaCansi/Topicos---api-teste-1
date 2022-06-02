import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ColaboradorList from "./ColaboradorList";
import ColaboradorForm from "./ColaboradorForm";
import ColaboradorSrv from "./ColaboradorSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function ColaboradorCon() {
  const initialState = { id: null, nome: "", email: "", senha: "" };
  const [colaborador, setColaborador] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    ColaboradorSrv.getColaboradores()
      .then((resp) => {
        setColaboradores(resp);
        toastRef.current.show({
          severity: "sucess",
          summary: "Lista atualizada",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const editar = (_id) => {
    setColaborador(
      colaboradores.filter((colaborador) => colaborador._id == _id)[0]
    );
    setEditando(true);
  };

  const excluir = (_id) => {
    confirmDialog({
      message: "Confirmar a exclusão?",
      header: "Confirmação",
      icon: "pi pi-,question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(_id),
    });
  };

  const excluirConfirm = (_id) => {
    ColaboradorSrv.deletColaboradores(_id)
      .then((resp) => {
        atualizarLista();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  // operação inserir
  const inserir = () => {
    setColaborador(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (colaborador._id == null) {
      // inclussão
      ColaboradorSrv.postColaboradores(colaborador).then((resp) => {
        setEditando(false);
        atualizarLista();
        toastRef.current
          .show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          })
          .catch((e) => {
            toastRef.current.show({
              severity: "error",
              summary: e.message,
              life: 4000,
            });
          });
      });
    } else {
      // alteração
      ColaboradorSrv.putColaboradores(colaborador)
        .then((resp) => {
          setEditando(false);
          atualizarLista();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const cancelar = () => {
    setEditando(false);
  };

  if (!editando) {
    return (
      <div>
        <Toast ref={toastRef} />
        <ConfirmDialog />
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
      <div>
        <Toast ref={toastRef} />
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

export default ColaboradorCon;
