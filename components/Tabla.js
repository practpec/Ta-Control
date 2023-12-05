"use client"
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

import "@/Styles/Tabla.css";

const Tabla = () => {
  const [reporte, setReporte] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://ec2-54-205-202-188.compute-1.amazonaws.com/detalles/?page=1&limit=10&sortField=id_producto&sortOrder=desc`);
      const data = await response.json();
      console.log('Data from API:', data);
      setReporte(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePusherData = (data) => {
    console.log('Data from Pusher:', data);

    if (data && data.data) {
      const dataArray = data.data;

      setReporte((prevReporte) => {
        // Actualizar el estado directamente con los nuevos datos
        return dataArray;
      });
    } else {
      console.error('Invalid data received from Pusher:', data);
    }
  };

  useEffect(() => {
    fetchData();

    const pusher = new Pusher('01df5ea634a929af9141', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('pedidos');
    
    channel.bind('nuevo', handlePusherData);

    return () => {
      channel.unbind(); 
      pusher.unsubscribe('pedidos'); 
    };
  }, []);

  return (
    <div className="contenedorpapa">
      <button className='btn'> Semanal</button>
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
            {Array.isArray(reporte) && reporte.map(item => (
              <tr key={item.id_producto}>
                <td>{item.nombre}</td>
                <td>${item.cantidad > 0 ? item.total / item.cantidad : 'N/A'}</td>
                <td>{item.cantidad}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabla;
