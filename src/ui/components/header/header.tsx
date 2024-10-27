import './header.scss'
import { ChevronsRight, Bell } from 'react-feather';

interface headerProps {
   user?: string
}

function Header({user}: headerProps){
   const dataAtual = new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

   return(
      <>
      <div className="container-header">
         <div className='data'>
            <ChevronsRight  size={16} color='#666666'/>
            <span>{dataAtual}</span>
         </div>
         <div className='user'>
             <p>Bem vindo(a), {user}</p>
             <Bell size={20} color='#9F9F9F' />
         </div>
      </div>
      </>
   )
}

export default Header;

