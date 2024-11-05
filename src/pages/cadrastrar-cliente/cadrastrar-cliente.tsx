import './cadrastrar-cliente.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { setCustomer } from '../../data/services/customer.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validators/customer-validator';
import { Customer } from '../../interface/customer.interface';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../ui/components/button/button";
import Cadastro from "../../ui/components/cadastro/cadastro";
import Input from "../../ui/components/input/input";
import SideNav from "../../ui/components/sidenav/sidenav";

function CadastrarCliente() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = async (data: Customer) => {
        const formatDate = format(new Date(data.birthdate as string), 'yyyy-MM-dd');
        const payload = {
            ...data,
            birthdate: formatDate,
        };
        await setCustomer(payload);
        reset();
        toast.success('Cliente cadastrado com sucesso!');
    }

    return (
        <>
        <form className="container-cliente">
            <ToastContainer />
            <SideNav />
            <Cadastro text="Gerenciamento de Clientes" modulo="Cadastrar Cliente">
                <Input label='Nome do Cliente' placeholder='Ex.: Maria Santos Silva' type='text' {...register('name')} error={errors.name?.message} />
                <Input label='Data de Nascimento'  type='date' {...register('birthdate')} error={errors.birthdate?.message} />
                <Input label='CPF' placeholder='Ex.: 000.000.000-00' type='text' {...register('cpf')} error={errors.cpf?.message} />
                <Input label='Email' placeholder='Ex.: seuemail@exemplo.com' type='email' {...register('email')} error={errors.email?.message} />
                <Input label='Telefone' placeholder='Ex.: 77988889999' type='text' {...register('phone')} error={errors.phone?.message} />
                <Input label='CEP' placeholder='Ex.: 00000-000' type='text' {...register('postal_code')} error={errors.postal_code?.message} />
                <Input label='UF' placeholder='Ex.: BA' type='text' {...register('state')} error={errors.state?.message} />
                <Input label='Cidade' placeholder='Ex.: Nova Cidade' type='text' {...register('city')} error={errors.city?.message} />
                <Input label='Bairro' placeholder='Ex.: Centro' type='text' {...register('neighborhood')} error={errors.neighborhood?.message} />
                <Input label='Rua' placeholder='Ex.: Rua das Flores' type='text' {...register('street')} error={errors.street?.message} />
                <Input label='Residência' placeholder='Ex.: Casa' type='text' {...register('number')} error={errors.number?.message} />
                <Input label='Complemento' placeholder='Ex.: Ao lado da padaria Pão Quente' type='text' {...register('complement')} error={errors.complement?.message} />

                <Button icon="Activity" title="Cadastrar" className="item-ultimo" onPress={handleSubmit(onSubmit)}/>
            </Cadastro>
        </form>
        </>
    )
}

export default CadastrarCliente;