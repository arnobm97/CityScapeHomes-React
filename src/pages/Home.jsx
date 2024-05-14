import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'animate.css';
import { useEffect,useState } from 'react';
import Estate from '../components/Estate';
import UseTitle from '../components/UseTitle';

const Home = () => {
  UseTitle("Home")
  const [estates,setestates]= useState([]);
  useEffect(() => {
    fetch('./estate.json') 
      .then(res => res.json())
      .then(data => setestates(data))
  }, [])
    
    return (
    <>
      <div className=' banner  lg:h-[650px] md:h-[400px] h-[200px] flex justify-center items-center'>
                <Swiper
       
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <h3 className='text-white text-center roboto-bold lg:text-4xl animate__animated animate__backInRight mb-2'>Welcome to</h3>
            <h1 className='text-white text-center lg:text-6xl animate__animated animate__backInLeft' >City<span className='text-blue-400'>Scape</span>Homes</h1>
          </SwiperSlide>
          <SwiperSlide>
            <h3 className='text-white text-center roboto-bold lg:text-4xl mb-2 animate__animated animate__backInLeft '>Where You Can</h3>
            <h1 className='text-white text-center lg:text-6xl animate__animated animate__backInLeft ' >Find Your Desired Properties</h1>
          </SwiperSlide>
          <SwiperSlide>
            <h3 className='text-white text-center roboto-bold lg:text-4xl mb-2 animate__animated animate__backInLeft '> Buy Properties</h3>
            <h1 className='text-white text-center lg:text-6xl animate__animated animate__backInLeft'> At the Cheapest Rate Possible</h1>
          </SwiperSlide>
        </Swiper>
    
      </div>
      <h1 className='font-bold lg:text-5xl md:text-3xl text-2xl text-center mt-20 mb-6'>Available Properties</h1>
        <div className='lg:w-[1200px] lg:flex md:flex flex  flex-wrap justify-center lg:flex-wrap lg:justify-evenly mb-6 gap-y-5 mx-auto'>
                    {estates.map(estate =><Estate key={estate.id} estate={estate}></Estate>)}
        </div>
    </> 
    );
};

export default Home;