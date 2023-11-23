"use client"
import { useState } from "react";
import "/styles/pedidosTotales.css"
import Link from "next/link";

function PedidosTotalesC(){
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const handleSeleccion = (event) => {
      setOpcionSeleccionada(event.target.value);
    };
    return(
        
        <section>
            <Link href="/pedidosTotales/pedidosOpc"><div id="pLlevar">
                <h1>Para llevar 1</h1>
                <h1>Para llevar 2</h1>
            </div></Link>
            <div id="mesa">
                <h1>Mesa 1</h1>
                <h1>Mesa 2</h1>

            </div>

            <button onClick={openModal} id="btnAgregar">Agregar</button>

            {showModal && (
                <div className="modalAtras">
                    <div className="modalAdentro"> 
                         {/* Ingresar la foto o los datos de lo que esta en el delete logico*/}
                         <div id="opcionesPedido">
                    
                            <select id="mesasOpc" value={opcionSeleccionada} onChange={handleSeleccion}>
                                <option value="">Mesas</option>
                                <option value="opcion1">Mesa 1</option>
                                <option value="opcion2">Mesa 2</option>
                                <option value="opcion3">Mesa 3</option>
                            </select>

                            <button id="btnPLlevar">Para llevar</button>
                         </div>
                         <div className="o">
                            <Link href="/inventario/agregarProducto"><button id="btn-Confirmar" onClick={closeModal}>Confirmar</button></Link>
                            <button id="btn-Cerrar" onClick={closeModal}>Cancelar</button>
                         </div>
                       </div>
                    
                </div>
            )}
        </section>

    );
}

export default PedidosTotalesC;
