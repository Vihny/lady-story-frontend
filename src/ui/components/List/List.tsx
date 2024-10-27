import HeaderList from './HeaderList/HeaderList';
import './List.scss'
import ListContent from './ListContent/ListContent';


function List() {
   return (
      <>
      <div className='container-list'>
        <HeaderList title1='Nome Produto' title2='Tamanho' title3='Cor' title4='Pagamento' title5='Preço'/>
        <ListContent name1='Camisa' name2='P' name3='Cor' name4='Pagamento' name5='Preço' />
      </div>
      </>
   )
}

export default List;