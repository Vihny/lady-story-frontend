import './cadastrar-financeiro.scss'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';
import { Financial } from '../../interface/financial.interface';
import { getFinancialById, setFinancial, updateFinancial } from '../../data/services/financial.service';
import { schema } from '../../validators/financial-validator';
import Select from '../../components/select/select';
import { getSale } from '../../data/services/sale.service';
import { Sale } from '../../interface/sale.interface.';

interface CadastrarFinanceiroProps {
    financialId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarFinanceiro({ financialId, onCloseModal }: CadastrarFinanceiroProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { data: financials, isSuccess, isFetching } = useQuery({
        queryKey: ['financial', financialId],
        queryFn: () => (financialId ? getFinancialById(financialId) : Promise.resolve(null)),
        enabled: !!financialId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    const { data: sales } = useQuery<Sale[]>({
        queryKey: ['sale'],
        queryFn: getSale
    });

    React.useEffect(() => {
        if (financialId && !isFetching && isSuccess) {
            const selectedSale = sales?.find((sale) => sale.id === financials?.sale_id);

            const financialData = {
                ...financials,
                operation_type: String(financials.operation_type) || '',
                sale_id: selectedSale?.id ? Number(selectedSale?.id) : 0,
            };
            reset(financialData)
        }
    }, [financialId, financials, sales, isFetching, isSuccess, reset]);
    
    const createFinanceiroMutation = useMutation({
        mutationFn: setFinancial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['financial'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar nova receita.');
        },
    });

    const updateFinanceiroMutation = useMutation({
        mutationFn: (data: Financial) => updateFinancial(financialId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['financial', financialId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar nova receita.');
        },
    });

    const saleOptions = sales?.map(sale => ({
        value: sale.id || 0,
        title: sale.observation ? String(sale.observation) : "",
    })) || [];
    
    const operationOptions = [
        {value: 1, title: 'Despesa'},
        {value: 2, title: 'Receita'},
    ]
    
    const onSubmit = async (data: Financial) => {
        if (financialId) {
            updateFinanceiroMutation.mutate(data);
        } else {
            createFinanceiroMutation.mutate(data);
        }
    };

    return (
        <>
        <div className="container-financeiro">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Receitas" modulo="Cadastrar Receita">
                <Input label='Data da operação' placeholder='Ex.: Camisa' type='date' {...register('operation_date')} error={errors.operation_date?.message} />
                <Select label='Tipo de operação' placeholder='Selecione uma tipo' maps={operationOptions} {...register('operation_type')} error={errors.operation_type?.message} />
                <Input label='Valor' placeholder='Ex.: Gola Polo' type='text' {...register('amount')} error={errors.amount?.message} />
                <Input label='Descrição' placeholder='Ex.: Adidas' type='text' {...register('description')} error={errors.description?.message} />
                <Select label='Venda' placeholder='Selecione um' maps={saleOptions} {...register('sale_id')} error={errors.sale_id?.message} />

                <Button icon={financialId ? "Activity" : "PlusCircle"} title={financialId ? "Atualizar" : "Cadastrar"} className="btn-financeiro" onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarFinanceiro;