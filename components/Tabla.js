"use client"
import "@/Styles/Tabla.css";
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
export default function Tabla() {
  const [Reporte, setReporte] = useState([]);
  const [botonActivo, setBotonActivo] = useState(null);

  const handleButtonClick = (id) => {
    if (id === 1) {
      fetch(`http://localhost:3006/detalles/?page=1&limit=10&sortField=idProducto&sortOrder=desc&id=${id}`)
        .then(response => response.json())
        .then(data => setReporte(data.data))
        .catch(error => console.error('Error ', error));
    }
    setBotonActivo(id);
  };

  useEffect(() => {
    handleButtonClick(0);

    var pusher = new Pusher('01df5ea634a929af9141', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('pedidos');
    channel.bind('nuevo', function(data) {
      setReporte(data.json().data);
    });
  }, []);

  return (
    <div className="contenedorpapa">
      <div>
        <button className={`btn ${botonActivo === 1 ? 'presionado' : ''}`} onClick={() => handleButtonClick(1)}>
          Diario
        </button>
        <button className={`btn ${botonActivo === 2 ? 'presionado' : ''}`} onClick={() => handleButtonClick(2)}>
          Semanal
        </button>
      </div>
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
            {Reporte.map(item => (
              <tr key={item.idProducto}>
                <td>{item.nombre}</td>
                <td>${item.total / item.cant}</td>
                <td>{item.cant}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
