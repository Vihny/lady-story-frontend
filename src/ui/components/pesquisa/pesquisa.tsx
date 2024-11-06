import './pesquisa.scss';

interface PesquisaProps {
    title?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchPlaceholder?: string,
    searchValue?: string,
    searchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Pesquisa({title, placeholder, value, onChange, searchPlaceholder, searchValue, searchChange}: PesquisaProps) {
    return (
       <>
        <div className='container-pesquisa'>
            <p>{title}</p>

            <div className='inputs'>
                <input type="search" placeholder={searchPlaceholder} value={searchValue} onChange={searchChange} />
                <input type="search" placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </div>
       </>
    )
}
 
export default Pesquisa;
