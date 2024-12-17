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

    React.useEffect(() => {
        if (financialId && !isFetching && isSuccess) {
            reset(financials);
        }
    }, [financialId, financials, isFetching, isSuccess, reset]);
    
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

    const onSubmit = async (data: Financial) => {
        if (financialId) {
            createFinanceiroMutation.mutate(data);
        } else {
            updateFinanceiroMutation.mutate(data);
        }
    };

    return (
        <>
        <div className="container-financeiro">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Receitas" modulo="Cadastrar Receita">
                <Input label='Data da operação' placeholder='Ex.: Camisa' type='text' {...register('operation_date')} error={errors.operation_date?.message} />
                <Input label='Tipo de operação' placeholder='Ex.: Malha' type='text' {...register('operation_type')} error={errors.operation_type?.message} />
                <Input label='Valor' placeholder='Ex.: Gola Polo' type='text' {...register('value')} error={errors.value?.message} />
                <Input label='Descrição' placeholder='Ex.: Adidas' type='text' {...register('description')} error={errors.description?.message} />

                <Button icon={financialId ? "Activity" : "PlusCircle"} title={financialId ? "Atualizar" : "Cadastrar"} className="btn-financeiro" onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarFinanceiro;