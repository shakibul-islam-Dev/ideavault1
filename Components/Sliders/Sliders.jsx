"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

const Sliders = ({ initialSlides }) => {
  if (!initialSlides || initialSlides.length === 0) {
    return (
      <div className="w-full h-[600px] bg-muted flex items-center justify-center text-muted-foreground">
        No slides available.
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative bg-background group custom-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {initialSlides.map((slide) => (
          <SwiperSlide
            key={slide._id || slide.id}
            className="relative w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-[5000ms] scale-105">
              <Image
                src={slide.imageUrl}
                alt={slide.ideaTitle || "Slider Background"}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              {/* Overlay: এখন এটি থিমের উপর ভিত্তি করে কাজ করবে */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center items-start text-white">
              <span className="text-blue-400 font-semibold tracking-wider uppercase mb-3">
                {slide.tags || "Launch Your Idea"}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight mb-4 text-white">
                {slide.ideaTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-light">
                {slide.description}
              </p>

              <Link href={`/ideas`}>
                <Button className="px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg shadow-lg transition-all duration-300 hover:opacity-90">
                  Explore Ideas
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
