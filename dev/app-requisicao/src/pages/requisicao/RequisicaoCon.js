import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RequisicaoList from "./RequisicaoList";
import RequisicaoForm from "./RequisicaoForm";
import RequisicaoSrv from "./RequisicaoSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function RequisicaoCon() {
  const initialState = { id: null, descricao: "" };
  const [requisicao, setRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const [requisicoes, setRequisicoes] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    RequisicaoSrv.getRequisicoes()
      .then((resp) => {
        setRequisicoes(resp);
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
    setRequisicao(requisicoes.filter((requisicao) => requisicao._id == _id)[0]);
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
    RequisicaoSrv.deletRequisicoes(_id)
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
    setRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (requisicao._id == null) {
      // inclussão
      RequisicaoSrv.postRequisicoes(requisicao)
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
    } else {
      // alteração
      RequisicaoSrv.putRequisicoes(requisicao)
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
        <RequisicaoList
          requisicoes={requisicoes}
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
        <RequisicaoForm
          requisicao={requisicao}
          setRequisicao={setRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}

export default RequisicaoCon;
