import TotalBalance from "../total-balance/total-balance"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="md:w-[880px] max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="carousel-container">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <CarouselItem className="basis-3/3"><TotalBalance /></CarouselItem>
                </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
