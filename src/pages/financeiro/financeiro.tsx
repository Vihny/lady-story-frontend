import './financeiro.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import { deleteFinancial, getFinancial } from '../../data/services/financial.service';
import { queryClient } from '../../lib/react-query';
import { toast } from 'react-toastify';
import CadastrarFinanceiro from '../cadastrar-financeiro/cadastrar-financeiro';
import DialogComponent from '../../components/dialog/dialog';
import { Filters } from '../../interface/filters/financial-filters.interface';

function Financeiro() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ description: '', operation_type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | number | null>(null);
    const { data: financials} = useQuery({
        queryKey: ['finacial'],
        queryFn: getFinancial,
    })

    const colunas: Coluna[] = [
        { header: 'Data da operação', accessor: 'operation_date' },
        { header: 'Tipo da operação', accessor: 'operation_type' },
        { header: 'Valor', accessor: 'value' },
        { header: 'Descrição', accessor: 'description'},
    ];

    const labels = ['Todos'];

    const handleClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSupplierId(null);
        getFinanceiroMutation.mutate();
    };

    const handleEdit = (id: string | number) => {
        setSelectedSupplierId(id);
        setIsModalOpen(true);
    };

    const getFinanceiroMutation = useMutation({
        mutationFn: getFinancial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['finacial'] });

            if (selectedSupplierId) {
                toast.success('Receita atualizado com sucesso!');
            } else {
                toast.success('Receita cadastrado com sucesso!');
            }
        },
        onError: () => {
            toast.error('Erro ao obter receita.');
        },
    });

    const deleteFinanceiroMutation = useMutation({
        mutationFn: (id: string | number) => deleteFinancial(id),
        onSuccess: () => {
            toast.success('Receita excluída com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['finacial'] });
        },
        onError: () => {
            toast.error('Erro ao excluir receita.');
        },
    });

    const handleDelete = (id: string | number) => {
        deleteFinanceiroMutation.mutate(id);
    };

    const filteredFinancial = financials?.filter((financial: Filters) => {
        const matchesName = financial.description?.toLowerCase().includes(filters.description.toLowerCase());
        const matchesType = financial.operation_type?.toLowerCase().includes(filters.operation_type.toLowerCase());
        return matchesName && matchesType;
    });

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    return (
       <>
        <div className='container-produtos'>
            <Header />
            <div className='container-pesquisa-inputs'>
            <Pesquisa  
                    title='Financeiro' 
                    searchPlaceholder='Descriçao' 
                    searchValue={filters.description}
                    searchChange={(e) => handleFilterChange('description', e.target.value)}
                    placeholder='Tipo' 
                    value={filters.operation_type}
                    onChange={(e) => handleFilterChange('operation_type', e.target.value)}
                />
                <Button className='botao-inputs' title='Nova receita' icon='Plus' onPress={handleClick} />
            </div>
            <div>
                <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                {selectedTable === 0 && (
                    <Table titleModal='produto' columns={colunas}  data={filteredFinancial}  onDelete={handleDelete} onEdit={handleEdit} />
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
                    {isModalOpen && <CadastrarFinanceiro onCloseModal={handleCloseModal} financialId={selectedSupplierId}/>}
            </DialogComponent>
           </div>
       </>
    )
}

export default Financeiro;