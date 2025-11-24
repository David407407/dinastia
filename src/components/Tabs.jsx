import React, { useState } from 'react'

const Tabs = () => {
    const [activeTab, setActiveTab ] = useState('tab1')

    const tabs = [
        {
            id: 'tab1',
            label: 'Recaudar'
        },
        {
            id: 'tab2',
            label: 'Actuar'
        },
        {
            id: 'tab3',
            label: 'Pagar'
        },
    ]

    const tabsInfo = {
        tab1: (
            <div className="tab-content ">
                    <div className="flex items-center mb-4">
                        
                        <h3 className="text-2xl roboto roboto-bold font-bold mt-4">El Tesoro del Reino</h3>
                    </div>
                    <p className="mb-4">El oro hace girar el mundo. Al inicio de tu turno cobras:</p>
                    <ul className="list-disc list-inside space-y-2 font-bold text-wood/80">
                        <li>+100 de Oro (Ingreso Base).</li>
                        <li>+10 de Oro por CADA hexágono que controles.</li>
                        <li>+ Bonificaciones de tus edificios (ej. Mercados).</li>
                    </ul>
                </div>
        ),
        tab2: (
            <div id="actuar" className="tab-content">
                    <div className="flex items-center mb-4">
                        <h3 className="text-2xl roboto roboto-bold font-bold mt-4">La Estrategia</h3>
                    </div>
                    <p className="mb-4">Realiza estas acciones tantas veces como puedas pagar:</p>
                    <div className="space-y-4">
                        <div className="border-l-4 border-crimson pl-4">
                            <strong className="text-crimson block">MOVER</strong>
                            <span className="text-sm">Desplaza un ejército 1 hexágono. Puedes dividir o fusionar tropas.</span>
                        </div>
                        <div className="border-l-4 border-crimson pl-4">
                            <strong className="text-crimson block">RECLUTAR</strong>
                            <span className="text-sm">Paga <span className="font-bold">20 Oro</span> por 1 Tropa nueva en tu Capital.</span>
                        </div>
                        <div className="border-l-4 border-crimson pl-4">
                            <strong className="text-crimson block">CONSTRUIR</strong>
                            <span className="text-sm">Levanta edificios en tus territorios originales.</span>
                        </div>
                    </div>
                </div>
        ),
        tab3: (
            <div id="pagar" className="tab-content">
                    <div className="flex items-center mb-4">
                        <h3 className="text-2xl roboto roboto-bold font-bold mt-4">El Mantenimiento</h3>
                    </div>
                    <div className="bg-wood/10 p-4 rounded border border-wood/20">
                        <p className="font-bold text-crimson mb-2">LA REGLA DE PAGO:</p>
                        <p>Paga <span className="font-black">1 de Oro</span> por cada <span className="font-black">10 Tropas</span> que tengas en el tablero.</p>
                        <p className="text-sm italic mt-2 text-gray-600">(Ejemplo: 45 tropas = pagas 5 de Oro)</p>
                    </div>
                    <p className="mt-4 text-sm text-red-600 font-bold">⚠️ Si no puedes pagar, ¡debes eliminar tropas hasta que puedas!</p>
                </div>
        )
    }
  return (
    <div className='max-w-9/10  rounded-2xl p-8 mx-auto shadow-md border-4 border-zinc-200 '>
        <div className='flex flex-wrap border-b-2'>
            {
                tabs.map( (tab, i) => (
                    <button key={i} className={`cursor-pointer px-4 py-2 font-semibold roboto ${ activeTab === tab.id ?
                        'border-b-2  border-b-[#FFD700] cursor-pointer text-[#FFD700] ' : 'text-gray-300 hover:text-[#FFD700]'
                     }`}
                     onClick={ () => setActiveTab(tab.id)}
                     >
                        {tab.label}
                    </button>
                ))
            }

            
        </div>
        {
            tabsInfo[activeTab]
        }
    </div>
  )
}

export default Tabs