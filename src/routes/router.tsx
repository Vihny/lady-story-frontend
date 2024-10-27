import { BrowserRouter, Route, Routes } from "react-router-dom";
import Produto from "../pages/produto/produto";
import Home from "../pages/home/home";

const Rotas = () => {
  return(
      <BrowserRouter>
      <Routes>
          <Route path="/produtos" element={ <Produto /> } />
          <Route path="/" element={ <Home /> } />
      </Routes>
      </BrowserRouter>
  )
}

export default Rotas;