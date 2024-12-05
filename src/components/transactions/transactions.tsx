import { useState } from 'react';
import './transactions.scss';

function Transactions() {
    const [selectedTable, setSelectedTable] = useState(0);
    const labels = ['Todos', 'Receitas', 'Despesas'];

    return (
        <>
        <div className="container-transactions">
            <div className="container-stepper">
                {labels.map((label, index) => (
                    <button className={`button-stepper ${selectedTable === index ? 'active' : ''}`}
                        key={label}
                        onClick={() => setSelectedTable(index)}
                        style={{color: selectedTable === index ? '#299D91' : '#525256', }}>
                        {label}
                    </button>
                ))}    
            </div>
            <div className='contents-transactions'>
                <div className='transactions'>
                    <p>Camisas</p>
                    <p style={{ color: '#525256' }}>$20000.00</p>
                </div>
                <div className='transactions'>
                    <span>XL fashions</span>
                    <span>17 Maio 2023</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Transactions;