import { ReactNode } from "react";
import "./cadastro.scss"

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
        <div className="container-cadastro">
            <h1>{text}</h1>
            <div className="content">
                <h2>{modulo}</h2>
                <div className="content-input">
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

export default CadastrarProduto;