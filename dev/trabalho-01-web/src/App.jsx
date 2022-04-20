import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./App.css";
import ProdutosList from "./ProdutosList";
import ProdutosForm from "./ProdutosForm";
import ProdutoSrv from "./services/ProdutoSrv";

function App() {
  const initialState = {
    _id: null,
    nome: "",
    descricao: "",
    estoque: "",
    precoUnitario: "",
  };
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    atualizarLista();
  }, []);

  const inserir = () => {
    setProduto(initialState);
    setEditando(true);
  };

  const salvar = async () => {
    if (produto._id == null) {
      ProdutoSrv.inserirProduto(produto).then((resp) => {
        if (resp.error) {
          toastRef.current.show({
            severity: "error",
            summary: resp.error.message,
            life: 4000,
          });
        } else {
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
          atualizarLista();
        }
      });
    } else {
      ProdutoSrv.atualizarProduto(produto).then((resp) => {
        if (resp.error) {
          toastRef.current.show({
            severity: "error",
            summary: resp.error.message,
            life: 4000,
          });
        } else {
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
          atualizarLista();
        }
      });
    }
    setEditando(false);
  };

  const editar = (id) => {
    setProduto(produtos.find((produto) => produto._id === id));
    setEditando(true);
  };

  const excluir = (id) => {
    ProdutoSrv.excluirProduto(id).then((resp) => {
      if (resp.error) {
        toastRef.current.show({
          severity: "error",
          summary: resp.error.message,
          life: 4000,
        });
      } else {
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
        atualizarLista();
      }
    });
  };

  const excluirConfirm = (id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluir(id),
    });
  };

  const cancelar = () => {
    setEditando(false);
  };

  const atualizarLista = () => {
    ProdutoSrv.getProdutos().then((resp) => {
      if (Array.isArray(resp)) {
        setProdutos(resp);

        toastRef.current.show({
          severity: "success",
          summary: "Produtos atualizados",
          life: 3000,
        });
      } else if (resp.error) {
        toastRef.current.show({
          severity: "error",
          summary: resp.error.message,
          life: 3000,
        });
      }
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toastRef} />

      <div className="App">
        {editando ? (
          <ProdutosForm
            produto={produto}
            setProduto={setProduto}
            salvar={salvar}
            cancelar={cancelar}
          />
        ) : (
          <ProdutosList
            produtos={produtos}
            inserir={inserir}
            editar={editar}
            excluir={excluirConfirm}
            onClickAtualizar={atualizarLista}
          />
        )}
      </div>
    </>
  );
}

export default App;
