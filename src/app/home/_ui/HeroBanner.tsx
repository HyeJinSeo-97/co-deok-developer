import { Card, CardContent } from "@/shared/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/shadcn/carousel";

export function HeroBanner() {
  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/1 md:basis-3/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
