import './cadrastrar-produto.scss'
import 'react-toastify/dist/ReactToastify.css';
import { schema } from "../../validators/product-validator";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import { Product } from "../../interface/product.interface";
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import SideNav from "../../components/sidenav/sidenav";
import { getProductById, setProduct, updateProduct } from '../../data/services/product.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CadastrarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProdutoState] = useState<Product | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    
    useEffect(() => {
        if (id) {
            const fetchProduto = async () => {
                const produtoData = await getProductById(id);
                setProdutoState(produtoData);
                reset(produtoData);
            };

            fetchProduto();
        }
    }, [id, reset]);
    
    const setProduto = async (data: Product) => {
        await setProduct(data);
    }

    const updateProduto = async (data: Product) => {
        if (id) return await updateProduct(id, data);
    }

    const onSubmit = async (data: Product) => {
        if(id) {
            const response = await updateProduto(data);
            console.log(response)
            toast.success('Produto atualizado com sucesso!');
            navigate('/produtos');
        } else {
            await setProduto(data);
            toast.success('Produto cadastrado com sucesso!');
            navigate('/produtos');
            reset();
        }
    }

    return (
        <>
        <div className="container-produtos">
            <ToastContainer />
            <SideNav />
            <Cadastro text="Gerenciamento de Produtos" modulo="Cadastrar Produto">
                <Input label='Nome do Produto' placeholder='Ex.: Camisa' type='text' defaultValue={produto?.name || ''} {...register('name')} error={errors.name?.message} />
                <Input label='Tipo de Produto' placeholder='Ex.: Malha' type='text' defaultValue={produto?.type || ''} {...register('type')} error={errors.type?.message} />
                <Input label='Modelo do Produto' placeholder='Ex.: Gola Polo' type='text' defaultValue={produto?.model || ''} {...register('model')} error={errors.model?.message} />
                <Input label='Fornecedor' placeholder='Ex.: Adidas' type='text' defaultValue={produto?.brand || ''} {...register('brand')} error={errors.brand?.message} />
                <Input label='Cor do Produto' placeholder='Ex.: Verde' type='text' defaultValue={produto?.color || ''} {...register('color')} error={errors.color?.message} />
                <Input label='Tamanho do Produto' placeholder='Ex.: P' type='text' defaultValue={produto?.size || ''} {...register('size')} error={errors.size?.message} />
                <Input label='Preço do Produto' placeholder='Ex.: $80,00' type='text' defaultValue={produto?.price || ''} {...register('price')} error={errors.price?.message} />

                <Button icon={id ? "Activity" : "PlusCircle"} title={id ? "Atualizar" : "Cadastrar"} className="item-ultimo" onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarProduto;