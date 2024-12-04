import './home.scss';
import Chart from "../../components/chart/chart";
import SideNav from "../../components/sidenav/sidenav";
import { CarouselDemo } from '../../components/carousel/carousel';

function Home() {
    return (
        <>
          <div className="container-home">
            <SideNav />
            <div>
              <Chart />
              <CarouselDemo />
            </div>
          </div>
        </>
    )
}

export default Home;