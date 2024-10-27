import { ReactNode, useEffect } from "react";
import "./cadastro.scss"
import { getCustomer } from "../../../data/services/customer.service";
import Header from "../header/Header";

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
    useEffect(() => {
        const dados = getCustomer();
        console.log(dados)
    }, []);

    return (
        <>
        <div style={{width: "100%"}}>
                <Header /> 
            <div className="container-cadastro">
                <h1>{text}</h1>
                <div className="content">
                    <div className="container">
                        <h2>{modulo}</h2>
                        <div className="content-input">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CadastrarProduto;