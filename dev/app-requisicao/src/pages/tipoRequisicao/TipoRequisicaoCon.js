import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TipoRequisicaoList from "./TipoRequisicaoList";
import TipoRequisicaoForm from "./TipoRequisicaoForm";
import TipoRequisicaoSrv from "./TipoRequisicaoSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function TipoRequisicaoCon() {
  const initialState = { id: null, descricao: "" };
  const [tipoRequisicao, setTipoRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    TipoRequisicaoSrv.getTipoRequisicoes()
      .then((resp) => {
        setTipoRequisicoes(resp);
        toastRef.current.show({
          severity: "sucess",
          summary: "Usuários atualizados",
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
    setTipoRequisicao(
      tipoRequisicoes.filter((tipoRequisicao) => tipoRequisicao._id == _id)[0]
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
    TipoRequisicaoSrv.deletTipoRequisicoes(_id)
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
    setTipoRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (tipoRequisicao._id == null) {
      // inclussão
      TipoRequisicaoSrv.postTipoRequisicoes(tipoRequisicao)
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
      TipoRequisicaoSrv.putTipoRequisicoes(tipoRequisicao)
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
        <TipoRequisicaoList
          tipoRequisicoes={tipoRequisicoes}
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
        <TipoRequisicaoForm
          tipoRequisicao={tipoRequisicao}
          setTipoRequisicao={setTipoRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}

export default TipoRequisicaoCon;
