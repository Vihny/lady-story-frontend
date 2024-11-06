import './clientes.scss';
import { useEffect, useState } from "react";
import Table, { Coluna } from "../../ui/components/table/table";
import { deleteCustomer, getCustomer } from "../../data/services/customer.service";
import Header from "../../ui/components/header/header";
import { Box, Pagination } from "@mui/material";
import SideNav from '../../ui/components/sidenav/sidenav';
import Pesquisa from '../../ui/components/pesquisa/pesquisa';
import Button from '../../ui/components/button/button';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../interface/filters/customer-filters.interface';

function Cliente() {
    const [data, setData] = useState<Record<string, string | number>[]>([]);
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', cpf: '' });

    useEffect(() => {
        const getClientes = async () => {
            try {
                const searchFilters = {
                    ...(filters.name ? { name: filters.name } : {}),
                    ...(filters.cpf ? { cpf: filters.cpf } : {})
                };

                const result = await getCustomer(searchFilters);
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar clientes: ', error);
            }
        };
      
        getClientes();

    }, [filters]);

    const colunas: Coluna[] = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'CPF', accessor: 'cpf' },
        { header: 'Data de Nascimento', accessor: 'birthdate' },
        { header: 'Cidade', accessor: 'city' },
    ];

    const tableLabels = ['Todos', 'Receitas', 'Despesas'];

    const filterFunctions = [
        () => data,
        () => data.filter(item => item.pagamento === 'Receita'),
        () => data.filter(item => item.pagamento === 'Despesa'),
    ];

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/cadastrar-cliente');
    };

    const handleEdit = (id: number | string) => {
        navigate(`/cadastrar-cliente/${id}`);
    };

    const deleteCliente = async (id: number | string): Promise<void> => {
        if (typeof id === 'number') {
            try {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                await deleteCustomer(id);
            } catch (error) {
                console.error("Erro ao deletar cliente:", error);
            }
        }
    };

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };
       
    return (    
       <>
        <div className='container-clientes'>
            <SideNav />
            <div>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa 
                        title='Clientes' 
                        placeholder='CPF' 
                        value={filters.cpf}
                        onChange={(e) => handleFilterChange('cpf', e.target.value)}
                        searchPlaceholder='Pesquisar' 
                        searchValue={filters.name}
                        searchChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                    <Button className='botao-inputs' title='Novo cliente' icon='Plus' onPress={handleClick} />
                </div>
                    <div className="container-stepper">
                    {tableLabels.map((label, index) => (
                        <button className="button-stepper"
                            key={label}
                            onClick={() => setSelectedTable(index)}
                            style={{color: selectedTable === index ? '#FF698D' : '#525256', }}>
                            {label}
                        </button>
                ))}    
                    </div>
                <Box>
                    <Table titleModal='cliente' columns={colunas} data={filterFunctions[selectedTable]()} onDelete={deleteCliente} onEdit={handleEdit} />
                </Box>
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
            </div>
           </div>
       </>
    )
}
 
export default Cliente;