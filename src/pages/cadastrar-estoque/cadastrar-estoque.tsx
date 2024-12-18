import React from 'react';
import './cadastrar-estoque.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';
import { getStockById, setStock, updateStock } from '../../data/services/stock.service';
import { Stock } from '../../interface/stock.interface';
import { schema } from '../../validators/stock-validator';
import { getProduct } from '../../data/services/product.service';
import { Product } from '../../interface/product.interface';
import Select from '../../components/select/select';

interface CadastrarEstoqueProps {
    stockId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarEstoque({ stockId, onCloseModal }: CadastrarEstoqueProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { data: stocks, isSuccess, isFetching } = useQuery({
        queryKey: ['stock', stockId],
        queryFn: () => (stockId ? getStockById(stockId) : Promise.resolve(null)),
        enabled: !!stockId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    const { data: products } = useQuery<Product[]>({
        queryKey: ['product'],
        queryFn: getProduct,
    });

    React.useEffect(() => {
        if (stockId && !isFetching && isSuccess) {
            const selectedProduct = products?.find(product => product.id === stocks?.product_id);

            const selectedStock = {
                ...stocks,
                product_id: stocks?.product_id,
                product_name: selectedProduct?.name,
            };
    
            reset(selectedStock);
        }
    }, [stockId, stocks, products, isFetching, isSuccess, reset]);
    
    const createEstoqueMutation = useMutation({
        mutationFn: setStock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar o estoque.');
        },
    });

      const updateEstoqueMutation = useMutation({
        mutationFn: (data: Stock) => updateStock(stockId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock', stockId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar o estoque.');
        },
    }); 

    const productOptions = products?.map((product) => ({
        value: product.id ? Number(product.id) : 0,
        title: product.name ? String(product.name) : "",
    })) || [];
    

    const onSubmit = async (data: Stock) => {
        if (stockId) {
            updateEstoqueMutation.mutate(data);
        } else {
            createEstoqueMutation.mutate(data);
        }
    };

    return (
        <>
        <div className="container-estoque">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Estoque" modulo={stockId ? "Atualizar Estoque" : "Cadastrar Estoque"}>
                <Input label='Nome' placeholder='Ex.: Camisa' type='text' {...register('name')} error={errors.name?.message} />
                <Input label='Unidade' placeholder='Ex.: Malha' type='text' {...register('unit')} error={errors.unit?.message} />
                <Input label='Quantidade' placeholder='Ex.: Gola Polo' type='text' {...register('quantity')} error={errors.quantity?.message} />
                <Input label='Código' placeholder='Ex.: Adidas' type='text' {...register('code')} error={errors.code?.message} />
                <Input label='Complemento' placeholder='Ex.: Adidas' type='text' {...register('complement')} error={errors.complement?.message} />
                <Select label='Produto' placeholder='Selecione um produto' maps={productOptions} {...register('product_id')} error={errors.product_id?.message} />
                
                <Button icon={stockId ? "Activity" : "PlusCircle"} title={stockId ? "Atualizar" : "Cadastrar"}  className='btn-estoque' onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarEstoque;