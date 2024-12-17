import './cadastrar-produto.scss'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { schema } from "../../validators/product-validator";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import { Product } from "../../interface/product.interface";
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { getProductById, setProduct, updateProduct } from '../../data/services/product.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query';

interface CadastrarPordutoProps {
    productId: string | number | null;
    onCloseModal: () => void;
}

function CadastrarProduto({ productId, onCloseModal }: CadastrarPordutoProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [price, setPrice] = React.useState('');
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);

    const { data: products, isSuccess, isFetching } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => (productId ? getProductById(productId) : Promise.resolve(null)),
        enabled: !!productId,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    });

    React.useEffect(() => {
        if (productId && !isFetching && isSuccess) {
            reset(products);
        }
    }, [productId, products, isFetching, isSuccess, reset]);
    
    const createProdutoMutation = useMutation({
        mutationFn: setProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
            reset();
            onCloseModal();
        },
        onError: () => {
          toast.error('Erro ao cadastrar o produto.');
        },
    });

    const updateProdutoMutation = useMutation({
        mutationFn: (data: Product) => updateProduct(productId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', productId] });
            reset();
            onCloseModal();
        },
        onError: () => {
            toast.error('Erro ao atualizar o produto.');
        },
    });

    const onSubmit = async (data: Product) => {
        const cleanedPrice = Number(price.replace(/[^\d]/g, '').replace(/(\d{2})$/, ''));
        const formattedData = { ...data, price: cleanedPrice };

        if (productId) {
            updateProdutoMutation.mutate(formattedData);
        } else {
            createProdutoMutation.mutate(formattedData);
        }
    };

    return (
        <>
        <div className="container-produto">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Produtos" modulo="Cadastrar Produto">
                <Input label='Nome do Produto' placeholder='Ex.: Camisa' type='text' {...register('name')} error={errors.name?.message} />
                <Input label='Tipo de Produto' placeholder='Ex.: Malha' type='text' {...register('type')} error={errors.type?.message} />
                <Input label='Modelo do Produto' placeholder='Ex.: Gola Polo' type='text' {...register('model')} error={errors.model?.message} />
                <Input label='Fornecedor' placeholder='Ex.: Adidas' type='text' {...register('brand')} error={errors.brand?.message} />
                <Input label='Cor do Produto' placeholder='Ex.: Verde' type='text' {...register('color')} error={errors.color?.message} />
                <Input label='Tamanho do Produto' placeholder='Ex.: P' type='text' {...register('size')} error={errors.size?.message} />
                <Input label='Preço do Produto' placeholder='Ex.: $80,00' type='price' {...register('price')} error={errors.price?.message} onChange={handlePriceChange} value={price} />

                <Button icon={productId ? "Activity" : "PlusCircle"} title={productId ? "Atualizar" : "Cadastrar"} className="btn-produto" onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarProduto;