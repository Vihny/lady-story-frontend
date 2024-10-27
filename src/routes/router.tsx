import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarProduto from "../pages/CadrastrarProduto/CadrastrarProduto";
import Home from "../pages/home/Home";
import CadastrarCliente from "../pages/CadrastrarCliente/CadrastrarCliente";


const Rotas = () => {
  return(
      <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/produtos" element={ <CadastrarProduto /> } />
          <Route path="/clientes" element={ <CadastrarCliente /> } />
      </Routes>
      </BrowserRouter>
  )
}

export default Rotas;