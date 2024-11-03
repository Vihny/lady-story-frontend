import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import './pesquisa.scss';

function Pesquisa() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastrar-produto');
    };
    
    return (
       <>
        <div className='container-pesquisa'>
            <p>Produtos</p>

            <div className='container-pesquisa-inputs'>
                <div className='inputs'>
                    <input type="text" placeholder='Pesquisar' />
                    <input type="text" placeholder='Tamanho' />
                </div>
                <Button title='Novo Produto' icon='Plus' onPress={handleClick} />
            </div>
        </div>
       </>
    )
}
 
export default Pesquisa;
