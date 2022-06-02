import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SolicitanteList from "./SolicitanteList";
import SolicitanteForm from "./SolicitanteForm";
import SolicitanteSrv from "./SolicitanteSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function SolicitanteCon() {
  const initialState = { id: null, nome: "", email: "", senha: "" };
  const [solicitante, setSolicitante] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const [solicitantes, setSolicitantes] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    SolicitanteSrv.getSolicitantes()
      .then((resp) => {
        setSolicitantes(resp);
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
    setSolicitante(
      solicitantes.filter((solicitante) => solicitante._id == _id)[0]
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
    SolicitanteSrv.deletSolicitantes(_id)
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
    setSolicitante(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (solicitante._id == null) {
      // inclussão
      SolicitanteSrv.postSolicitantes(solicitante).then((resp) => {
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
      SolicitanteSrv.putSolicitantes(solicitante)
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
        <SolicitanteList
          solicitantes={solicitantes}
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
        <SolicitanteForm
          solicitante={solicitante}
          setSolicitante={setSolicitante}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}

export default SolicitanteCon;
