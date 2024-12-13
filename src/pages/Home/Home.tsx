import './home.scss';
import Chart from "../../components/chart/chart";
import { CarouselDemo } from '../../components/carousel/carousel';
import Transactions from '../../components/transactions/transactions';
import Header from '../../components/header/header';

function Home() {
    return (
        <>
          <div className='home-page'>
            <Header />
            <div className='container-home'>
              <div className='contents-home'>
                <h3>Estatística</h3>
                <Chart />
              </div>
              <div className='contents-home'>
                <h3>Transação recente</h3>
                <Transactions />
              </div>
              <div className='contents-home'>
                <h3>Balanço Total</h3>
                <CarouselDemo />
              </div>
            </div>
          </div>
        </>
    )
}

export default Home;