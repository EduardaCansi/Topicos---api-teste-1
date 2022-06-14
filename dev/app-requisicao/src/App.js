import "./App.css";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";

const Home = lazy(() => import("./pages/home/Home"));
const ColaboradorCon = lazy(() => import("./pages/colaborador/ColaboradorCon"));
const SolicitanteCon = lazy(() => import("./pages/solicitante/SolicitanteCon"));
const TipoRequisicaoCon = lazy(() => import("./pages/tipoRequisicao/TipoRequisicaoCon"));
const RequisicaoCon = lazy(() => import("./pages/requisicao/RequisicaoCon"));
const AtividadeCon = lazy(() => import("./pages/atividade/AtividadeCon"));
const AndamentoCon = lazy(() => import("./pages/andamento/AndamentoCon"));

sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiMDI2NjQ5OTEyNDQ3NTNhNmUxOGUiLCJub21lIjoiQWJlbGhhIGFsdGVyYWRvIiwiaWF0IjoxNjU1MTY1MjM5LCJleHAiOjE2NTc3NTcyMzl9.57Fv5thc4zgBavVun2iX5W2NdziqSqOE1Nf2wUKlBds')

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
          <Route path="/solicitantes" element={<SolicitanteCon />} />
          <Route path="/tipoRequisicoes" element={<TipoRequisicaoCon />} />
          <Route path="/requisicoes" element={<RequisicaoCon />} />
          <Route path="/atividades" element={<AtividadeCon />} />
          <Route path="/andamentos" element={<AndamentoCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
