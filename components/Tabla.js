"use client"
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

import "@/Styles/Tabla.css";

const Tabla = () => {
  const [reporte, setReporte] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3006/detalles/?page=1&limit=10&sortField=idProducto&sortOrder=desc`);
      const data = await response.json();
      console.log('Data from API:', data);
      setReporte(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePusherData = (data) => {
    console.log('Data from Pusher:', data);
  
    // Asegúrate de acceder a data.data para obtener el array real
    const dataArray = data.data || [];
  
    setReporte(prevReporte => {
      const updatedReporte = prevReporte.map(item => {
        const matchingData = dataArray.find(d => d.idProducto === item.idProducto);
  
        if (matchingData) {
          console.log(`Updating item with idProducto ${item.idProducto}`);
          return {
            ...item,
            cant: parseInt(matchingData.cant, 10), // Utiliza la cantidad acumulada directamente
            total: parseInt(matchingData.total, 10)
          };
        }
        return item;
      });
  
      dataArray.forEach(dataItem => {
        if (!prevReporte.some(item => item.idProducto === dataItem.idProducto)) {
          console.log(`Adding new item with idProducto ${dataItem.idProducto}`);
          updatedReporte.push({
            idProducto: dataItem.idProducto,
            nombre: dataItem.nombre,
            cant: parseInt(dataItem.cant, 10),
            total: parseInt(dataItem.total, 10)
          });
        }
      });
  
      console.log('Updated Reporte:', updatedReporte);
  
      return updatedReporte;
    });
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
      <button className='btn'> Diario</button>
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
              <tr key={item.idProducto}>
                <td>{item.nombre}</td>
                <td>${item.cant > 0 ? item.total / item.cant : 'N/A'}</td>
                <td>{item.cant}</td>
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
