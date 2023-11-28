"use client";
import { useEffect, useState } from "react";
import styles from "@/Styles/Inventario.module.css";
import Image from "next/image";
import Link from "next/link";
import Borrar from "@/img/cerrar.png";
import Taco from "@/img/taco.png";
import axios from "axios";

export default function Home() {
  const bebidas = [];
  const tacos = [];
  const quesadillas = [];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Bebidas");

  // const [tacos, setTacos] = useState([]);
  // const [quesadillas, setQuesadillas] = useState([]);

  const [productos, setProductos] = useState([]);

  // useEffect(() => {
  //     const fetchData =async()=>{
  //         try{
  //             const response = await axios.get('http://localhost:3006/productos');
  //             console.log(response.data.data)
  //             let productos = response.data.data

  //             productos.map((producto) => {
  //                 if(producto.tipo === "Bebida"){
  //                     bebidas.push(producto);
  //                 } else if(producto.tipo === "Taco"){
  //                     tacos.push(producto);
  //                 } else if(producto.tipo === "Quesadilla"){
  //                     quesadillas.push(producto);
  //                 }
  //             });
  //         }catch(error){
  //             console.error('Error al obtener productos:', error);
  //         }
  //     };
  //     fetchData();
  // },[bebidas, quesadillas, tacos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3006/productos");

        setProductos(response.data.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.papa}>
      <h1>Selecciona una categoría: 
        <Link href={"/sesion/inventario/agregarProducto"}>
        <button className={styles.boton}>+</button>
      </Link></h1>
      <select
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        <option value="Bebidas">Refrescos</option>
        <option value="Tacos">Tacos</option>
        <option value="Quesadillas">Quesadillas</option>
      </select>

      <div className={styles.container}>
        {productos.map((producto) => {
    const isBebida = producto.tipo === "Bebida" && categoriaSeleccionada === "Bebidas";
    const isTaco = producto.tipo === "Taco" && categoriaSeleccionada === "Tacos";
    const isQuesadilla = producto.tipo === "Quesadilla" && categoriaSeleccionada === "Quesadillas";

    if (isBebida || isTaco || isQuesadilla) {
      return (
        <Link
          key={producto.idProducto}
          href={`/sesion/inventario/producto/${producto.idProducto}`}
        >
          <div className={styles.card}>
            <Image
              src={producto.imagen}
              alt="imagen"
              width={100}
              height={100}
            />
            {producto.nombre}
          </div>
        </Link>
      );
    }
    return null;
  })}
</div>



     
    </div>
  );
}