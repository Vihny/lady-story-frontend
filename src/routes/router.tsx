import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarProduto from "../pages/cadrastrar-produto/cadrastrar-produto";
import CadastrarCliente from "../pages/cadrastrar-cliente/cadrastrar-cliente";
import Produto from "../pages/produtos/produtos";
import Cliente from "../pages/clientes/clientes";
import Home from "../pages/home/home";
import SideNav from "../components/sidenav/sidenav";
import Financeiro from "../pages/financeiro/financeiro";
import Estoque from "../pages/estoque/estoque";
import Vendas from "../pages/vendas/vendas";
import CadastrarVenda from "../pages/cadrastrar-venda/cadrastrar-venda";


const Rotas = () => {
  return(
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <SideNav />
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/produtos" element={ <Produto /> } />
              <Route path="/clientes" element={ <Cliente /> } />
              <Route path="/financeiro" element={ <Financeiro /> } />
              <Route path="/estoque" element={ <Estoque /> } />
              <Route path="/vendas" element={ <Vendas /> } />
              <Route path="/cadastrar-produto" element={ <CadastrarProduto /> } />
              <Route path="/cadastrar-produto/:id" element={ <CadastrarProduto /> } />
              <Route path="/cadastrar-cliente" element={ <CadastrarCliente /> } />
              <Route path="/cadastrar-cliente/:id" element={<CadastrarCliente />} />
              <Route path="/cadastrar-venda" element={ <CadastrarVenda /> } />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default Rotas;