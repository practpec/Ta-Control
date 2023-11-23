"use client"
import Image from "next/image";
import "../Styles/Login.css"
export default function Home() {
  return (
    <div className="container">
     <div className="naranja">hola</div>
     
     <div className="blanco">
     
      <form>
        <h1 className='arriba'>Iniciar Sesión</h1>
        <input placeholder="Usuario"></input>
        <input placeholder="Contraseña"></input>
        <button placeholder="Entrar">Entrar</button>
      </form></div>
    </div>
  );
}
