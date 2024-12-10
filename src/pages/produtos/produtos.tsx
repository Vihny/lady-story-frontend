import './produtos.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import { deleteProduct, getProduct } from '../../data/services/product.service';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../interface/filters/product-filters.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 

function Produto() {
    const queryClient = useQueryClient();
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });

    const { data: products} = useQuery({
        queryKey: ['products', JSON.stringify(filters)],
        queryFn: getProduct,
    })

    const colunas: Coluna[] = [
        { header: 'Nome do produto', accessor: 'name' },
        { header: 'Tamanho', accessor: 'size' },
        { header: 'Tipo', accessor: 'type' },
        { header: 'Cor', accessor: 'color' },
        { header: 'Modelo', accessor: 'model' },
        { header: 'Marca', accessor: 'brand' },
        { header: 'Preço', accessor: 'price' },
    ];

    const labels = ['Todos', 'Receitas', 'Despesas'];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastrar-produto');
    };

    const handleEdit = (id: number | string) => {
        navigate(`/cadastrar-produto/${id}`);
    };

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'], 
            });
        },
        onError: (error) => {
            console.error("Erro ao deletar produto:", error);
            alert("Ocorreu um erro ao tentar deletar o produto.");
        },
    });

    const handleDelete = (id: number | string) => {
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
        deleteMutation.mutate(numericId);
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
            <div>
                <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                {selectedTable === 0 && (
                    <Table titleModal='produto' columns={colunas}  data={products}  onDelete={handleDelete} onEdit={handleEdit} />
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
 
export default Produto;