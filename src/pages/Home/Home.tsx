import './home.scss';
import Chart from "../../components/chart/chart";
import { CarouselDemo } from '../../components/carousel/carousel';
import Transactions from '../../components/transactions/transactions';

function Home() {
    return (
        <>
          <div className='contents-home'>
            <Chart />
            <Transactions />
            <CarouselDemo />
          </div>
        </>
    )
}

export default Home;