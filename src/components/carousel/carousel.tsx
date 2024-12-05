import './carousel.scss';
import TotalBalance from '../total-balance/total-balance';
import { CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

export function CarouselDemo() {
  return (
    <div className='carousel-container'>
      <div className='total-card'>
        <p>$240,399</p>
        <span>Todas as contas</span>
      </div>
      <Carousel className='md:w-[880px] h-[300px] max-w-xs'>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
            >
              <div>
                <CardContent className='flex aspect-square items-center justify-center'>
                  <CarouselItem className='basis-3/3 pl-0 h-[200px]' style={{ margin: 0 }}>
                    <TotalBalance />
                  </CarouselItem>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
    </div>
  );
}
