import './header.scss'
import { ChevronsRight, Bell } from 'react-feather';
import Badge from '@mui/material/Badge';

interface HeaderProps {
   user?: string
}

function Header({user}: HeaderProps){
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
             <Badge variant="dot" color="secondary" sx={{cursor: 'pointer'}} >
               <Bell size={20} color='#9F9F9F'/>
            </Badge>
         </div>  
      </div>
      </>
   )
}

export default Header;

