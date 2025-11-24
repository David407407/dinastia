import React from 'react'
import Slider from "./Slider";
import SliderPiezas from "./SliderPiezas";

const Piezas = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
    <h2 className="text-2xl lg:text-6xl text-center charm-regular uppercase">Piezas</h2>
    <div className=" w-9/10 lg:w-1/3 mx-auto rounded-md  ">
        <Slider />

        <SliderPiezas />
    </div>

</div>
  )
}

export default Piezas