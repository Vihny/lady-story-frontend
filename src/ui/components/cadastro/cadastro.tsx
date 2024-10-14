import { ReactNode } from "react";
import "./cadastro.scss"

interface CadastroProps {
    children?: ReactNode,
    text: string,
    modulo: string
}

function Cadastro({
    children,
    text,
    modulo
}: CadastroProps) {
    return (
        <>
        <div className="container-cadastro">
            <h1>{text}</h1>
            <div className="container">
                <h2>{modulo}</h2>
                <div className="content-input">
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

export default Cadastro;