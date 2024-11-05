import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarProduto from "../pages/cadrastrar-produto/cadrastrar-produto";
import CadastrarCliente from "../pages/cadrastrar-cliente/cadrastrar-cliente";
import Produto from "../pages/produtos/produtos";
import Cliente from "../pages/clientes/clientes";
import Home from "../pages/home/Home";


const Rotas = () => {
  return(
      <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/produtos" element={ <Produto /> } />
          <Route path="/clientes" element={ <Cliente /> } />
          <Route path="/cadastrar-produto" element={ <CadastrarProduto /> } />
          <Route path="/cadastrar-cliente" element={ <CadastrarCliente /> } />
      </Routes>
      </BrowserRouter>
  )
}

export default Rotas;