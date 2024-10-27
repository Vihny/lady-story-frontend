import { MoreVertical } from 'react-feather';
import './ListContent.scss'

interface ListContentProps {
   name1?: string;
   name2?: string;
   name3?: string;
   name4?: string;
   name5?: string;

}
function ListContent({ name1, name2, name3, name4, name5}: ListContentProps) {
   return (
      <>
      <div className='container-content'>
         <div className='card'>
         <p className='title'>{name1}</p>
            <p>{name2}</p>
            <p>{name3}</p>
            <p>{name4}</p>
            <p>{name5}</p>
         </div>
         <div className='icon'>
            <MoreVertical className='icon' size={16} color='#666666' />
         </div>
        
      </div>
      </>
   )
}

export default ListContent;