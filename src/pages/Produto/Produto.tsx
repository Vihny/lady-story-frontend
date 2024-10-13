import Input from "../../ui/components/Input/Input";
import './Produto.scss'

function Produto() {
    return (
        <>
        <h1>Gerenciamento de Produtos</h1>
        <div className="container">
            <h2>Cadastrar Produto</h2>
            <div className="content-input">
                <Input label='Nome do Produto' placeholder='Ex: Camisa' type='text' />
                <Input label='Tipo de Produto' placeholder='Ex: Malha' type='text' />
                <Input label='Modelo do Produto' placeholder='Ex: Gola Polo' type='text' />
                <Input label='Fornecedor' placeholder='Ex: Adidas' type='text' />
                <Input label='Cor do Produto' placeholder='Ex: Verde' type='text' />
                <Input label='Tamanho do Produto' placeholder='Ex: P' type='text' />
                <Input label='Preço do Produto' placeholder='Ex: $80,00' type='text' />
            </div>
        </div>
        </>
    )
}

export default Produto;