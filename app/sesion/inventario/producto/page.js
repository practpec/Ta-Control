"use client"
import React, { useState } from 'react';
import styles from '@/Styles/Producto.module.css';
import Link from 'next/link';
import Taco from '@/img/taco.png'
import Image from 'next/image';
export default function Home() {
  return (
    <section className={styles.section}>
      {/* Agregar la informacion real de la BD y revisar codigo */}
      <div className={styles.producto}>
        <div className={styles.imageContainer}>
          <label htmlFor="imagen" className={styles.label}>
            Imagen:
          </label>
            <Image
            src={Taco}
              alt="Imagen seleccionada"
              className={styles.selectedImage}/>
              <Image/>
        </div>
        <form id="caractProducto" className={styles.caractProducto}>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre:
            </label>
            <label htmlFor="nombre" className={styles.label}>
              Pastor
            </label>
            
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="cantidad" className={styles.label}>
              Cantidad:
            </label>
            {/*tu logica para que solo aplique esto para los que sean bebida*/}
            <label htmlFor="cantidad" className={styles.label}>
              3
            </label>
           
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
            </label>
            <label htmlFor="precio" className={styles.label}>
              $12
            </label>
          </div>
        </form>
      </div>
      <button className={styles.button}>
            Eliminar
        </button>
      <Link href="/sesion/inventario/producto/modificarProducto">
        <button className={styles.button}>Modificar</button>
      </Link>
    </section>
  );
}
