import './fornecedor.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { Filters } from '../../interface/filters/product-filters.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import { deleteSupplier, getSupplier } from '../../data/services/supplier.service';
import DialogComponent from '../../components/dialog/dialog';
import CadastrarFornecedor from '../cadastrar-fornecedor/cadastrar-fornecedor';
import { queryClient } from '../../lib/react-query';
import { toast } from 'react-toastify';

function Fornecedor() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | number | null>(null);
    const { data: suppliers } = useQuery({
        queryKey: ['supplier'],
        queryFn: getSupplier,
    });

    const colunas: Coluna[] = [
        { header: 'Nome da empresa', accessor: 'company_name' },
        { header: 'Nome da negociação', accessor: 'trading_name' },
        { header: 'CNPJ', accessor: 'cnpj' },
        { header: 'Telefone', accessor: 'phone' },
        { header: 'CEP', accessor: 'postal_code' },
        { header: 'Estado', accessor: 'state' },
        { header: 'Cidade', accessor: 'city' },
        { header: 'Bairro', accessor: 'neighborhood' },
        { header: 'Rua', accessor: 'street' },
        { header: 'Número', accessor: 'number' },
        { header: 'Complemento', accessor: 'complement' },
    ];

    const labels = ['Todos'];

    const handleClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSupplierId(null);
        getFornecedorMutation.mutate();
    };

    const handleEdit = (id: string | number) => {
        setSelectedSupplierId(id);
        setIsModalOpen(true);
    };

    const getFornecedorMutation = useMutation({
        mutationFn: getSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplier'] });

            if (selectedSupplierId) {
                toast.success('Fornecedor atualizado com sucesso!');
            } else {
                toast.success('Fornecedor cadastrado com sucesso!');
            }
        },
        onError: () => {
            toast.error('Erro ao obter fornecedores.');
        },
    });

    const deleteFornecedorMutation = useMutation({
        mutationFn: (id: string | number) => deleteSupplier(id),
        onSuccess: () => {
            toast.success('Fornecedor excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['supplier'] });
        },
        onError: () => {
            toast.error('Erro ao excluir o fornecedor.');
        },
    });

    const handleDelete = (id: string | number) => {
        deleteFornecedorMutation.mutate(id);
    };

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    return (
        <>
            <div className='container-fornecedor'>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa  
                        title='Fornecedor' 
                        searchPlaceholder='Pesquisar' 
                        searchValue={filters.name}
                        searchChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                    <Button className='botao-inputs' title='Novo fornecedor' icon='Plus' onPress={handleClick} />
                </div>

                <div>
                    <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                    {selectedTable === 0 && (
                        <Table titleModal='fornecedor' columns={colunas} data={suppliers} onDelete={handleDelete}  onEdit={handleEdit} />
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
                    onClose={() => handleCloseModal()}
                    
                >
                    {isModalOpen && <CadastrarFornecedor onCloseModal={handleCloseModal} supplierId={selectedSupplierId}/>}
                </DialogComponent>
            </div>
        </>
    );
}

export default Fornecedor;