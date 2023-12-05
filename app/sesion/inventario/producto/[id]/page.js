"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/Styles/Producto.module.css';

export default function Home() {
  const id = useParams().id;
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const getProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/productos/${id}`);
        console.log(res.data);

        setProducto({
          nombre: res.data.data[0].nombre,
          imagen: res.data.data[0].imagen,
          stock: res.data.data[0].stock,
          precio: res.data.data[0].precio,
        });
      } catch (error) {
        console.error('Error al obtener producto:', error);
      }
    };

    console.log('Efecto ejecutado');
    console.log('ID actual:', id);
    if (id) {
      getProducto();
    }
  }, [id]);

  async function deleteProducto(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:4000/productos/eliminar/${id}`);
      if (res.status === 200) {
        alert('Producto eliminado, disponible en papelera');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    }
  }

  return (
    <section className={styles.section}>
      {producto && (
        <div className={styles.producto}>
          <div className={styles.imageContainer}>
            <label htmlFor="imagen" className={styles.label}>
              Imagen:
            </label>
            <Image
              src={producto.imagen}
              alt="Imagen seleccionada"
              className={styles.selectedImage}
              width={100}
              height={100}
            />
          </div>
          <form id="caractProducto" className={styles.caractProducto}>
            <div className={styles.inputContainer}>
              <label htmlFor="nombre" className={styles.label}>
                Nombre:
              </label>
              <label htmlFor="nombre" className={styles.label}>
                {producto.nombre}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="cantidad" className={styles.label}>
                Stock
              </label>
              <label htmlFor="cantidad" className={styles.label}>
                {producto.stock}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="precio" className={styles.label}>
                Precio:
              </label>
              <label className={styles.label}>${producto.precio}</label>
            </div>
          </form>
        </div>
      )}
      <Link href={'/sesion/inventario'}>
        <button className={styles.button} onClick={deleteProducto}>
          Eliminar
        </button>
      </Link>
      <Link href={`/sesion/inventario/producto/modificarProducto/${id}`}>
        <button className={styles.button}>Modificar</button>
      </Link>
    </section>
  );
}
