import './cadrastrar-produto.scss'
import 'react-toastify/dist/ReactToastify.css';
import { schema } from "../../validators/product-validator";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import { Product } from "../../interface/product.interface";
import Button from "../../ui/components/button/button";
import Cadastro from "../../ui/components/cadastro/cadastro";
import Input from "../../ui/components/input/input";
import SideNav from "../../ui/components/sidenav/sidenav";
import { setProduct } from '../../data/services/product.service';

function CadastrarProduto() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = async (data: Product) => {
        await setProduct(data);
        reset();
        toast.success('Produto cadastrado com sucesso!');
    }

    return (
        <>
        <div className="container-produtos">
            <ToastContainer />
            <SideNav />
            <Cadastro text="Gerenciamento de Produtos" modulo="Cadastrar Produto">
                <Input label='Nome do Produto' placeholder='Ex.: Camisa' type='text' {...register('name')} error={errors.name?.message} />
                <Input label='Tipo de Produto' placeholder='Ex.: Malha' type='text' {...register('brand')} error={errors.brand?.message} />
                <Input label='Modelo do Produto' placeholder='Ex.: Gola Polo' type='text' {...register('model')} error={errors.model?.message} />
                <Input label='Fornecedor' placeholder='Ex.: Adidas' type='text' {...register('type')} error={errors.type?.message} />
                <Input label='Cor do Produto' placeholder='Ex.: Verde' type='text' {...register('size')} error={errors.size?.message} />
                <Input label='Tamanho do Produto' placeholder='Ex.: P' type='text' {...register('color')} error={errors.color?.message} />
                <Input label='Preço do Produto' placeholder='Ex.: $80,00' type='text' {...register('price')} error={errors.price?.message} />

                <Button icon="PlusCircle" title="Cadastrar" className="item-ultimo" onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarProduto;