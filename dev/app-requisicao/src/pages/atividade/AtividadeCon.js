import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AtividadeList from "./AtividadeList";
import AtividadeForm from "./AtividadeForm";
import AtividadeSrv from "./AtividadeSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function AtividadeCon() {
    const initialState = { id: null, descricao: "" };
    const [atividade, setAtividade] = useState(initialState);
    const [editando, setEditando] = useState(false);
    const [atividades, setAtividades] = useState([]);
    const toastRef = useRef();

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        AtividadeSrv.getAtividades()
            .then((resp) => {
                setAtividades(resp);
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
        setAtividade(atividades.filter((atividade) => atividade._id == _id)[0]);
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
        AtividadeSrv.deletAtividades(_id)
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
        setAtividade(initialState);
        setEditando(true);
    };

    const salvar = () => {
        if (atividade._id == null) {
            // inclussão
            AtividadeSrv.postAtividades(atividade)
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
            AtividadeSrv.putAtividades(atividade)
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
                <AtividadeList
                    atividades={atividades}
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
                <AtividadeForm
                    atividade={atividade}
                    setAtividade={setAtividade}
                    salvar={salvar}
                    cancelar={cancelar}
                />
            </div>
        );
    }
}

export default AtividadeCon;
