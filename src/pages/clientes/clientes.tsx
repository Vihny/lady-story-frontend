import './clientes.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import { deleteCustomer, getCustomer } from "../../data/services/customer.service";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { Filters } from '../../interface/filters/customer-filters.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper';
import { toast } from 'react-toastify';
import { queryClient } from '../../lib/react-query';
import DialogComponent from '../../components/dialog/dialog';
import CadastrarCliente from '../cadastrar-cliente/cadastrar-cliente';

function Cliente() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', cpf: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | number | null>(null);
    const { data: customers} = useQuery({
        queryKey: ['customer'],
        queryFn: getCustomer,
    })

    const colunas: Coluna[] = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'CPF', accessor: 'cpf' },
        { header: 'Data de Nascimento', accessor: 'birthdate' },
        { header: 'Cidade', accessor: 'city' },
    ];

    const labels = ['Todos'];

    const handleClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCustomerId(null);
        getClienteMutation.mutate();
    };

    const handleEdit = (id: string | number) => {
        setSelectedCustomerId(id);
        setIsModalOpen(true);
    };

    const getClienteMutation = useMutation({
        mutationFn: getCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });

            if (selectedCustomerId) {
                toast.success('Cliente atualizado com sucesso!');
            } else {
                toast.success('Cliente cadastrado com sucesso!');
            }
        },
        onError: () => {
            toast.error('Erro ao obter clientes.');
        },
    });

    const deleteClienteMutation = useMutation({
        mutationFn: (id: string | number) => deleteCustomer(id),
        onSuccess: () => {
            toast.success('Cliente excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['customer'] });
        },
        onError: () => {
            toast.error('Erro ao excluir o cliente.');
        },
    });

    const handleDelete = (id: string | number) => {
        deleteClienteMutation.mutate(id);
    };

    const filteredCustomer = customers?.filter((customer: Filters) => {
        const matchesName = customer.name?.toLowerCase().includes(filters.name.toLowerCase());
        const matchesCpf = customer.cpf?.toLowerCase().includes(filters.cpf.toLowerCase());
        return matchesName && matchesCpf;
    });

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };
       
    return (    
       <>
        <div className='container-cliente'>
            <Header />
            <div className='container-pesquisa-inputs'>
                <Pesquisa 
                    title='Clientes' 
                    searchPlaceholder='Pesquisar' 
                    searchValue={filters.name}
                    searchChange={(e) => handleFilterChange('name', e.target.value)}
                    placeholder='CPF' 
                    value={filters.cpf}
                    onChange={(e) => handleFilterChange('cpf', e.target.value)}
                />
                <Button className='botao-inputs' title='Novo cliente' icon='Plus' onPress={handleClick} />
            </div>
            <div>
                <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                {selectedTable === 0 && (
                    <Table titleModal='cliente' columns={colunas}  data={filteredCustomer}  onDelete={handleDelete} onEdit={handleEdit} />
                )}
            </div>
            <div className='container-paginator'>
                <Pagination 
                    count={10} 
                    color="secondary" 
                    variant="outlined" 
                    size='small' 
                    shape="circular"
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
                {isModalOpen && <CadastrarCliente onCloseModal={handleCloseModal} customerId={selectedCustomerId}/>}
            </DialogComponent>
        </div>
       </>
    )
}
 
export default Cliente;