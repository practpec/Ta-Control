"use client"

import React, { useState } from 'react';
import styles from '@/Styles/agregarProducto.module.css';
import Link from 'next/link';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <section className={styles.section}>
      {/* Agregar la informacion real de la BD y revisar codigo */}
      <div className={styles.producto}>
        <div className={styles.imageContainer}>
          <label htmlFor="imagen" className={styles.label}>
            Imagen:
          </label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Imagen seleccionada"
              className={styles.selectedImage}
            />
          )}
        </div>
        <form id="caractProducto" className={styles.caractProducto}>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre:
            </label>
            <input type="text" placeholder="Nombre" />
          </div>
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
      <Link href="/sesion/inventario">
        <button className={styles.button}>Confirmar</button>
      </Link>
    </section>
  );
}
