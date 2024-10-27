import './header.scss'
import { ChevronsRight, Bell } from 'react-feather';


interface headerProps {
   date: Date;
   user: string
}

function Header({date, user}: headerProps){
   return(
      <>
      <div className="container-header">
         <div className='data-container'>
            <ChevronsRight  size={16} color='#666666'/>
            <p>{date.toLocaleDateString()}</p>
         </div>
         <div className='user-container'>
             <p>Bem vindo(a), {user}</p>
             <Bell size={20} color='#191919' />

         </div>
      </div>
      </>
   )
   
}

export default Header;

