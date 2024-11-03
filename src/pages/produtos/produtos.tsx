import './produtos.scss';
import { useEffect, useState } from "react";
import Table, { Coluna } from "../../ui/components/table/table";
import { getCustomer } from "../../data/services/customer.service";
import Header from "../../ui/components/header/Header";
import { Box, Pagination } from "@mui/material";
import SideNav from '../../ui/components/sidenav/sidenav';
import Pesquisa from '../../ui/components/pesquisa/pesquisa';

function Produto() {
    const [data, setDada] = useState<Record<string, string | number>[]>([]);
    const [selectedTable, setSelectedTable] = useState(0);

    useEffect(() => {
        const getProdutos = async () => {
            const result = await getCustomer();
            setDada(result);
        }

        getProdutos();
    }, []);

    const colunas: Coluna[] = [
        { header: 'Nome do produto', accessor: 'nome' },
        { header: 'Tamanho', accessor: 'tamanho' },
        { header: 'Cor', accessor: 'cor' },
        { header: 'Pagamento', accessor: 'pagamento' },
        { header: 'Preço', accessor: 'preco' },
    ];

    const tableLabels = ['Todos', 'Receitas', 'Despesas'];

    const filterFunctions = [
        () => data,
        () => data.filter(item => item.pagamento === 'Receita'),
        () => data.filter(item => item.pagamento === 'Despesa'),
    ];
       
    return (
       <>
        <div className='container-produtos'>
            <SideNav />
            <div>
                <Header />
                <Pesquisa />
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
 
export default Produto;