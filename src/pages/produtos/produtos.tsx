import './produtos.scss';
import { useEffect, useState } from "react";
import Table, { Coluna } from "../../ui/components/table/table";
import Header from "../../ui/components/header/header";
import { Box, Pagination } from "@mui/material";
import SideNav from '../../ui/components/sidenav/sidenav';
import Pesquisa from '../../ui/components/pesquisa/pesquisa';
import { deleteProduct, getProduct } from '../../data/services/product.service';
import Button from '../../ui/components/button/button';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../interface/filters/product-filters.interface';

function Produto() {
    const [data, setData] = useState<Record<string, string | number>[]>([]);
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const searchFilters = {
                    ...(filters.name ? { name: filters.name } : {}),
                    ...(filters.size ? { size: filters.size } : {})
                };

                const result = await getProduct(searchFilters);
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar produtos: ', error);
            }
        };
      
        getProdutos();

    }, [filters]);

    const colunas: Coluna[] = [
        { header: 'Nome do produto', accessor: 'name' },
        { header: 'Tamanho', accessor: 'size' },
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

    const handleEdit = (id: number | string) => {
        navigate(`/cadastrar-produto/${id}`);
    };

    const deleteProduto = async (id: number | string): Promise<void> => {
        if (typeof id === 'number') {
            try {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                await deleteProduct(id);
            } catch (error) {
                console.error("Erro ao deletar produto:", error);
            }
        }
    };

    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };
       
    return (
       <>
        <div className='container-produtos'>
            <SideNav />
            <div>
                <Header />
                <div className='container-pesquisa-inputs'>
                <Pesquisa 
                        title='Produtos' 
                        placeholder='Tamanho' 
                        value={filters.size}
                        onChange={(e) => handleFilterChange('size', e.target.value)}
                        searchPlaceholder='Pesquisar' 
                        searchValue={filters.name}
                        searchChange={(e) => handleFilterChange('name', e.target.value)}
                    />
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
                    <Table titleModal='produto' columns={colunas} data={filterFunctions[selectedTable]()} onDelete={deleteProduto} onEdit={handleEdit} />
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