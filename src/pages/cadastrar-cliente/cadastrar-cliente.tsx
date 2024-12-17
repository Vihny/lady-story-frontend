import './cadastrar-cliente.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useForm } from "react-hook-form";
import { getCustomerById, setCustomer, updateCustomer } from '../../data/services/customer.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validators/customer-validator';
import { Customer } from '../../interface/customer.interface';  
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';

interface CadastrarClienteProps {
    customerId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarCliente({ customerId, onCloseModal }: CadastrarClienteProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [cpf, setCpf] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [cep, setCep] = React.useState('');

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value);


    const { data: customers, isSuccess, isFetching } = useQuery({
        queryKey: ['customer', customerId],
        queryFn: () => (customerId ? getCustomerById(customerId) : Promise.resolve(null)),
        enabled: !!customerId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    React.useEffect(() => {
        if (customerId && !isFetching && isSuccess) {
            reset(customers);
        }
    }, [customerId, customers, isFetching, isSuccess, reset]);
    
    const createClienteMutation = useMutation({
        mutationFn: setCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar o cliente.');
        },
    });

      const updateClienteMutation = useMutation({
        mutationFn: (data: Customer) => updateCustomer(customerId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', customerId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar o cliente.');
        },
    });

    const onSubmit = async (data: Customer) => {
        const formattedData = {
            ...data,
            birthdate: data.birthdate
                ? typeof data.birthdate === 'string'
                    ? data.birthdate.split('T')[0]
                    : data.birthdate.toISOString().split('T')[0]
                : '',
        };

        if (customerId) {
            updateClienteMutation.mutate(formattedData);
        } else {
            createClienteMutation.mutate(formattedData);
        }
    };

    return (
        <>
        <form className="container-cliente">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Clientes" modulo="Cadastrar Cliente">
                <Input label='Nome do Cliente' placeholder='Ex.: Maria Santos Silva' type='text' {...register('name')} error={errors.name?.message} />
                <Input label='Data de Nascimento'  type='date' {...register('birthdate')} error={errors.birthdate?.message} />
                <Input label='CPF' placeholder='Ex.: 000.000.000-00' type='cpf' {...register('cpf')}  error={errors.cpf?.message} onChange={handleCpfChange} value={cpf} />
                <Input label='Email' placeholder='Ex.: seuemail@exemplo.com' type='email' {...register('email')} error={errors.email?.message} />
                <Input label='Telefone' placeholder='Ex.: 77988889999' type='phone' {...register('phone')} error={errors.phone?.message} onChange={handlePhoneChange} value={phone} />
                <Input label='CEP' placeholder='Ex.: 00000-000' type='cep' {...register('postal_code')} error={errors.postal_code?.message} onChange={handleCepChange} value={cep} />
                <Input label='UF' placeholder='Ex.: BA' type='text' {...register('state')} error={errors.state?.message} />
                <Input label='Cidade' placeholder='Ex.: Nova Cidade' type='text' {...register('city')} error={errors.city?.message} />
                <Input label='Bairro' placeholder='Ex.: Centro' type='text' {...register('neighborhood')} error={errors.neighborhood?.message} />
                <Input label='Rua' placeholder='Ex.: Rua das Flores' type='text' {...register('street')} error={errors.street?.message} />
                <Input label='Residência' placeholder='Ex.: Casa' type='text' {...register('number')} error={errors.number?.message} />
                <Input label='Complemento' placeholder='Ex.: Ao lado da padaria Pão Quente' type='text' {...register('complement')} error={errors.complement?.message} />

                <Button icon={customerId ? "Activity" : "PlusCircle"} title={customerId ? "Atualizar" : "Cadastrar"} className="btn-cliente" onPress={handleSubmit(onSubmit)}/>
            </Cadastro>
        </form>
        </> 
    )
}

export default CadastrarCliente;