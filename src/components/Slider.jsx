import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation' 
import 'swiper/css/pagination' 
import 'swiper/css/scrollbar' 

const Slider = () => {
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
            image: './imgs/genghis.jpg', // [cite: 2]
            title: 'Genghis Khan', // [cite: 2]
            description: 'El unificador de las tribus de la estepa, Genghis Khan lideró una horda que arrasó continentes. Su caballería es el terror de sus enemigos, moviéndose como el viento y golpeando como un rayo.', // [cite: 4, 5]
            niveles: [
                'Nivel 1: El costo de reclutar tropas se reduce a 15 de Oro (en lugar de 20).', // [cite: 6]
                'Nivel 2 (5 XP): El ejército de Genghis Khan gana +1 a su tirada de dado solo cuando ataca.', // [cite: 7]
                'Nivel 3 (15 XP): Cuando Genghis Khan gana una batalla como atacante, además de capturar el hexágono, roba 100 de Oro al jugador defensor (si el jugador tiene esa cantidad).' // [cite: 8, 9]
            ]
        },
        {
            image: './imgs/lu_bu.jpg', // [cite: 11]
            title: 'Lu Bu', // [cite: 11]
            description: 'Montado en el legendario Corcel Rojo, Lu Bu es una fuerza imparable en el campo de batalla, un guerrero sin igual cuya sola presencia puede cambiar el curso de la guerra.', // [cite: 13]
            niveles: [
                'Nivel 1: El ejército de Lu Bu suma +1 a su tirada de dado en batalla (tanto al atacar como al defender).', // [cite: 14]
                'Nivel 2 (5 XP): Cuando Lu Bu gana una batalla como atacante, gana +1 XP adicional (para un total de +4 XP).', // [cite: 15, 16]
                'Nivel 3 (15 XP): Si Lu Bu gana una batalla como defensor, el ejército atacante no se retira con la mitad de sus tropas: es aniquilado por completo.' // [cite: 17]
            ]
        },
        {
            image: './imgs/alexander_the_great.jpg', // [cite: 19]
            title: 'Alexander the Great', // [cite: 19]
            description: 'Desde Macedonia hasta la India, Alejandro forjó un imperio a la velocidad del rayo. Un líder carismático y estratega brillante, su falange aplastó a todo aquel que se interpuso en su camino.', // [cite: 22, 23]
            niveles: [
                'Nivel 1: El ejército de Alejandro puede mover 2 hexágonos en lugar de 1 por cada acción de mover.', // [cite: 25]
                'Nivel 2 (5 XP): El mantenimiento del ejército de Alejandro se reduce a la mitad (Paga 1 de Oro por cada 20 tropas).', // [cite: 26, 27, 28]
                'Nivel 3 (15 XP): El ejército de Alejandro ya no pierde la mitad de sus tropas si es repelido (si pierde un ataque). Simplemente se retira al hexágono desde donde vino sin pérdidas.' // [cite: 29, 30, 31]
            ]
        },
        {
            image: './imgs/napoleon_bonaparte.jpg', // [cite: 33]
            title: 'Napoleon Bonaparte', // [cite: 33]
            description: 'El genio militar que redefinió la guerra moderna. Napoleón comanda sus ejércitos con precisión y una artillería devastadora, marchando hacia la gloria con cada victoria.', // [cite: 36]
            niveles: [
                'Nivel 1: Al atacar, el ejército de Napoleón inflige 5 bajas (elimina 5 tropas) al defensor antes de que comience la batalla (antes de tirar los dados).', // [cite: 37]
                'Nivel 2 (5 XP): Dividir y fusionar ejércitos son ahora acciones gratuitas para Napoleón (no cuentan como una acción de mover).', // [cite: 38, 39]
                'Nivel 3 (15 XP): Una vez por turno, después de ganar una batalla como atacante, Napoleón puede realizar una acción de mover gratis inmediatamente.', // [cite: 40]
            ]
        },
        {
            image: './imgs/sun_tzu.jpg', // [cite: 42]
            title: 'Sun Tzu', // [cite: 42]
            description: 'Autor del clásico "El Arte de la Guerra", Sun Tzu es el estratega supremo. Prefiere vencer sin luchar, pero si el combate es inevitable, manipula el campo de batalla para asegurar una victoria decisiva.', // [cite: 44, 45, 46]
            niveles: [
                'Nivel 1: Cuando el ejército de Sun Tzu defiende, el atacante debe tirar el dado (D6) dos veces y usar el resultado más bajo.', // [cite: 47, 48]
                'Nivel 2 (5 XP): Gana +1 XP adicional por cada batalla en la que participe (ganada o perdida, ataque o defensa).', // [cite: 49, 50]
                'Nivel 3 (15 XP): Una vez por juego, Sun Tzu puede forzar a un ejército enemigo en un hexágono adyacente a retirarse a su capital. No hay batalla, no hay pérdidas.' // [cite: 51, 52]
            ]
        },
        {
            image: './imgs/joan_of_arc.jpg', // [cite: 54]
            title: 'Joan of Arc', // [cite: 54]
            description: 'Guiada por una fe inquebrantable, Juana de Arco inspiró a Francia a levantarse. Su estandarte es un faro de esperanza en la adversidad, infundiendo coraje a sus tropas y rompiendo asedios.', // [cite: 56, 57]
            niveles: [
                'Nivel 1: El ejército de Juana de Arco suma +1 a su tirada de dado si está batallando contra un ejército con más tropas que el suyo.', // [cite: 58, 59]
                'Nivel 2 (5 XP): El ejército de Juana de Arco anula el bono de muralla (+2) del defensor cuando ataca un hexágono con muralla.', // [cite: 60]
                'Nivel 3 (15 XP): Una vez por juego, durante la Fase de Actuar, todos los ejércitos que controles (no solo el de Juana) pueden mover 1 hexágono adicional ese turno.' // [cite: 61]
            ]
        },
        {
            image: './imgs/cleopatra.jpg', // [cite: 63]
            title: 'Cleopatra VII', // [cite: 63]
            description: 'La última faraona de Egipto, Cleopatra dominó la política y la economía con una astucia legendaria. Su reino prosperó gracias a sus alianzas y la riqueza inagotable del Nilo.', // [cite: 65, 66]
            niveles: [
                'Nivel 1: Ganas +50 de Oro adicional durante tu Fase de Recaudar.', // [cite: 67]
                'Nivel 2 (5 XP): El costo de construir "Mercados" se reduce a la mitad (Costo: 75 Oro).', // [cite: 68]
                'Nivel 3 (15 XP): Tus hexágonos controlados ahora generan +15 de Oro cada uno (en lugar de +10).' // [cite: 69]
            ]
        },
        {
            image: './imgs/mansa_musa.jpg', // [cite: 71]
            title: 'Mansa Musa', // [cite: 71]
            description: 'El legendario gobernante del Imperio de Mali, Mansa Musa es conocido por su inmensa riqueza y generosidad. Su poder económico transformó África y dejó un legado de oro y conocimiento.', // [cite: 73, 74]
            niveles: [
                'Nivel 1: Tus "Mercados" producen +25 de Oro adicional cada uno (Total: +75 de Oro por Mercado).', // [cite: 75]
                'Nivel 2 (5 XP): Al alcanzar el nivel 2, ganas inmediatamente una bonificación única de 300 de Oro.', // [cite: 76]
                'Nivel 3 (15 XP): Tu hexágono de Capital (y solo la Capital) genera +100 de Oro adicional en cada Fase de Recaudar.' // [cite: 77, 78]
            ]
        },
        {
            image: './imgs/leonardo.jpg', // [cite: 80]
            title: 'Leonardo da Vinci', // [cite: 80]
            description: 'Un polímata sin igual, Leonardo combinó el arte, la ciencia y la ingeniería. Sus inventos y diseños militares ofrecieron una ventaja tecnológica inigualable en un mundo en constante cambio.', // [cite: 82, 83]
            niveles: [
                'Nivel 1: Todos los edificios (Mercado, Cuartel, Muralla) te cuestan 50 de Oro menos al construir.', // [cite: 84]
                'Nivel 2 (5 XP): Tus "Murallas" ahora dan +3 al dado de defensa (en lugar de +2).', // [cite: 85]
                'Nivel 3 (15 XP): Puedes construir un edificio único: El "Taller" (Costo: 300 Oro). Actúa como Mercado, Cuartel y Muralla a la vez.' // [cite: 86, 87]
            ]
        },
        {
            image: './imgs/elizabeth.jpg', // [cite: 89]
            title: 'Elizabeth I', // [cite: 89]
            description: 'La indomable reina de Inglaterra, Isabel I navegó las tormentas de la política y la guerra con una determinación férrea. Su flota y su ingenio la convirtieron en una potencia global.', // [cite: 91, 92]
            niveles: [
                'Nivel 1: Cada vez que ganas una batalla como atacante, ganas 25 de Oro (Saqueo).', // [cite: 93]
                'Nivel 2 (5 XP): El mantenimiento de tus tropas se reduce a la mitad (1 Oro por cada 20 tropas) mientras controles menos hexágonos que al menos otro jugador.', // [cite: 94]
                'Nivel 3 (15 XP): Una vez por juego, puedes anular por completo un ataque enemigo contra uno de tus hexágonos. La acción se gasta y no hay batalla.' // [cite: 95, 96]
            ]
        }
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
                                <img className='w-full mx-auto mb-8 rounded-md object-cover' src={s.image} alt={s.title} />
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

export default Slider