import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarProduto from "../pages/cadrastrar-produto/cadrastrar-produto";
import CadastrarCliente from "../pages/cadrastrar-cliente/cadrastrar-cliente";
import Produto from "../pages/produtos/produtos";
import Cliente from "../pages/clientes/clientes";
import Home from "../pages/home/home";
import SideNav from "../components/sidenav/sidenav";


const Rotas = () => {
  return(
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <SideNav />
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/produtos" element={ <Produto /> } />
              <Route path="/clientes" element={ <Cliente /> } />
              <Route path="/cadastrar-produto" element={ <CadastrarProduto /> } />
              <Route path="/cadastrar-produto/:id" element={ <CadastrarProduto /> } />
              <Route path="/cadastrar-cliente" element={ <CadastrarCliente /> } />
              <Route path="/cadastrar-cliente/:id" element={<CadastrarCliente />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default Rotas;