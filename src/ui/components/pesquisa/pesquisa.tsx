import './pesquisa.scss';

interface PesquisaProps {
    title?: string,
    placeholder?: string,
    searchPlaceholder?: string
}

function Pesquisa({title, searchPlaceholder, placeholder}: PesquisaProps) {
    return (
       <>
        <div className='container-pesquisa'>
            <p>{title}</p>

            <div className='inputs'>
                <input type="text" placeholder={searchPlaceholder} />
                <input type="text" placeholder={placeholder} />
            </div>
        </div>
       </>
    )
}
 
export default Pesquisa;
