"use client";

import Image from "next/image";
import Link from "next/link";

import { useBannerStore } from "@/app/_stores/banner";
import { Card, CardContent } from "@/shared/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/shadcn/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HeroBanner() {
  const heroBanner = useBannerStore((state) => state.heroBanner);

  if (heroBanner.length === 0) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
        }),
      ]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {heroBanner.map((banner) => (
          <CarouselItem key={banner.id} className="basis-1/1 md:basis-3/4">
            <div className="p-1">
              <Card className="overflow-hidden p-0">
                <CardContent className="relative h-100 p-0 sm:h-112.5 md:h-137.5 lg:h-162.5">
                  <Link href={banner.href}>
                    <Image
                      fill
                      src={banner.imageUrl}
                      alt={banner.imageAlt}
                      sizes="(min-width: 768px) 75vw, 100vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-linear-to-t from-black/70 to-transparent p-4 text-center text-white">
                      <p className="text-display-sm md:text-display font-extrabold">
                        {banner.title}
                      </p>
                      <p className="text-subtitle md:text-title">
                        {banner.description}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
