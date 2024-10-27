import './header.scss';
import { ChevronsRight } from 'react-feather';
import { Bell } from 'react-feather';

function Header() {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

    return (
        <>
        <div className="container-header">
            <div className='data'>
                <ChevronsRight color='#9F9F9F' />
                <span>{dataAtual}</span>
            </div>
            <div className='nome'>
                <p>Bem vindo, nome</p>
                <Bell style={{cursor: 'pointer'}} color='#666666' />
            </div>
        </div>
        </>
    )
}

export default Header;