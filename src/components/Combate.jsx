import React from 'react'

const Combate = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
    <h2 className="text-2xl lg:text-6xl text-center charm-regular uppercase">Combate</h2>
    <div className="w-full flex flex-col gap-8">
        <div className=" w-9/10 lg:w-1/3 mx-auto px-8 py-6 rounded-md border-2 border-amber-300">
            <h3 className="charm-bold text-4xl border-b-2 mb-2 pb-3">Expansión</h3>
            <h4 className="roboto roboto-bold text-xl">Territorio Vacío</h4>
            <p>Si entras a un hexágono sin enemigos, es tuyo automáticamente.</p>
            <p>Nota Importante (Resaltada): "¡La Regla de la Guarnición! Debes dejar al menos 1 Tropa para mantener el control del hexágono."</p>
        </div>
        <div className=" w-9/10 lg:w-1/3 mx-auto px-8 py-6 rounded-md border-2 border-amber-300">
            <h3 className="charm-bold text-4xl border-b-2 mb-2 pb-3">La Batalla</h3>
            <h4 className="roboto roboto-bold text-xl">Choque de Ejércitos</h4>
            <ul className="list-disc pl-4">
                <li>
                    <p className="text-[#FFD700] text-lg">"¡La Regla de la Guarnición! Debes dejar al menos 1 Tropa para mantener el control del hexágono."</p>       
                </li>
                <li>
                    <p>Si entras a un hexágono sin enemigos, es tuyo automáticamente.</p>
                </li>
                <li>

                    <div className="w-full">
                        <h3 className=" roboto roboto-bold text-xl border-b-2 mb-2 pb-3">¿Cómo ganar una batalla?</h3>
                        <p className=''>[TROPAS]+[DADO D6]+[BONOS DE HÉROE]</p>
                        <h4 className="roboto roboto-bold text-md">Resolución:</h4>
                        
                        <ol className="list-disc pl-4">
                            <li>
                               <p>Atacante gana: Destruye al ejército enemigo y ocupa el terreno.</p> 
                            </li>
                            <li>
                                <p>Defensor gana (o empata): El atacante pierde la MITAD de sus tropas y huye.</p>
                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
            
            
        </div>

    </div>
</div>
  )
}

export default Combate