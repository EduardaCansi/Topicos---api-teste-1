import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

function Menu() {
  let navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Cadastro",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Colaboradores",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/colaboradores");
          },
        },
        {
          label: "Solicitantes",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/solicitantes");
          },
        },
        {
          label: "Tipo Requisição",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/tipoRequisicoes");
          },
        },
        {
          label: "Requisição",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/requisicoes");
          },
        },
        {
          label: "Atividades",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/atividades");
          },
        },
        {
          label: "Andamento",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/andamentos");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        sessionStorage.setItem('token',
          '');
      },
      url: '/'
    },
  ];

  return <Menubar model={items} />;
}

export default Menu;
