import './App.css';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ColaboradorList from './ColaboradorList';
import ColaboradorForm from './ColaboradorForm';
import { deletColaboradores, deleteColaboradores, getColaboradores, postColaboradores, putColaboradores } from './Api';

function App() {

  

  const [colaboradores, setColaboradores] = useState([])
  useEffect(()=>{
    atualizarLista();
  }, [])

  const atualizarLista = () => {
    getColaboradores().then((resp)=>{
      setColaboradores(resp);
    })
  }

  const editar = (id) => {
    setColaborador(colaboradores.filter((colaborador) => colaborador._id == id)[0]);
    setEditando(true);
  }

  const excluir = (id) => {
    deletColaboradores(id).then(()=> atualizarLista())
  }

  // operação inserir
  const initialState = { id: null, nome: '', email: '', senha: '' }
  const [colaborador, setColaborador] = useState(initialState)
  const [editando, setEditando] = useState(false)
  const inserir = () => {
    setColaborador(initialState);
    setEditando(true);
  }

  const salvar = () => {
    console.log('Salvar ...');
    if (colaborador._id == null) { // inclussão
      postColaboradores(colaborador).then(()=> atualizarLista());
    } else { // alteração
      putColaboradores(colaborador).then(()=> atualizarLista());
    }
    setEditando(false);
  }

  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  }

  if (!editando) {
    return (
      <div className="App">
        <ColaboradorList colaboradores={colaboradores}
          inserir={inserir} editar={editar} excluir={excluir} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ColaboradorForm colaborador={colaborador} setColaborador={setColaborador}
          salvar={salvar} cancelar={cancelar} />
      </div>
    );
  }
}

export default App;
