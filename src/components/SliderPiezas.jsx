import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation' 
import 'swiper/css/pagination' 
import 'swiper/css/scrollbar' 

const SliderPiezas = () => {
    const swiperWrappedRef = useRef(null);

    function adjustMargin() {
        const screenWidth = window.innerWidth

        // if( swiperWrappedRef.current) {
        //     swiperWrappedRef.current.style.marginLeft = 
        //         screenWidth <= 520 ? '50px' : 
        //         screenWidth <= 650 ? '50px' :
        //         screenWidth <= 800 ? '100px' :
        //         '0px'
        // }
    }

    const data = [
        {
            image: './imgs/3.png', // [cite: 2]
            title: 'Mercado (150 Oro)', // [cite: 2]
            description: 'Genera +50 Oro/turno.', // [cite: 4, 5]
        },
        {
            image: './imgs/5.png', // [cite: 11]
            title: 'Cuartel (200 Oro)', // [cite: 11]
            description: 'Permite reclutar tropas fuera de la Capital.', // [cite: 13]
        },
        {
            image: './imgs/4.png', // [cite: 19]
            title: 'Muralla (100 Oro)', // [cite: 19]
            description: '+2 a la Defensa en ese hexágono.', // [cite: 22, 23]

        },
       
    ];

    useEffect( () => {
        adjustMargin();
        window.addEventListener('resize', adjustMargin)
        return () => window.removeEventListener('resize', adjustMargin)
    }, [])

  return (
    <div className='w-9/10 mx-auto '>
        <div className='w-full'>
            <Swiper
                className='w-full p-14'
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={'auto'}
                grabCursor
                initialSlide={0}
                centeredSlides
                navigation
                speed={800}
                slideToClickedSlide
                breakpoints={{
                    320: { spaceBetween: 40 },
                    650: { spaceBetween: 30 },
                    1000: { spaceBetween: 20 }
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => {
                    swiperWrappedRef.current = swiper.wrapperEl
                } }
            >
                {
                    data.map( (s, index) => (
                        <SwiperSlide className='pb-8 overflow-hidden' key={index}>
                            <div className='w-full bg-slate-900 text-white shadow-md overflow-hidden rounded-lg duration-1000 text-sm' >
                                <img className='w-64 mx-auto mb-8 rounded-md object-cover' src={s.image} alt={s.title} />
                                <div className='px-8'>
                                    <div>
                                        <h3 className='text-lg roboto roboto-bold'>{s.title}</h3>
                                    </div>
                                    <div className='pb-6'>
                                        <p>{s.description}</p>
                                        {/* <hr />
                                        <h4 className='text-md roboto'>Niveles</h4>
                                        <ol className='list-disc pl-4'>
                                        {
                                            s.niveles.map( (n, i) => (
                                                    <li >{n}</li>                
                                                    
                                                ))
                                            }
                                        </ol> */}
                                        
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>

                    ))
                }
            
            </Swiper>

        </div>
    </div>
  )
}

export default SliderPiezas