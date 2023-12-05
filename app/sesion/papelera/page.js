"use client"
import { useEffect, useState } from 'react';
import styles from '@/Styles/Inventario.module.css';
import Image from 'next/image';
import style from '@/Styles/Papelera.module.css';

export default function Papelera() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/productos/deleted/')
      .then(response => response.json())
      .then(data => setProductos(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const opcionEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
      } else {
        console.error('Error al eliminar el producto.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const opcionRecuperar = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/productos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Producto recuperado con éxito.');
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
      } else {
        console.error('Error al recuperar el producto.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className={styles.papa}>
      <div className={styles.tituloTabla}>
        <h1>Papelera</h1>
      </div>
      <div className={styles.container}>
        {productos.map(producto => (
          <div className={styles.card} key={producto.id}>
            <Image src={producto.imagen} alt={producto.nombre} width={100} height={100} />
            <p>{producto.tipo}</p>
            <p>{producto.nombre}</p>
            <div className={style}>
              <button
                className={style.eliminar}
                onClick={() => opcionEliminar(producto.id)}
              >
                Eliminar
              </button>
              <button
                className={style.recuperar}
                onClick={() => opcionRecuperar(producto.id)}
              >
                Recuperar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
