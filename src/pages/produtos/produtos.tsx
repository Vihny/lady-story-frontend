import './produtos.scss';
import { useState } from "react";
import Table, { Coluna } from "../../components/table/table";
import Header from "../../components/header/header";
import { Pagination } from "@mui/material";
import Pesquisa from '../../components/pesquisa/pesquisa';
import { deleteProduct, getProduct } from '../../data/services/product.service';
import Button from '../../components/button/button';
import { Filters } from '../../interface/filters/product-filters.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import Stepper from '../../components/stepper/stepper'; 
import { toast } from 'react-toastify';
import { queryClient } from '../../lib/react-query';
import DialogComponent from '../../components/dialog/dialog';
import CadastrarProduto from '../cadastrar-produto/cadastrar-produto';

function Produto() {
    const [selectedTable, setSelectedTable] = useState(0);
    const [filters, setFilters] = useState<Filters>({ name: '', size: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);
    const { data: products} = useQuery({
        queryKey: ['product'],
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

    const labels = ['Todos'];

    const handleClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
        getProdutoMutation.mutate();
    };

    const handleEdit = (id: string | number) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const getProdutoMutation = useMutation({
        mutationFn: getProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });

            if (selectedProductId) {
                toast.success('Produto atualizado com sucesso!');
            } else {
                toast.success('Produto cadastrado com sucesso!');
            }
        },
        onError: () => {
            toast.error('Erro ao obter produto.');
        },
    });

    const deleteProdutoMutation = useMutation({
        mutationFn: (id: number | string) => deleteProduct(id),
        onSuccess: () => {
            toast.error('Produto excluído com sucesso!');
            queryClient.invalidateQueries({queryKey: ['product']});
        },
        onError: () => {
            toast.error('Erro ao excluir o produto.');
        },
    });

    const handleDelete = (id: string | number) => {
        deleteProdutoMutation.mutate(id);
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

                <DialogComponent
                    closeButtonText="Cancelar"
                    open={isModalOpen}
                    onClose={() => handleCloseModal()}
                    
                >
                    {isModalOpen && <CadastrarProduto onCloseModal={handleCloseModal} productId={selectedProductId}/>}
                </DialogComponent>
           </div>
       </>
    )
}
 
export default Produto;