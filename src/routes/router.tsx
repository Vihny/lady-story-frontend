import { Route, Routes, useNavigate } from "react-router-dom";
import Produto from "../pages/produtos/produtos";
import Cliente from "../pages/clientes/clientes";
import Home from "../pages/Home/Home";
import SideNav from "../components/sidenav/sidenav";
import Financeiro from "../pages/financeiro/financeiro";
import Estoque from "../pages/estoque/estoque";
import Fornecedor from "../pages/fornecedor/fornecedor";
import Vendas from "../pages/vendas/vendas";

const Rotas = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return(
    <div style={{ display: "flex" }}>
    <SideNav handleNavigation={handleNavigation} />
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/produtos" element={ <Produto /> } />
          <Route path="/clientes" element={ <Cliente /> } />
          <Route path="/financeiro" element={ <Financeiro /> } />
          <Route path="/estoque" element={ <Estoque /> } />
          <Route path="/fornecedor" element={ <Fornecedor /> } />
          <Route path="/vendas" element={ <Vendas /> } />
      </Routes>
    </div>
  )
}

export default Rotas;