import './vendas.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import DialogComponent from '../../components/dialog/dialog';
import { queryClient } from '../../lib/react-query';
import { toast } from 'react-toastify';
import { deleteSale, getSale } from '../../data/services/sale.service';
import CadastrarVenda from '../cadastrar-venda/cadastrar-venda';
import { Filters } from '../../interface/filters/sale-filters.interface';

function Vendas() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState({ sale_date: '', sale_state: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | number | null>(null);
    const { data: suppliers } = useQuery({
        queryKey: ['supplier'],
        queryFn: getSale,
    });

    const colunas: Coluna[] = [
        { header: 'Data da venda', accessor: 'sale_date' },
        { header: 'Estado', accessor: 'sale_state' },
        { header: 'Observação', accessor: 'observation' },
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
        mutationFn: getSale,
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
        mutationFn: (id: string | number) => deleteSale(id),
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

    // const filteredStock = productWithSupplierNames?.filter((sale: Filters) => {
    //     const matchesData = sale.sale_date?.toLowerCase().includes(filters.name.toLowerCase());
    //     const matchesState = sale.sale_state?.toLowerCase().includes(filters.type.toLowerCase());
    //     return matchesData && matchesState;
    // });

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    return (
        <>
            <div className='container-fornecedor'>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa  
                        title='Vendas' 
                        // searchPlaceholder='Pesquisar' 
                        // searchValue={filters.name}
                        // searchChange={(e) => handleFilterChange('name', e.target.value)}
                        // placeholder='Data da venda' 
                        // value={filters.type}
                        // onChange={(e) => handleFilterChange('type', e.target.value)}
                    />
                    <Button className='botao-inputs' title='Nova venda' icon='Plus' onPress={handleClick} />
                </div>

                <div>
                    <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                    {selectedTable === 0 && (
                        <Table titleModal='venda' columns={colunas} data={suppliers} onDelete={handleDelete}  onEdit={handleEdit} />
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
                    {isModalOpen && <CadastrarVenda onCloseModal={handleCloseModal} saleId={selectedSupplierId}/>}
                </DialogComponent>
            </div>
        </>
    );
}

export default Vendas;