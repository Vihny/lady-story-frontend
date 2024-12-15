import './cadrastrar-venda.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from "../../components/button/button";
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSupplier, setSupplier, updateSupplier } from '../../data/services/supplier.service';
import { Supplier } from '../../interface/supplier.interface';
import { schema } from '../../validators/supplier-validator';

function CadastrarVenda() {
    const { id } = useParams();
    const [venda, setVendaState] = useState<Supplier | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id) {
            const fetchVenda = async () => {
                const vendaData = await getSupplier();
                setVendaState(vendaData);
                reset(vendaData);
            };

            fetchVenda();
        }
    }, [id, reset]);
    
    const setVenda = async (data: Supplier) => {
        await setSupplier(data);
    }

    const updateVenda = async (data: Supplier) => {
        if (id) return await updateSupplier(id, data);
    }

    const onSubmit = async (data: Supplier) => {
        if(id) {
            const response = await updateVenda(data);
            console.log(response)
            toast.success('Venda atualizada com sucesso!');
        } else {
            await setVenda(data);
            toast.success('Venda cadastrada com sucesso!');
            reset();
        }
    }

    return (
        <>
        <div className="container-venda">
            <ToastContainer />
            <Cadastro text="Gerenciamento de Vendas" modulo="Cadastrar Venda">
                <Input label='Nome da empresa' placeholder='Ex.: Camisa' type='text' defaultValue={venda?.company_name || ''} {...register('company_name')} error={errors.company_name?.message} />
                <Input label='Nome da negociação' placeholder='Ex.: Malha' type='text' defaultValue={venda?.trading_name || ''} {...register('trading_name')} error={errors.trading_name?.message} />
                <Input label='CNPJ' placeholder='Ex.: Gola Polo' type='text' defaultValue={venda?.cnpj || ''} {...register('cnpj')} error={errors.cnpj?.message} />
                <Input label='Telefone' placeholder='Ex.: Adidas' type='text' defaultValue={venda?.phone || ''} {...register('phone')} error={errors.phone?.message} />
                
            <Button icon="PlusCircle" title='Confirmar' className='btn-venda' onPress={handleSubmit(onSubmit)} />
            </Cadastro>
        </div>
        </>
    )
}

export default CadastrarVenda;