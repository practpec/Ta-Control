"use client"
import { useEffect, useState } from 'react';
import styles from '@/Styles/Inventario.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API
    fetch('http://localhost:3006/productos/')
      .then(response => response.json())
      .then(data => setProductos(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.papa}>
      <div className={styles.tituloTabla}>
      <h1>Refrescos</h1>
      <Link href={'/sesion/inventario/agregarProducto'}>
        <button className={styles.boton}>
          +
        </button>
      </Link>
      </div>
      <div className={styles.container}>
        {productos.map(producto => (
          <Link key={producto.idProducto} href="/sesion/inventario/producto/">
            <div className={styles.card}>
              <Image src={producto.imagen} alt={producto.nombre} width={100} height={100} />
              <p>{producto.nombre}</p>
            </div>
          </Link>
        ))}
      </div>

      
    </div>
  );
}
