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
import Select from '../../components/select/select';
import { getProduct } from '../../data/services/product.service';
import { Product } from '../../interface/product.interface';
import { getCustomer } from '../../data/services/customer.service';
import { Customer } from '../../interface/customer.interface';
import { Stock } from '../../interface/stock.interface';
import { getStock } from '../../data/services/stock.service';

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

    const { data: products } = useQuery<Product[]>({
        queryKey: ['product'],
        queryFn: getProduct
    });

    const { data: customers } = useQuery<Customer[]>({
        queryKey: ['customer'],
        queryFn: getCustomer
    });

    const { data: stocks } = useQuery<Stock[]>({
        queryKey: ['stock'],
        queryFn: getStock
    });

    React.useEffect(() => {
        if (saleId && !isFetching && isSuccess) {

            const selectedProduct = products?.find(product => product.id === sales?.product_id);
            const selectedCustomer = customers?.find(customer => customer.id === sales?.customer_id);
            const selectedStock = stocks?.find(stock => stock.id === sales?.stock_id);

            const selectedSale = {
                ...sales,
                product_id: sales?.product_id,
                customer_id: sales?.customer_id,
                product_name: selectedProduct?.name,
                customer_name: selectedCustomer?.name,
                stock_id: sales?.stock_id,
                stock_name: selectedStock?.name,
            };

            reset(selectedSale);
        }
    }, [saleId, sales, products, stocks, customers, isFetching, isSuccess, reset]);
    
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

    const productOptions = products?.map((product) => ({
        value: product.id ? Number(product.id) : 0,
        title: product.name ? String(product.name) : "",
    })) || [];

    const customerOptions = customers?.map((customer) => ({
        value: customer.id ? Number(customer.id) : 0,
        title: customer.name ? String(customer.name) : "",
    })) || [];

    const stockOptions = stocks?.map((stock) => ({
        value: stock.id ? Number(stock.id) : 0,
        title: stock.name ? String(stock.name) : "",
    })) || [];

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
                <Select label='Cliente' placeholder='Selecione um' maps={customerOptions} {...register('customer_id')} error={errors.customer_id?.message} />
                <Select label='Produto' placeholder='Selecione um' maps={productOptions} {...register('product_id')} error={errors.product_id?.message} />
                <Select label='Estoque' placeholder='Selecione um' maps={stockOptions} {...register('stock_id')} error={errors.stock_id?.message} />
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