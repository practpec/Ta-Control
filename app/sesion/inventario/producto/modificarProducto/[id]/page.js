"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/Styles/modificarProducto.module.css';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function ModificarProducto() {
  const id = useParams().id;
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const getProducto = async () => {
      try {
        const res = await axios.get(`http://ec2-54-205-202-188.compute-1.amazonaws.com/productos/${id}`);
        const firstProduct = res.data.data[0] ?? {};

        setProducto({
          nombre: firstProduct.nombre,
          imagen: firstProduct.imagen,
          stock: firstProduct.stock,
          precio: firstProduct.precio,
        });
      } catch (error) {
        console.error('Error al obtener producto:', error.message || error);
      }
    };

    if (id) {
      getProducto();
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`http://ec2-54-205-202-188.compute-1.amazonaws.com/productos/producto/${id}`, producto);
      console.log(response);
      if (response.status === 200) {
        alert('Se actualizó el producto correctamente');
        router.push(`/sesion/inventario/producto/${id}`);
      } else {
        alert('No se actualizó el producto correctamente');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de actualización:', error.message || error);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.producto}>
        <div className={styles.imageContainer}>
          <label htmlFor="imagen" className={styles.label}>
            Imagen:
          </label>
          <Image
  src={producto?.imagen || ''}  
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
            <label htmlFor="stock" className={styles.label}>
              Cantidad:
              <input name="stock" type="text" placeholder="Cantidad" value={producto.stock} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
              <input name="precio" type="text" placeholder="Precio" value={producto.precio} onChange={handleChange} />
            </label>
          </div>
        </form>
      </div>
      <Link href={`/sesion/inventario/producto/${id}`}>
        <button className={styles.button}>Cancelar</button>
      </Link>
      <button className={styles.button} onClick={handleSubmit}>
        Confirmar
      </button>
    </section>
  );
}
