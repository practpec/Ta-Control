"use client"
import axios from "axios";
import Swal from'sweetalert2';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/agregarProducto.module.css';
import Link from 'next/link';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Bebidas");

  const[producto, setProducto] =useState({
    id: null,
    nombre:"",
    stock: null,
    precio:null,
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
    const formData = new FormData();
    formData.append("idProductos", producto.id);
    formData.append("nombre", producto.nombre);
    formData.append("stock", producto.stock);
    formData.append("precio", producto.precio);
    formData.append("tipo", categoriaSeleccionada);
    formData.append("imagen", selectedImage);

    const response = await axios.post("http://localhost:3006/productos", formData,);

    if(response.status === 201){ //Imagino que en el metodo POST del controller, el status 201 es el que se retorna al tener exito 
      Swal.fire({
          position: "center",
          icon: "success",
          title: "Se agrego correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el producto"
        });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProducto({
        ...producto,
        [e.target.name]: e.target.value,
    });
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  return (
    <section className={styles.section}>
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
            <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Imagen seleccionada"
            width={100}
            height={100}
            className={styles.selectedImage}/>
          )}
          

        <form onSubmit={handleSumbit} 
        id="caractProducto" className={styles.caractProducto}>
        <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Identificador:
            </label>
            <input type="text" name="id" placeholder="Nombre" onChange={handleChange}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Tipo:
            </label>
            <select name="tipo"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                <option value="Bebidas">Refrescos</option>
                <option value="Tacos">Tacos</option>
                <option value="Quesadillas">Quesadillas</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre:
            </label>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="cantidad" className={styles.label}>
              Stock:
            </label>
            <input type="text" name="stock" placeholder="Cantidad" onChange={handleChange}/>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
            </label>
            <input type="text" name="precio" placeholder="Precio" onChange={handleChange}/>
          </div>
          </form>
        </div>
      </div>
      <Link href="/sesion/inventario">
        <button className={styles.button} 
        // onClick={handleSumbit}
        >
          Confirmar</button>
      </Link>
    </section>
  );
}  
