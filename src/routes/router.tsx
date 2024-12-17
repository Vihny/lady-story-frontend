import { Route, Routes, useNavigate } from "react-router-dom";
import CadastrarProduto from "../pages/cadastrar-produto/cadastrar-produto";
import CadastrarCliente from "../pages/cadastrar-cliente/cadastrar-cliente";
import Produto from "../pages/produtos/produtos";
import Cliente from "../pages/clientes/clientes";
import Home from "../pages/home/home";
import SideNav from "../components/sidenav/sidenav";
import Financeiro from "../pages/financeiro/financeiro";
import Estoque from "../pages/estoque/estoque";
import Fornecedor from "../pages/fornecedor/fornecedor";

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
          <Route path="/cadastrar-produto" element={ <CadastrarProduto /> } />
          <Route path="/cadastrar-produto/:id" element={ <CadastrarProduto /> } />
          <Route path="/cadastrar-cliente" element={ <CadastrarCliente /> } />
          <Route path="/cadastrar-cliente/:id" element={<CadastrarCliente />} />
      </Routes>
    </div>
  )
}

export default Rotas;