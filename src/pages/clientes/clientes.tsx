import './clientes.scss';
import { useEffect, useState } from "react";
import Table, { Coluna } from "../../ui/components/table/table";
import { getCustomer } from "../../data/services/customer.service";
import Header from "../../ui/components/header/Header";
import { Box, Pagination } from "@mui/material";
import SideNav from '../../ui/components/sidenav/sidenav';
import Pesquisa from '../../ui/components/pesquisa/pesquisa';
import Button from '../../ui/components/button/button';
import { useNavigate } from 'react-router-dom';

function Cliente() {
    const [data, setDada] = useState<Record<string, string | number>[]>([]);
    const [selectedTable, setSelectedTable] = useState(0);

    useEffect(() => {
        const getClientes = async () => {
            const result = await getCustomer();
            setDada(result);
        }

        getClientes();
    }, []);

    const colunas: Coluna[] = [
        { header: 'Nome do cliente', accessor: 'nome' },
        { header: 'Email', accessor: 'email' },
        { header: 'Telefone', accessor: 'telefone' },
        { header: 'Idade', accessor: 'idade' },
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
       
    return (
       <>
        <div className='container-clientes'>
            <SideNav />
            <div>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa title='Clientes' searchPlaceholder='Pesquisar' placeholder='Telefone' />
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
                    <Table columns={colunas} data={filterFunctions[selectedTable]()} />
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