import './HeaderList.scss'

interface HeaderListProps {
   title1?: string
   title2?: string
   title3?: string
   title4?: string
   title5?: string
}

function HeaderList({title1, title2, title3, title4, title5}: HeaderListProps) {
   return (
      <>
      <div className='container-header'>
            <p>{title1}</p>
            <p>{title2}</p>
            <p>{title3}</p>
            <p>{title4}</p>
            <p>{title5}</p>
      </div>
      </>
   )
}

export default HeaderList;