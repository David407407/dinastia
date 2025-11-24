import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// URL del servidor
const SOCKET_URL = 'https://dinastia-backend.onrender.com';

// --- COMPONENTES DEL MANUAL ---
const ManualSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-serif text-gold mb-3 border-b-2 border-crimson/50 inline-block tracking-wide uppercase">{title}</h3>
        <div className="text-sm text-parchment/90 space-y-3 font-sans leading-relaxed">{children}</div>
    </div>
);

const Objetivo = () => (
    <ManualSection title="Objetivo: Hegemonía Total">
        <p>El destino del mundo se decide en <span className="text-gold font-bold">20 Rondas</span>. Al caer el último grano de arena, el soberano que controle la <strong>mayor cantidad de hexágonos</strong> en el tablero será coronado como el vencedor supremo.</p>
        <p>Comienzas tu legado con una <strong>Capital</strong>, fuente de tu poder inicial. Desde allí, debes expandirte, conquistar y defender tu imperio.</p>
    </ManualSection>
);

const Economia = () => (
    <ManualSection title="Economía y Gestión">
        <p>El oro es la sangre de la guerra. Tus ingresos al inicio de cada turno se calculan así:</p>
        <ul className="list-disc list-inside ml-2 text-xs space-y-1 mb-2">
            <li><strong>Capital:</strong> +100 Oro (Base).</li>
            <li><strong>Mercados:</strong> +50 Oro por cada uno.</li>
            <li><strong>Territorios:</strong> Ingresos variables según control.</li>
        </ul>
        <div className="bg-red-900/20 p-3 rounded border border-red-500/30 my-2 text-xs">
            <strong>⚠️ Mantenimiento del Ejército:</strong><br/>
            Un gran ejército requiere grandes recursos. Al final de tu turno, debes pagar <span className="text-gold">1 Oro</span> por cada <span className="text-white">10 Tropas</span> bajo tu mando. Si no puedes pagar, tus soldados desertarán.
        </div>
    </ManualSection>
);

const EdificiosInfo = () => (
    <ManualSection title="Estructuras del Reino">
        <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="flex items-start gap-2">
                <span className="text-2xl">⚖️</span>
                <div>
                    <strong className="text-gold block">Mercado (Coste: 500 Oro)</strong>
                    El motor de tu economía. Genera <span className="text-green-400">+50 Oro</span> adicionales al inicio de cada turno. Es vital para financiar guerras largas.
                </div>
            </div>
            <div className="flex items-start gap-2">
                <span className="text-2xl">🏰</span>
                <div>
                    <strong className="text-gold block">Cuartel (Coste: 200 Oro)</strong>
                    Centro de reclutamiento. Permite reclutar tropas en este hexágono y genera <span className="text-red-400">+2 Tropas</span> automáticamente cada turno (levas locales).
                </div>
            </div>
            <div className="flex items-start gap-2">
                <span className="text-2xl">🧱</span>
                <div>
                    <strong className="text-gold block">Muralla (Coste: 400 Oro)</strong>
                    Fortificación defensiva. Otorga un bono de <span className="text-blue-400">+2 a la Defensa</span> a cualquier ejército estacionado en este hexágono.
                </div>
            </div>
        </div>
    </ManualSection>
);

const CombateInfo = () => (
    <ManualSection title="El Arte de la Guerra">
        <p>La diplomacia ha fallado. Cuando mueves tu ejército a un hexágono ocupado por un rival, inicia una <strong>Batalla</strong>.</p>
        
        <h4 className="text-gold font-bold mt-2 mb-1">⚔️ Resolución de Combate</h4>
        <p>Ambos jugadores lanzan un dado de 6 caras (D6). El poder total de cada bando se calcula:</p>
        <div className="bg-black/40 p-2 rounded text-center border border-gold/20 font-mono text-xs my-2 text-green-200">
            FUERZA = (TROPAS / 10) + TIRA DE DADO + BONOS
        </div>
        
        <ul className="list-disc list-inside text-xs space-y-1">
            <li><strong>Victoria del Atacante:</strong> Si tu fuerza total supera a la del defensor, tomas el control del hexágono. El ejército defensor es eliminado.</li>
            <li><strong>Victoria del Defensor (o Empate):</strong> El defensor repele el ataque. El atacante pierde la <strong>mitad</strong> de sus tropas y debe retirarse al hexágono desde donde atacó.</li>
        </ul>

        <h4 className="text-gold font-bold mt-3 mb-1">🚩 Conquista y Saqueo</h4>
        <p>Si capturas un hexágono con edificios enemigos, estos pasan a ser tuyos. Sin embargo, si pierdes el control del territorio, pierdes también los beneficios de esas estructuras.</p>
    </ManualSection>
);

const Movimiento = () => (
    <ManualSection title="Movimiento y Maniobras">
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Mover:</strong> Puedes mover cualquier número de tropas de un hexágono a uno adyacente por turno.</li>
            <li><strong>Dividir Fuerzas:</strong> Puedes dejar una guarnición y mover el resto del ejército.</li>
            <li><strong>Regla de Ocupación:</strong> Para mantener el control de un hexágono y recibir sus beneficios, debes dejar al menos <strong>1 Tropa</strong> estacionada en él. Un territorio vacío se considera neutral.</li>
        </ul>
    </ManualSection>
);

const Icons = {
    Gold: () => <span className="text-yellow-400 text-lg mr-1">💰</span>,
    Troop: () => <span className="text-red-400 text-lg mr-1">⚔️</span>,
    Market: () => <span className="text-2xl">⚖️</span>,
    Barracks: () => <span className="text-2xl">🏰</span>,
    Wall: () => <span className="text-2xl">🧱</span>,
    Castle: () => <span className="text-2xl">🏯</span>,
    Time: () => <span className="text-lg mr-1">⏳</span>,
    Book: () => <span className="text-2xl">📖</span>,
    Close: () => <span className="text-xl font-bold">✕</span>,
    Skull: () => <span className="text-xl">💀</span>,
    Flag: () => <span className="text-xl">🚩</span>
};

export default function GameDashboard() {
    const [socket, setSocket] = useState(null);
    const [showManual, setShowManual] = useState(false);
    const [showConquestModal, setShowConquestModal] = useState(false);

    // --- ESTADO DEL JUEGO ---
    const [round, setRound] = useState(1);
    const [activeTurnId, setActiveTurnId] = useState(null);
    
    // --- DATOS ---
    const [opponents, setOpponents] = useState([]);
    const [player, setPlayer] = useState(null);
    const [myBuildings, setBuildings] = useState([]);

    const [buildOptions] = useState([
        { id: 'build-1', name: "Mercado", cost: 500, icon: "Market", desc: "+50 Oro/turno", income: 50 },
        { id: 'build-2', name: "Cuartel", cost: 200, icon: "Barracks", desc: "+2 Tropas/turno", recruit: 2 },
        { id: 'build-3', name: "Muralla", cost: 400, icon: "Wall", desc: "+2 Defensa", defense: 2 },
    ]);

    // Opciones de edificios que puedes encontrar al conquistar
    const conquestOptions = [
        { id: 'conq-1', name: "Mercado Enemigo", type: "Market", desc: "Capturado (+50 Oro)", income: 50 },
        { id: 'conq-2', name: "Cuartel Enemigo", type: "Barracks", desc: "Capturado (+2 Trp)", recruit: 2 },
        { id: 'conq-3', name: "Muralla Enemiga", type: "Wall", desc: "Capturada (+2 Def)", defense: 2 },
    ];

    // --- CONEXIÓN SOCKET ---
    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('init_player', (myCharacter) => {
            setPlayer({ ...myCharacter, turno: myCharacter.socketId });
            setBuildings(myCharacter.buildings || []);
        });

        newSocket.on('game_state_update', (serverState) => {
            setRound(serverState.round);
            setActiveTurnId(serverState.currentTurnId);
            
            const myId = newSocket.id;
            const others = serverState.players.filter(p => p.socketId !== myId);
            const me = serverState.players.find(p => p.socketId === myId);

            setOpponents(others);
            
            if (me && serverState.currentTurnId !== myId) {
               setPlayer({ ...me, turno: me.socketId });
               setBuildings(me.buildings || []);
            }
        });

        return () => newSocket.close();
    }, []);

    // --- ACCIONES ---

    const handleTurn = () => {
        if (!socket || activeTurnId !== socket.id) return;
        
        let capitalIncome = 100;
        if (player.name.includes("Mansa Musa")) capitalIncome += 50;

        const buildingIncome = myBuildings.reduce((total, b) => total + (b.income || 0), 0);
        const grossIncome = capitalIncome + buildingIncome;

        let maintenanceCost = Math.floor(player.troops / 10);
        
        const passiveRecruit = myBuildings.reduce((total, b) => total + (b.recruit || 0), 0);

        let newGold = player.gold + (grossIncome - maintenanceCost);
        if (newGold < 0) newGold = 0; 

        const playerActualizado = {
            ...player,
            gold: newGold,
            troops: player.troops + passiveRecruit,
            buildings: myBuildings
        };

        setPlayer(playerActualizado);
        socket.emit('end_turn', { updatedPlayer: playerActualizado });
    };

    const handleBuilding = (b) => {
        if (!socket || activeTurnId !== socket.id) {
            alert("Espera tu turno."); return;
        }

        let finalCost = b.cost;
        if (player.name.includes("Cleopatra")) finalCost = Math.floor(b.cost * 0.9);
        if (player.name.includes("Leonardo")) finalCost = Math.max(0, b.cost - 50);

        if(player.gold - finalCost >= 0) {
            const newBuilding = { ...b, id: Date.now() };
            setBuildings([...myBuildings, newBuilding]);
            setPlayer({ ...player, gold: player.gold - finalCost });
        } else {
            alert(`Oro insuficiente. Costo: ${finalCost}`);
        }
    }

    // --- NUEVAS FUNCIONES: COMBATE Y CONQUISTA ---

    const handleDisbandTroops = () => {
        if (!socket || activeTurnId !== socket.id) {
            alert("Espera tu turno para gestionar tu ejército."); return;
        }
        if (player.troops >= 10) {
            const confirmDisband = confirm("¿Licenciar 10 tropas para ahorrar mantenimiento?");
            if (confirmDisband) {
                setPlayer({ ...player, troops: player.troops - 10 });
            }
        } else {
            alert("No tienes suficientes tropas para licenciar un batallón (mínimo 10).");
        }
    };

    const handleConquest = (buildingType) => {
        // Añadir edificio capturado
        const newBuilding = { 
            ...buildingType, 
            id: Date.now(), 
            isConquered: true // Marca para saber que no es construcción propia original
        };
        setBuildings([...myBuildings, newBuilding]);
        setShowConquestModal(false);
    };

    const handleLoseBuilding = (buildingId) => {
        if (!socket || activeTurnId !== socket.id) return; // Solo en tu turno para evitar errores de sincro raros
        
        const confirmLoss = confirm("¿Has perdido este territorio? El edificio será eliminado de tu control.");
        if (confirmLoss) {
            const updatedBuildings = myBuildings.filter(b => b.id !== buildingId);
            setBuildings(updatedBuildings);
            // Actualizamos al jugador para que si termina turno, se guarde
            setPlayer({ ...player, buildings: updatedBuildings }); 
        }
    };


    // --- RENDER ---
    if (!player) return <div className="flex h-full items-center justify-center text-gold animate-pulse bg-wood-dark">Conectando...</div>;

    const isMyTurn = activeTurnId === socket.id;
    const maintenancePreview = Math.floor(player.troops / 10);
    let baseForPreview = 100;
    if (player.name.includes("Mansa Musa")) baseForPreview += 50;
    const incomePreview = (baseForPreview + myBuildings.reduce((t, b) => t + (b.income || 0), 0)) - maintenancePreview;

    return (
        <div className="flex flex-col h-full max-w-md mx-auto shadow-2xl overflow-hidden relative bg-wood-dark">
            
            {/* MODAL MANUAL */}
            {showManual && (
                <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-start pt-10 px-4 animate-fade-in">
                    <div className="bg-wood border-4 border-gold rounded-xl w-full h-[85%] relative flex flex-col shadow-2xl">
                        <div className="p-4 border-b-2 border-gold/50 flex justify-between items-center bg-black/20">
                            <h2 className="text-2xl font-serif text-gold-light tracking-widest uppercase">Códice</h2>
                            <button onClick={() => setShowManual(false)} className="text-crimson bg-wood-dark rounded-full w-8 h-8 flex items-center justify-center border border-gold"><Icons.Close /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-wood-dark">
                            <Objetivo /><Economia /><EdificiosInfo />
                            <div className="text-center mt-8 mb-4">
                                <button onClick={() => setShowManual(false)} className="px-6 py-2 bg-gold text-wood-dark font-bold rounded hover:bg-gold-light">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL CONQUISTA */}
            {showConquestModal && (
                <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center px-4 animate-fade-in">
                    <div className="bg-wood border-4 border-gold rounded-xl w-full p-6 relative shadow-2xl text-center">
                        <h3 className="text-2xl font-serif text-gold mb-4">¡Territorio Conquistado!</h3>
                        <p className="text-parchment mb-6 text-sm">¿Qué has encontrado en estas tierras?</p>
                        
                        <div className="grid gap-3">
                            {conquestOptions.map(opt => (
                                <button key={opt.id} onClick={() => handleConquest(opt)} className="flex items-center justify-between p-3 bg-wood-dark border border-gold/30 rounded hover:border-gold hover:bg-black/40 transition-colors">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3 text-gold">{Icons[opt.type]()}</span>
                                        <div className="text-left">
                                            <span className="block font-bold text-parchment">{opt.name}</span>
                                            <span className="text-xs text-gold/70">{opt.desc}</span>
                                        </div>
                                    </div>
                                    <span className="text-green-400 font-bold text-xl">+</span>
                                </button>
                            ))}
                            <button onClick={() => setShowConquestModal(false)} className="mt-2 p-3 border border-white/20 text-gray-400 rounded hover:bg-white/10">
                                Nada (Solo Tierra)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOP BAR */}
            <div className="bg-black/40 backdrop-blur-sm p-3 border-b border-gold/30">
                <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowManual(true)} className="text-gold hover:text-white transition-transform active:scale-95"><Icons.Book /></button>
                        <span className="text-gold font-serif text-xs tracking-widest uppercase">Dinastía</span>
                    </div>
                    <span className="text-parchment font-bold text-xs flex items-center bg-wood px-2 py-0.5 rounded border border-gold/20"><Icons.Time /> Ronda {round}</span>
                </div>
                <div className="flex justify-between items-center space-x-2 overflow-x-auto no-scrollbar">
                    {opponents.map(opp => {
                        const isOppTurn = activeTurnId === opp.socketId;
                        return (
                            <div key={opp.id} className={`flex items-center px-2 py-1 rounded border transition-all duration-300 min-w-[100px] ${isOppTurn ? 'border-gold bg-wood scale-105' : 'border-white/10 opacity-70'}`}>
                                <div className={`w-8 h-8 rounded-full ${opp.color} border-2 bg-black flex items-center justify-center text-xs font-bold text-white mr-2 relative`}>
                                    {opp.avatar}
                                    {isOppTurn && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[10px] text-gray-300"><Icons.Gold /> {opp.gold}</div>
                                    <div className="text-[10px] text-gray-300"><Icons.Troop /> {opp.troops}</div>
                                </div>
                            </div>
                        );
                    })}
                    {[...Array(Math.max(0, 3 - opponents.length))].map((_, i) => (
                        <div key={i} className="flex items-center justify-center min-w-[100px] opacity-30 text-xs">Esperando...</div>
                    ))}
                </div>
            </div>

            {/* PLAYER STATS */}
            <div className={`relative p-3 text-center border-b-4 shadow-lg z-10 transition-all duration-500 ${isMyTurn ? 'bg-wood border-gold' : 'bg-wood/60 border-gray-700 grayscale-[0.3]'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className={`font-serif text-xl font-bold drop-shadow-md ${isMyTurn ? 'text-gold-light' : 'text-gray-400'}`}>{player.name}</h2>
                    {isMyTurn && <span className="text-[10px] bg-green-600 text-white px-2 rounded-full animate-pulse">TU TURNO</span>}
                </div>
                <div className="flex justify-center gap-8 mb-3">
                    <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-gold/50 w-28">
                        <span className="text-2xl mb-1">💰</span>
                        <span className="text-xl font-bold text-white">{player.gold}</span>
                        <span className={`text-[10px] uppercase tracking-wider ${incomePreview >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {incomePreview >= 0 ? '+' : ''}{incomePreview}/turno
                        </span>
                    </div>
                    {/* TARJETA DE TROPAS MODIFICADA: Botón estático para móvil */}
                    <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-crimson/50 w-28 relative">
                        <span className="text-2xl mb-1">⚔️</span>
                        <span className="text-xl font-bold text-white">{player.troops}</span>
                        <span className="text-[10px] text-crimson uppercase tracking-wider">-{maintenancePreview} Oro/t</span>
                        
                        {/* Botón explícito para licenciar tropas */}
                        {isMyTurn && (
                            <button 
                                onClick={handleDisbandTroops}
                                className="mt-2 bg-red-900/90 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-red-500 flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                                title="Licenciar 10 tropas para ahorrar mantenimiento"
                            >
                                <Icons.Skull /> -10
                            </button>
                        )}
                    </div>
                </div>
                {isMyTurn && (
                    <div className="flex justify-center gap-2">
                        <button onClick={() => setShowConquestModal(true)} className="bg-wood-dark text-gold border border-gold/50 px-4 py-1 rounded text-xs uppercase font-bold hover:bg-gold hover:text-wood-dark flex items-center">
                            <span className="mr-1"><Icons.Flag /></span> Capturar
                        </button>
                        <button onClick={handleTurn} className="bg-crimson text-white font-bold px-6 py-1 rounded-full border-2 border-gold hover:bg-red-700 uppercase text-sm tracking-widest shadow-lg">
                            Finalizar <span className="ml-1">➜</span>
                        </button>
                    </div>
                )}
            </div>

            {/* LISTA DE ESTRUCTURAS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-wood-dark relative">
                <h3 className="text-parchment/70 font-serif text-sm border-b border-parchment/20 pb-1 mb-3">Tus Dominios</h3>
                
                {/* CAPITAL */}
                <div className="flex items-center p-3 bg-wood/50 border border-gold/40 rounded shadow-md">
                    <div className="w-12 h-12 bg-black/40 rounded flex items-center justify-center border border-white/10 mr-4 text-gold"><Icons.Castle /></div>
                    <div className="flex-1">
                        <h4 className="text-parchment font-bold">Capital</h4>
                        <p className="text-xs text-gold/80">Sede del Imperio</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs bg-yellow-900/50 text-yellow-200 px-2 py-1 rounded border border-yellow-800">
                            +{player.name.includes("Mansa") ? '150' : '100'} Oro
                        </span>
                    </div>
                </div>

                {myBuildings.map((b, i) => (
                    <div key={b.id || i} className={`flex items-center p-3 border rounded shadow-md relative group ${b.isConquered ? 'bg-wood-dark border-crimson/60' : 'bg-wood border-gold/20'}`}>
                        <div className={`w-12 h-12 bg-black/40 rounded flex items-center justify-center border border-white/10 mr-4 ${b.isConquered ? 'text-crimson' : 'text-gold'}`}>
                            {Icons[b.type] ? Icons[b.type]() : '🏠'}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-parchment font-bold">{b.name}</h4>
                            <p className="text-xs text-gold/80">{b.desc}</p>
                        </div>
                        <div className="text-right">
                             {b.income && <span className="text-xs bg-green-900/50 text-green-200 px-2 py-1 rounded border border-green-800">+{b.income} Oro</span>}
                             {b.recruit && <span className="text-xs bg-red-900/50 text-red-200 px-2 py-1 rounded border border-red-800">+{b.recruit} Trp</span>}
                             {b.defense && <span className="text-xs bg-blue-900/50 text-blue-200 px-2 py-1 rounded border border-blue-800">+{b.defense} Def</span>}
                        </div>
                        
                        {/* Botón para ELIMINAR edificio si pierdes el territorio */}
                        {isMyTurn && (
                            <button 
                                onClick={() => handleLoseBuilding(b.id)}
                                className="absolute top-0 right-0 w-6 h-6 bg-red-600 text-white text-xs flex items-center justify-center rounded-bl  transition-opacity hover:bg-red-800"
                                title="Perder Territorio"
                            >
                                X
                            </button>
                        )}
                    </div>
                ))}
                <div className="h-[180px]"></div>
            </div>

            {/* MENÚ DE CONSTRUCCIÓN */}
            <div className={`absolute bottom-0 left-0 w-full border-t-4 shadow-[0_-5px_20px_rgba(0,0,0,0.7)] z-20 rounded-t-xl transition-transform duration-300 ${isMyTurn ? 'bg-slate-900 border-gold translate-y-0' : 'bg-gray-800 border-gray-600 translate-y-full opacity-0'}`}>
                <div className="p-2 bg-gold/20 text-center border-b border-gold/30">
                    <span className="text-xs font-bold font-serif uppercase tracking-widest text-parchment">
                        Construir 
                        {player.name.includes("Cleopatra") && <span className="text-green-400 ml-1">(-10%)</span>}
                        {player.name.includes("Leonardo") && <span className="text-blue-400 ml-1">(-50)</span>}
                    </span>
                </div>
                <div className="flex justify-around p-3 pb-6">
                    {buildOptions.map(opt => {
                         let displayCost = opt.cost;
                         if (player.name.includes("Cleopatra")) displayCost = Math.floor(opt.cost * 0.9);
                         if (player.name.includes("Leonardo")) displayCost = Math.max(0, opt.cost - 50);

                         return (
                            <button onClick={() => handleBuilding(opt)} key={opt.id} className="flex flex-col items-center group active:scale-95 w-1/3">
                                <div className="w-14 h-14 bg-wood text-gold rounded-full flex items-center justify-center border-2 border-wood group-hover:border-crimson shadow-lg mb-1 relative overflow-hidden">
                                    {Icons[opt.icon]()}
                                </div>
                                <span className="font-bold text-sm text-parchment">{opt.name}</span>
                                <span className={`text-xs font-bold ${player.gold >= displayCost ? 'text-crimson' : 'text-gray-500'}`}>🟡 {displayCost}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
            
            {!isMyTurn && (
                <div className="absolute bottom-0 left-0 w-full bg-black/80 text-parchment p-4 text-center border-t border-gold/30 backdrop-blur z-30">
                    <p className="font-serif animate-pulse">Esperando al enemigo...</p>
                </div>
            )}
        </div>
    );
}