"use client"

import React, { useState } from 'react';
import styles from '@/Styles/agregarProducto.module.css';
import Link from 'next/link';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Bebidas");
  // const[imagen, setImagen] = useState(null);
  const[producto, setProducto] =useState({
    id: null,
    nombre:"",
    stock: null,
    precio:null
  });

  const handleSumbit = async(e) =>{
    e.preventDefault();
    if(!producto.id || !producto.nombre || !producto.stock || !producto.precio || !selectedImage){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Faltan campos por llenar"
    });  
  } else{
    await axios.post("http://localhost:3006/productos", formData,)
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Se agrego correctamente",
        showConfirmButton: false,
        timer: 1500
      });
}

  };

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
              src={(selectedImage.toString().includes("https://res.cloudinary.com/")) ? 
              selectedImage : URL.createObjectURL(selectedImage)}
              alt="Imagen seleccionada"
              className={styles.selectedImage}
            />
          )}

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
            <div className={styles.papa}>
            <label htmlFor="nombre" className={styles.label}>
              Tipo: 
            </label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                  <option value="Bebidas">Refrescos</option>
                  <option value="Tacos">Tacos</option>
                  <option value="Quesadillas">Quesadillas</option>
              </select>
            </div>
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
      </div>
      <Link href="/sesion/inventario">
        <button className={styles.button}>Confirmar</button>
      </Link>
    </section>
  );
}  
