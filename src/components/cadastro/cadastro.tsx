import { ReactNode } from "react";
import "./cadastro.scss"
import Header from "../header/header";

interface CadastrarProdutoProps {
    children?: ReactNode,
    text?: string,
    modulo?: string
}

function CadastrarProduto({
    children,
    text,
    modulo
}: CadastrarProdutoProps) {
    return (
        <>
        <div>
            <Header /> 
            <div className="container-cadastro">
                <h1>{text}</h1>
                <div className="content">
                    <h2>{modulo}</h2>
                    <div className="content-input">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CadastrarProduto;