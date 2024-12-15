import './vendas.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../interface/filters/product-filters.interface';
import { useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import { getSupplier, setSupplier } from '../../data/services/supplier.service';
import DialogComponent from '../../components/dialog/dialog';
import Cadastro from "../../components/cadastro/cadastro";
import Input from "../../components/input/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validators/supplier-validator';
import { toast, ToastContainer } from 'react-toastify';
import { Supplier } from '../../interface/supplier.interface';
import CadastrarVenda from '../cadrastrar-venda/cadrastrar-venda';

function Vendas() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: suppliers } = useQuery({
        queryKey: ['suppliers'],
        queryFn: getSupplier,
    });

    const colunas: Coluna[] = [
        { header: 'Nome da empresa', accessor: 'company_name' },
        { header: 'Nome da negociação', accessor: 'trading_name' },
        { header: 'CNPJ', accessor: 'cnpj' },
        { header: 'Telefone', accessor: 'phone' },
    ];

    const labels = ['Todos', 'Receitas', 'Despesas'];

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // const navigate = useNavigate();
    // const handleEdit = (id: number | string) => {
    //     navigate(`/cadastrar-venda/${id}`);
    // };

    const handleDelete = (id: number | string) => {
        // Implementar a lógica de deletar item
    };

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Supplier) => {
        await setSupplier(data);
        toast.success('Venda cadastrada com sucesso!');
        handleCloseModal();
    };

    return (
        <>
            <div className='container-produtos'>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa  
                        title='Vendas' 
                        searchPlaceholder='Pesquisar' 
                        searchValue={filters.name}
                        searchChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                    <Button className='botao-inputs' title='Cadastrar nova venda' icon='Plus' onPress={handleClick} />
                </div>

                <div>
                    <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                    {selectedTable === 0 && (
                        <Table titleModal='venda' columns={colunas} data={suppliers} onDelete={handleDelete} onEdit={() => {}} />
                    )}
                </div>

                <div className='container-paginator'>
                    <Pagination 
                        count={10} 
                        color='secondary'
                        variant='outlined'
                        size='small' 
                        shape='circular'
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px'
                            }
                        }} 
                    />
                </div>

                <DialogComponent
                    closeButtonText="Cancelar"
                    open={isModalOpen}
                    onClose={handleCloseModal}
                >
                    <CadastrarVenda />
                </DialogComponent>
            </div>
        </>
    );
}

export default Vendas;
