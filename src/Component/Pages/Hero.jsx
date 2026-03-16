import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import jobimg from "../../assets/job-application-hiring-document-form-concept.jpg"
import jobimg2 from "../../assets/apply-now-form-information-job-concept.jpg"
import jobimg3 from "../../assets/resume-application-employment-form-concept.jpg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            <img src={jobimg} alt="" className='w-full h-[650px] ' />
        </SwiperSlide>
        <SwiperSlide>
            <img src={jobimg2} alt="" className='w-full h-[650px]' />
        </SwiperSlide>
        <SwiperSlide>
            <img src={jobimg3} alt="" className='w-full h-[650px]' />
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}
