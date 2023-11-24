"use client"

import React, { useState } from 'react';
import styles from '@/Styles/modificarProducto.module.css';
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
          {/*logica para que no aplique la cantidad para todos*/}
          <div className={styles.inputContainer}>
            <label htmlFor="cantidad" className={styles.label}>
              Cantidad:
            </label>
            <input type="text" placeholder="Cantidad" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
            </label>
            <input type="text" placeholder="Precio" />
          </div>
        </form>
      </div>
      <Link href="/sesion/inventario/producto/">
        <button className={styles.button}>Cancelar</button>
      </Link>
      <Link href="/sesion/inventario">
        <button className={styles.button}>Confirmar</button>
      </Link>
    </section>
  );
}