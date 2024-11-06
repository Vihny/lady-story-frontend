import './cadrastrar-cliente.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { getCustomerById, setCustomer, updateCustomer } from '../../data/services/customer.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validators/customer-validator';
import { Customer } from '../../interface/customer.interface';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../ui/components/button/button";
import Cadastro from "../../ui/components/cadastro/cadastro";
import Input from "../../ui/components/input/input";
import SideNav from "../../ui/components/sidenav/sidenav";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function CadastrarCliente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setClienteState] = useState<Customer | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id) {
            const fetchCliente = async () => {
                const clienteData = await getCustomerById(id);
                setClienteState(clienteData);
                reset(clienteData);
            };
            fetchCliente();
        }
    }, [id, reset]);
    
    const setCliente = async (data: Customer) => {
        const formatDate = format(new Date(data.birthdate as string), 'yyyy-MM-dd');
        const payload = {
            ...data,
            birthdate: formatDate,
        };
        await setCustomer(payload);
    }

    const updateCliente = async (data: Customer) => {
        const formatDate = format(new Date(data.birthdate as string), 'yyyy-MM-dd');
        const payload = {
            ...data,
            birthdate: formatDate,
        };

        if (id) await updateCustomer(id, payload);
    }

    const onSubmit = async (data: Customer) => {
        if(id) {
            await updateCliente(data);
            toast.success('Cliente atualizado com sucesso!');
            navigate('/clientes');
        } else {
            await setCliente(data);
            toast.success('Cliente cadastrado com sucesso!');
            reset();
        }
    }

    return (
        <>
        <form className="container-cliente">
            <ToastContainer />
            <SideNav />
            <Cadastro text="Gerenciamento de Clientes" modulo="Cadastrar Cliente">
                <Input label='Nome do Cliente' placeholder='Ex.: Maria Santos Silva' type='text' defaultValue={cliente?.name || ''} {...register('name')} error={errors.name?.message} />
                <Input label='Data de Nascimento'  type='date' {...register('birthdate')} error={errors.birthdate?.message} />
                <Input label='CPF' placeholder='Ex.: 000.000.000-00' type='text' defaultValue={cliente?.cpf || ''} {...register('cpf')}  error={errors.cpf?.message} />
                <Input label='Email' placeholder='Ex.: seuemail@exemplo.com' type='email' defaultValue={cliente?.email || ''} {...register('email')} error={errors.email?.message} />
                <Input label='Telefone' placeholder='Ex.: 77988889999' type='text' defaultValue={cliente?.phone || ''} {...register('phone')} error={errors.phone?.message} />
                <Input label='CEP' placeholder='Ex.: 00000-000' type='text' defaultValue={cliente?.postal_code || ''} {...register('postal_code')} error={errors.postal_code?.message} />
                <Input label='UF' placeholder='Ex.: BA' type='text' defaultValue={cliente?.state || ''} {...register('state')} error={errors.state?.message} />
                <Input label='Cidade' placeholder='Ex.: Nova Cidade' type='text' defaultValue={cliente?.city || ''} {...register('city')} error={errors.city?.message} />
                <Input label='Bairro' placeholder='Ex.: Centro' type='text' defaultValue={cliente?.neighborhood || ''} {...register('neighborhood')} error={errors.neighborhood?.message} />
                <Input label='Rua' placeholder='Ex.: Rua das Flores' type='text' defaultValue={cliente?.street || ''} {...register('street')} error={errors.street?.message} />
                <Input label='Residência' placeholder='Ex.: Casa' type='text' defaultValue={cliente?.number || ''} {...register('number')} error={errors.number?.message} />
                <Input label='Complemento' placeholder='Ex.: Ao lado da padaria Pão Quente' type='text' defaultValue={cliente?.complement || ''} {...register('complement')} error={errors.complement?.message} />

                <Button icon={id ? "Activity" : "PlusCircle"} title={id ? "Atualizar" : "Cadastrar"} className="item-ultimo" onPress={handleSubmit(onSubmit)}/>
            </Cadastro>
        </form>
        </> 
    )
}

export default CadastrarCliente;