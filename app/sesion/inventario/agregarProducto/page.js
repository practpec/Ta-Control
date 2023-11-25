"use client"

import React, { useState } from 'react';
import styles from '@/Styles/agregarProducto.module.css';
import Link from 'next/link';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const[imagen, setImagen] = useState(null);
  const[tipo, setTipo] =useState({
    id:"",
    nombre:"",
    stock:"",
    precio:""
  });
  const handleSumbit = async(e) =>{
    e.preventDefault();
    if(!imagen.id || !tipo.nombre || !tipo.stock || !tipo.precio || !imagen){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Faltan campos por llenar"
    });  
  } else{
    await axios.post("http://localhost:80/v1/videos", formData, {withCredentials: true})
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Se agrego correctamente",
        showConfirmButton: false,
        timer: 1500
      });
}

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  return (
    <section className={styles.section}>
      {/* Agregar un mapeado que permita visualizar la imagenes desde la base de datos */}
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
        <form onChange={handleSumbit} 
        id="caractProducto" className={styles.caractProducto}>
        <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Identificador:
            </label>
            <input type="text" placeholder="Nombre" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre:
            </label>
            <input type="text" placeholder="Nombre" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="cantidad" className={styles.label}>
              Stock:
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
}