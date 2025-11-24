import React from 'react'

const Objetivo = () => {
  return (
    <div className="w-full my-8 flex flex-col lg:flex-row justify-center items-center gap-8">
    <img className="w-48 ml-auto mr-auto lg:rounded-md lg:ml-auto lg:mr-0" src={'/imgs/tablero.jpg'} alt={'Tablero de Dinastía'} />
    <div className=" w-3/4 lg:w-1/3 mr-auto ml-auto lg:mr-auto lg:ml-0 border-4 border-[#F5E8C3] px-8 py-6 rounded-md">
          <h1 className="text-2xl lg:text-6xl mb-4 text-center charm-bold uppercase">Objetivo del juego</h1>
      <p className="roboto text-center text-sm lg:text-lg mb-3">El tiempo es tu juez. Al finalizar 30 Rondas, el soberano que controle la mayor extensión de territorio será coronado vencedor supremo.</p>

    </div>
</div>
  )
}

export default Objetivo