import './produtos.scss';
import { useEffect, useState } from "react";
import Table, { Coluna } from "../../ui/components/table/table";
import Header from "../../ui/components/header/header";
import { Box, Pagination } from "@mui/material";
import SideNav from '../../ui/components/sidenav/sidenav';
import Pesquisa from '../../ui/components/pesquisa/pesquisa';
import { getProduct } from '../../data/services/product.service';
import Button from '../../ui/components/button/button';
import { useNavigate } from 'react-router-dom';

function Produto() {
    const [data, setDada] = useState<Record<string, string | number>[]>([]);
    const [selectedTable, setSelectedTable] = useState(0);

    useEffect(() => {
        const getProdutos = async () => {
            const result = await getProduct();
            setDada(result);
        }

        getProdutos();
    }, []);

    const colunas: Coluna[] = [
        { header: 'Nome do produto', accessor: 'name' },
        { header: 'Tamanho', accessor: 'syze' },
        { header: 'Tipo', accessor: 'type' },
        { header: 'Cor', accessor: 'color' },
        { header: 'Modelo', accessor: 'model' },
        { header: 'Marca', accessor: 'brand' },
        { header: 'Preço', accessor: 'price' },
    ];

    const tableLabels = ['Todos', 'Receitas', 'Despesas'];

    const filterFunctions = [
        () => data,
        () => data.filter(item => item.pagamento === 'Receita'),
        () => data.filter(item => item.pagamento === 'Despesa'),
    ];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastrar-produto');
    };
       
    return (
       <>
        <div className='container-produtos'>
            <SideNav />
            <div>
                <Header />
                <div className='container-pesquisa-inputs'>
                    <Pesquisa title='Produtos' searchPlaceholder='Pesquisar' placeholder='Tamanho' />
                    <Button className='botao-inputs' title='Novo produto' icon='Plus' onPress={handleClick} />
                </div>
                    <div className='container-stepper'>
                    {tableLabels.map((label, index) => (
                        <button className='button-stepper'
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
            </div>
           </div>
       </>
    )
}
 
export default Produto;