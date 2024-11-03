import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarProduto from "../pages/cadrastrar-produto/cadrastrar-produto";
import Home from "../pages/home/Home";
import CadastrarCliente from "../pages/cadrastrar-cliente/cadrastrar-cliente";
import Produto from "../pages/produtos/produtos";


const Rotas = () => {
  return(
      <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/produtos" element={ <Produto /> } />
          <Route path="/cadastrar-produto" element={ <CadastrarProduto /> } />
          <Route path="/cadastrar-cliente" element={ <CadastrarCliente /> } />
      </Routes>
      </BrowserRouter>
  )
}

export default Rotas;