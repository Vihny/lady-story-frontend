import './estoque.scss';
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
import { getStock } from '../../data/services/stock.service';

function Estoque() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });

    const { data: stocks} = useQuery({
        queryKey: ['stocks'],
        queryFn: getStock,
    })

    const colunas: Coluna[] = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Unidade', accessor: 'unit' },
        { header: 'Quantidade', accessor: 'quantity' },
        { header: 'Complemento', accessor: 'complement'},
    ];

    const labels = ['Todos', 'Receitas', 'Despesas'];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastrar-financeiro');
    };

    const handleEdit = (id: number | string) => {
        navigate(`/cadastrar-financeiro/${id}`);
    };

    const handleDelete = (id: number | string) => {
        
    };

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
                    searchPlaceholder='Pesquisar' 
                    searchValue={filters.name}
                    searchChange={(e) => handleFilterChange('name', e.target.value)}
                />
                <Button className='botao-inputs' title='Cadastrar nova receita' icon='Plus' onPress={handleClick} />
            </div>
            <div>
                <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                {selectedTable === 0 && (
                    <Table titleModal='produto' columns={colunas}  data={stocks}  onDelete={handleDelete} onEdit={handleEdit} />
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
           </div>
       </>
    )
}
 
export default Estoque;