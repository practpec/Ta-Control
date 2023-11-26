"use client"
// require("dotnev");
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/Styles/modificarProducto.module.css';
import Link from 'next/link';
import Image from 'next/image';
import axios from "axios";

export default function Home() {
  const id = useParams().id;
  const [producto, setProducto] = useState({
    precio:"",
    stock:""
  });

  useEffect(() => {
    const getProducto = async () => {
      console.log(id);
      const res = await axios.get("http://localhost:3006/productos" + id,);
      console.log(res.data.data); 

      setProducto({
        nombre: res.data.data.nombre,
        imagen: res.data.imagen
      })   
    };
     
    getProducto
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setProducto({
        ...producto,
        [e.target.name]: e.target.value,
    });
};

  const handleSubmit = async (e)=> {
    const response = await axios.patch("http://localhost:3006/productos" + id, producto);
    if(response.status === 200){
      alert("Se actualizó el producto correctamente");
    } else {
      alert("No se actualizó el producto correctamente")
    }
  }

  return (
    <section className={styles.section}>
      {/* Agregar la informacion real de la BD y revisar codigo */}
      <div className={styles.producto}>
        <div className={styles.imageContainer}>
          <label htmlFor="imagen" className={styles.label}>
            Imagen:
          </label>
            <Image src={producto.imagen}
              alt="Imagen seleccionada"
              className={styles.selectedImage}
              width = {100} 
              height={100}/>
        </div>
        <form onSubmit={handleSubmit} id="caractProducto" className={styles.caractProducto}>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre:
            </label>
            <label htmlFor="nombre" className={styles.label}>
              {producto.nombre}
            </label>
          </div>
          {/*logica para que no aplique la cantidad para todos*/}
          <div className={styles.inputContainer}>
            <label htmlFor="cantidad" className={styles.label}>
              Cantidad:
            </label>
            <input name="stock" type="text" placeholder="Cantidad" onChange={handleChange}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
            </label>
            <input name="precio" type="text" placeholder="Precio" onChange={handleChange}/>
          </div>
        </form>
      </div>
      <Link href={`/sesion/inventario/producto/ ${producto.idProducto}`}>
        <button className={styles.button}>Cancelar</button>
      </Link>
      <Link href="/sesion/inventario">
        <button className={styles.button}>Confirmar</button>
      </Link>
    </section>
  );
}