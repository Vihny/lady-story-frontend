import Button from "../../ui/components/button/button";
import Cadastro from "../../ui/components/cadastro/cadastro";
import Input from "../../ui/components/input/input";
import SideNav from "../../ui/components/sidenav/sidenav";
import './cadrastrar-cliente.scss'

function CadastrarCliente() {
    return (
        <>
        <div className="container-cliente">
            <SideNav />
            <Cadastro text="Gerenciamento de Clientes" modulo="Cadastrar Cliente">
                <Input label='Nome do Cliente' placeholder='Ex.: Maria Santos Silva' type='text' />
                <Input label='Data de Nascimento'  type='date'/>
                <Input label='CPF' placeholder='Ex.: 000.000.000-00' type='text' maxLength={14}/>
                <Input label='Email' placeholder='Ex.: seuemail@exemplo.com' type='email' />
                <Input label='CEP' placeholder='Ex.: 00000-000' type='text' maxLength={9} />
                <Input label='UF' placeholder='Ex.: BA' type='text' />
                <Input label='Cidade' placeholder='Ex.: Nova Cidade' type='text' />
                <Input label='Bairro' placeholder='Ex.: Centro' type='text' />
                <Input label='Rua' placeholder='Ex.: Rua das Flores' type='text' />
                <Input label='Residência' placeholder='Ex.: Casa' type='text' />
                <Input label='Complemento' placeholder='Ex.: Ao lado da padaria Pão Quente' type='text' />

                <Button icon="Activity" title="Cadastrar" className="item-ultimo"/>
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarCliente;