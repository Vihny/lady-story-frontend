import './cadastrar-venda.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';
import React from 'react';
import { getSaleById, setSale, updateSale } from '../../data/services/sale.service';
import { Sale } from '../../interface/sale.interface.';
import { schema } from '../../validators/sale-validator';

interface CadastrarVendaProps {
    saleId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarVenda({ saleId, onCloseModal }: CadastrarVendaProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { data: sales, isSuccess, isFetching } = useQuery({
        queryKey: ['sale', saleId],
        queryFn: () => (saleId ? getSaleById(saleId) : Promise.resolve(null)),
        enabled: !!saleId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    React.useEffect(() => {
        if (saleId && !isFetching && isSuccess) {
            reset(sales);
        }
    }, [saleId, sales, isFetching, isSuccess, reset]);
    
    const createVendaMutation = useMutation({
        mutationFn: setSale,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sale'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar a venda.');
        },
    });

      const updateVendaMutation = useMutation({
        mutationFn: (data: Sale) => updateSale(saleId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sale', saleId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar o venda.');
        },
    });

    const onSubmit = async (data: Sale) => {
        if (saleId) {
            updateVendaMutation.mutate(data);
        } else {
            createVendaMutation.mutate(data);
        }
    };

    return (
        <>
        <div className="container-fornecedor">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Vendas" modulo={saleId ? "Atualizar Venda" : "Cadastrar Venda"}>
                <Input label='Nome do cliente' placeholder='Ex.: Maria' type='text' {...register('client')} error={errors.client?.message} />
                <Input label='Nome do produto' placeholder='Ex.: Camisa de Malha' type='text' {...register('product')} error={errors.product?.message} />
                <Input label='Data da venda' type='date' {...register('sale_date')} error={errors.sale_date?.message} />
                <Input label='Estado da venda' placeholder='Ex.: Concluído' type='text' {...register('sale_state')} error={errors.sale_state?.message} />
                <Input label='Observação' placeholder='Ex.: Camisa com bordado' type='text' {...register('observation')} error={errors.observation?.message} />
                
                <Button icon={saleId ? "Activity" : "PlusCircle"} title={saleId ? "Atualizar" : "Cadastrar"}  className='btn-fornecedor' onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarVenda;