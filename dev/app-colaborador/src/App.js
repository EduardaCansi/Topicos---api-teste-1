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

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
