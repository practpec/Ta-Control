"use client"
import "@/Styles/Tabla.css"
import { useState } from 'react'
export default function Tabla(){
 
    const [botonActivo, setBotonActivo] = useState(null);

    const handleButtonClick = (id) => {
      setBotonActivo(id);
    };
    return(
        <div className="contenedorpapa">
        <div>
           <button className={`btn ${botonActivo === 1 ? 'presionado' : ''}`} onClick={() => handleButtonClick(1)}>
            Diario
           </button>
           <button className={`btn ${botonActivo === 2 ? 'presionado' : ''}`} onClick={() => handleButtonClick(2)}>
           Semanal
           </button></div>
           <div className="tabla">
           <table className="mi-tabla">
          <thead>
            <tr>
              <th>Menu</th>
              <th>Precio de C/U</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Taco </td>
              <td>$ 10</td>
              <td>60</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>Refresco </td>
              <td>$ 20</td>
              <td>20</td>
              <td>$400</td>
            </tr>
            <tr>
              <td>Taco </td>
              <td>$ 10</td>
              <td>60</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>Refresco </td>
              <td>$ 20</td>
              <td>20</td>
              <td>$400</td>
            </tr>
            <tr>
              <td>Taco </td>
              <td>$ 10</td>
              <td>60</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>Refresco </td>
              <td>$ 20</td>
              <td>20</td>
              <td>$400</td>
            </tr>
            <tr>
              <td>Taco </td>
              <td>$ 10</td>
              <td>60</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>Refresco </td>
              <td>$ 20</td>
              <td>20</td>
              <td>$400</td>
            </tr>
            <tr>
              <td>Taco </td>
              <td>$ 10</td>
              <td>60</td>
              <td>$600</td>
            </tr>
            <tr>
              <td>Refresco </td>
              <td>$ 20</td>
              <td>20</td>
              <td>$400</td>
            </tr>
          
          </tbody>
        </table>
           </div>

        </div>
    )
}