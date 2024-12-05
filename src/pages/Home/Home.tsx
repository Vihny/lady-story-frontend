import './home.scss';
import Chart from "../../components/chart/chart";
import SideNav from "../../components/sidenav/sidenav";
import { CarouselDemo } from '../../components/carousel/carousel';
import Transactions from '../../components/transactions/transactions';

function Home() {
    return (
        <>
          <div className="container-home">
            <SideNav />
            <div className='contents-home'>
              <Chart />
              <Transactions />
              <CarouselDemo />
            </div>
          </div>
        </>
    )
}

export default Home;