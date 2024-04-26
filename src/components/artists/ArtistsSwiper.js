'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules"
import imagens from '@/components/json/images.json'

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const ArtistsSwiper = () => {

  const img = imagens.images

  return (
    <>
      <div className="w-full h-full sm:block hidden">
        <Swiper
          navigation
          slidesPerView={3}
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {img.map((image, index) => (
            <SwiperSlide id='swiper-centralize' key={index}>
              <div className='xl:w-[250px] xl:h-[250px] md:w-[210px] md:h-[210px] sm:w-[150px] sm:h-[150px] w-[350px] h-[250px] overflow-hidden rounded-lg'>
                <img
                  className='w-full h-full object-cover'
                  src={image.img}
                />
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

      <div className="w-full h-full sm:hidden block">
        <Swiper
          navigation
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Navigation, Autoplay]}
        >

          {img.map((image, index) => (
            <SwiperSlide id='swiper-centralize' key={index}>
              <div className='xl:w-[250px] xl:h-[250px] md:w-[210px] md:h-[210px] sm:w-[150px] sm:h-[150px] w-[350px] h-[250px] overflow-hidden rounded-lg'>
                <img
                  className='w-full h-full object-cover'
                  src={image.img}
                />
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </>
  )
}

export default ArtistsSwiper