import './cadastrar-fornecedor.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { getSupplierById, setSupplier, updateSupplier } from '../../data/services/supplier.service';
import { Supplier } from '../../interface/supplier.interface';
import { schema } from '../../validators/supplier-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';
import React from 'react';

interface CadastrarFornecedorProps {
    supplierId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarFornecedor({ supplierId, onCloseModal }: CadastrarFornecedorProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [cnpj, setCnpj] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [cep, setCep] = React.useState('');

    const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value);

    const { data: suppliers, isSuccess, isFetching } = useQuery({
        queryKey: ['supplier', supplierId],
        queryFn: () => (supplierId ? getSupplierById(supplierId) : Promise.resolve(null)),
        enabled: !!supplierId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    React.useEffect(() => {
        if (supplierId && !isFetching && isSuccess) {
            reset(suppliers);
        }
    }, [supplierId, suppliers, isFetching, isSuccess, reset]);
    
    const createFornecedorMutation = useMutation({
        mutationFn: setSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplier'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar o fornecedor.');
        },
    });

      const updateFornecedorMutation = useMutation({
        mutationFn: (data: Supplier) => updateSupplier(supplierId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplier', supplierId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar o fornecedor.');
        },
    });

    const onSubmit = async (data: Supplier) => {
        if (supplierId) {
            updateFornecedorMutation.mutate(data);
        } else {
            createFornecedorMutation.mutate(data);
        }
    };

    return (
        <>
        <div className="container-fornecedor">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Fornecedores" modulo={supplierId ? "Atualizar Fornecedor" : "Cadastrar Fornecedor"}>
                <Input label='Nome da empresa' placeholder='Ex.: Adidas Company' type='text' {...register('company_name')} error={errors.company_name?.message} />
                <Input label='Nome da negociação' placeholder='Ex.: Venda de Camisas' type='text' {...register('trading_name')} error={errors.trading_name?.message} />
                <Input label='CNPJ' placeholder='Ex.: 00.000.000/0000-00' type='cnpj' {...register('cnpj')} error={errors.cnpj?.message} onChange={handleCnpjChange} value={cnpj} />
                <Input label='Telefone' placeholder='Ex.: (77) 00000-0000' type='phone' {...register('phone')} error={errors.phone?.message} onChange={handlePhoneChange} value={phone} />
                <Input label='CEP' placeholder='Ex.: 00000-000' type='cep' {...register('postal_code')} error={errors.postal_code?.message} onChange={handleCepChange} value={cep} />
                <Input label='Estado' placeholder='Ex.: SP' type='text' {...register('state')} error={errors.state?.message} />
                <Input label='Bairro' placeholder='Ex.: Av. Paulista' type='text' {...register('neighborhood')} error={errors.neighborhood?.message} />
                <Input label='Rua' placeholder='Ex.: Rua paulistinha' type='text' {...register('street')} error={errors.street?.message} />
                <Input label='Número' placeholder='Ex.: 09' type='text' {...register('number')} error={errors.number?.message} />
                <Input label='Cidade' placeholder='Ex.: São Paulo' type='text' {...register('city')} error={errors.city?.message} />
                <Input label='Complemento' placeholder='Ex.: Perto do campo' type='text' {...register('complement')} error={errors.complement?.message} />
                
                <Button icon={supplierId ? "Activity" : "PlusCircle"} title={supplierId ? "Atualizar" : "Cadastrar"}  className='btn-fornecedor' onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarFornecedor;