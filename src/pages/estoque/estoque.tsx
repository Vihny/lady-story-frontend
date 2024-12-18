import './estoque.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import Button from '../../components/button/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import { deleteStock, getStock } from '../../data/services/stock.service';
import { toast } from 'react-toastify';
import { queryClient } from '../../lib/react-query';
import DialogComponent from '../../components/dialog/dialog';
import CadastrarEstoque from '../cadastrar-estoque/cadastrar-estoque';
import { getProduct } from '../../data/services/product.service';
import { Stock } from '../../interface/stock.interface';
import { Product } from '../../interface/product.interface';
import { Filters } from '../../interface/filters/stock-filters.interface';

function Estoque() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', code: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStockId, setSelectedSupplierId] = useState<string | number | null>(null);

    const { data: stocks} = useQuery({
        queryKey: ['stock'],
        queryFn: getStock,
    })

    const { data: products } = useQuery({
        queryKey: ['product'],
        queryFn: getProduct,
    });

    const stocksWithProductNames = stocks?.map((stock: Stock )=> {
        const product = products?.find((produto: Product) => produto.id === stock.product_id);
        return { 
            ...stock, 
            product_name: product?.name || 'Produto não encontrado',
            name: stock.name || '',
            code: stock.code || '', 
        };
    });

    const colunas: Coluna[] = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Unidade', accessor: 'unit' },
        { header: 'Quantidade', accessor: 'quantity' },
        { header: 'Produto', accessor: 'product_name' },
        { header: 'Código', accessor: 'code'},
        { header: 'Complemento', accessor: 'complement'},
    ];

    const labels = ['Todos'];

    const handleClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSupplierId(null);
        getEstoqueMutation.mutate();
    };

    const handleEdit = (id: string | number) => {
        setSelectedSupplierId(id);
        setIsModalOpen(true);
    };

    const getEstoqueMutation = useMutation({
        mutationFn: getStock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock'] });

            if (selectedStockId) {
                toast.success('Estoque atualizado com sucesso!');
            } else {
                toast.success('Estoque cadastrado com sucesso!');
            }
        },
        onError: () => {
            toast.error('Erro ao obter estoque.');
        },
    });

    const deleteEstoqueMutation = useMutation({
        mutationFn: (id: string | number) => deleteStock(id),
        onSuccess: () => {
            toast.success('Estoque excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['stock'] });
        },
        onError: () => {
            toast.error('Erro ao excluir o estoque.');
        },
    });

    const handleDelete = (id: string | number) => {
        deleteEstoqueMutation.mutate(id);
    };


    const filteredStocks = stocksWithProductNames?.filter((stock: Filters) => {
        const matchesName = stock.name?.toLowerCase().includes(filters.name.toLowerCase());
        const matchesCode = stock.code?.toLowerCase().includes(filters.code.toLowerCase());
        return matchesName && matchesCode;
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
                    title='Estoque' 
                    searchPlaceholder='Pesquisar' 
                    searchValue={filters.name}
                    searchChange={(e) => handleFilterChange('name', e.target.value)}
                    placeholder='Código'
                    value={filters.code}
                    onChange={(e) => handleFilterChange('code', e.target.value)}
                />
                <Button className='botao-inputs' title='Novo estoque' icon='Plus' onPress={handleClick} />
            </div>
            <div>
                <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} beforeColor='#FF698D' activeColor='#FF698D' />

                {selectedTable === 0 && (
                    <Table titleModal='estoque' columns={colunas}  data={filteredStocks}  onDelete={handleDelete} onEdit={handleEdit} />
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
                    {isModalOpen && <CadastrarEstoque onCloseModal={handleCloseModal} stockId={selectedStockId}/>}
                </DialogComponent>
           </div>
       </>
    )
}

export default Estoque;