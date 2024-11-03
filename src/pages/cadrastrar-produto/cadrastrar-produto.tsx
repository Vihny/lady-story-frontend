
import Button from "../../ui/components/button/button";
import Cadastro from "../../ui/components/cadastro/cadastro";
import Input from "../../ui/components/input/input";
import SideNav from "../../ui/components/sidenav/sidenav";
import './cadrastrar-produto.scss'

function CadastrarProduto() {
    return (
        <>
        <div className="container-produtos">
            <SideNav />
            <Cadastro text="Gerenciamento de Produtos" modulo="Cadastrar Produto">
                <Input label='Nome do Produto' placeholder='Ex.: Camisa' type='text' />
                <Input label='Tipo de Produto' placeholder='Ex.: Malha' type='text' />
                <Input label='Modelo do Produto' placeholder='Ex.: Gola Polo' type='text' />
                <Input label='Fornecedor' placeholder='Ex.: Adidas' type='text' />
                <Input label='Cor do Produto' placeholder='Ex.: Verde' type='text' />
                <Input label='Tamanho do Produto' placeholder='Ex.: P' type='text' />
                <Input label='Preço do Produto' placeholder='Ex.: $80,00' type='text' />

                <Button icon="PlusCircle" title="Cadastrar" className="item-ultimo"/>
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarProduto;