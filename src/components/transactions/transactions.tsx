import { useState } from 'react';
import './transactions.scss';
import Stepper from '../stepper/stepper';

function Transactions() {
    const [selectedTable, setSelectedTable] = useState(0);
    const labels = ['Todos', 'Receitas', 'Despesas'];

    return (
        <>
        <div className="container-transactions">
            <Stepper labels={labels} selectedIndex={selectedTable} onStepChange={setSelectedTable} activeColor='#299D91' />

            <div className="contents-transactions-total">
                {selectedTable === 0 && (
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
                )}
                {selectedTable === 1 && (
                    <div className='contents-transactions'>
                        <div className="transactions">
                            <span>Receitas de Maio</span>
                            <span>17 Maio 2023</span>
                        </div>
                    </div>
                )}
                {selectedTable === 2 && (
                    <div className='contents-transactions'>
                        <div className="transactions">
                            <span>Despesas de Abril</span>
                            <span>10 Abril 2023</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Transactions;