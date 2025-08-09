import React from 'react';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules (optional)
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import banner5 from "../../../assets/banner/big.png";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner4 from "../../../assets/banner/banner4.png";


const Banner = () => {

    return (
        <>
            <style jsx global>{`
                /* Default styles (for larger screens) */
                .swiper-button-next,
                .swiper-button-prev {
                    width: 40px;      /* Increased size on larger screens */
                    height: 40px;
                    font-size: 24px;  /* Increased font size */
                    color: white;
                    // background-color: rgba(0, 0, 0, 0.3);
                    // border-radius: 50%;
                }

                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 24px;
                }

                /* Mobile-specific styles (using a media query) */
                @media (max-width: 768px) { /* Adjust 768px as needed */
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 30px;    /* Smaller size on mobile */
                        height: 30px;
                        font-size: 18px; /* Smaller font size on mobile */
                    }
                   .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 18px;
                    }
                }
            `}</style>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px]"
            >
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src={banner1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src={banner2} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src={banner5} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src={banner4} alt="Slide 3" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;