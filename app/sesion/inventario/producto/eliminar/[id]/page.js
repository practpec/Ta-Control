"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/Styles/Inventario.module.css";
import style from '@/Styles/modificarProducto.module.css';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import axios from "axios";

export default function Eliminar(){
    const id = useParams().id;
    const [producto, setProducto] = useState({
        precio:"",
        stock:""
      });
        useEffect(() => {
            const getProducto = async () => {
              console.log(id);
              const res = await axios.get("http://ec2-54-205-202-188.compute-1.amazonaws.com/productos" + id,);
              console.log(res.data.data); 
        
              setProducto({
                nombre: res.data.data.nombre,
                imagen: res.data.imagen
              })   
            };
        
            getProducto();
        }, []);

      const updateProducto = async(e) =>{
        e.preventDefult();
        const res = await axios.update("http://ec2-54-205-202-188.compute-1.amazonaws.com/productos" + id,);
        if (res.status == 200) {
          alert("Producto recuperado");
      } else {
          alert("Error al recuperar el producto");
      }
      };
      const handleSubmit = async (e)=> {
        const response = await axios.patch("http://ec2-54-205-202-188.compute-1.amazonaws.com/productos" + id, producto);
        if(response.status === 200){
          alert("Se actualizó el producto correctamente");
        } else {
          alert("No se actualizó el producto correctamente")
        }
      }
    return(
        <div className={styles.container}>
        <div className={styles.card}>
            <Image
              src={producto.imagen}
              alt="imagen"
              width={100}
              height={100}
            />
            {producto.nombre}
          </div>
          <form id="caractProducto" className={style.caractProducto}>
          <div className={style.inputContainer}>
            <label htmlFor="nombre" className={style.label}>
              Nombre:
            </label>
            <label htmlFor="nombre" className={style.label}>
              {producto.nombre}
            </label>
            
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="cantidad" className={style.label}>
              stock
            </label>
            {/*tu logica para que solo aplique esto para los que sean bebida*/}
            <label htmlFor="cantidad" className={style.label}>
            {producto.stock}
            </label>
           
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio" className={styles.label}>
              Precio:
            </label>
            <label htmlFor="precio" className={styles.label}>
               $ {producto.precio}
            </label>
          </div>
        </form>
          <Link href={`/sesion/inventario`}>
            <button className={style.button}>Recuperar</button>
          </Link>
          </div>
    );
}