import './carousel.scss';
import TotalBalance from '../total-balance/total-balance';
import { CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

export function CarouselDemo() {
  return (
    <Carousel className='md:w-[880px] max-w-xs'>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            style={{ background: '#fff', width: 600, borderRadius: 12 }}
          >
            <div className='carousel-container'>
              <div className='total-card'>
                <p>$240,399</p>
                <span>Todas as contas</span>
              </div>
              <CardContent className='flex aspect-square items-center justify-center p-6'>
                <CarouselItem className='basis-3/3'>
                  <TotalBalance />
                </CarouselItem>
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
