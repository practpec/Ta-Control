"use client"
import "@/Styles/Navbar.css"
import Link from "next/link";
import Image from "next/image";
import cerrar from "@/img/cerrar.png"
import papalera from "@/img/trash.png"
import ayuda from "@/img/help.png"
import logo from "@/img/logo.png"
import pedido from "@/img/pedido.png"
import inventario from "@/img/inventario.png"
import reporte from "@/img/reporte.png";
export default function Navbar() {

    return(
    < >
      <div className="logo">
      <Image src={logo} className="logo2"/>
        Ta-Control
      </div>
      <div className="boton">
      <Link href="/sesion/pedidos">
        <div className="enlace">
          <Image src={pedido} alt="Pedidos" className="comp" width={100} height={100} />
          <p>Pedidos</p></div>
      </Link>
      <Link href="/sesion/inventario">
        <div className="enlace">
          <Image src={inventario} alt="Inventario" className="comp" width={70} height={70} />
          <p>Inventario</p></div>
      </Link>
      <Link href="/sesion/reportes">
        <div className="enlace">
          <Image src={reporte} alt="Reporte de ventas" className="comp" width={70} height={70} />
          <p>Reporte de ventas</p></div>
      </Link>
    </div>
      <button className="cerrar">
      <Image src={cerrar} className="imagen"/>
      </button>
      <button className="papelera">
      <Image src={papalera} className="imagen"/>
      </button>
      <button className="ayuda">
      <Image src={ayuda} className="imagen"/>
      </button>
  </>
    )
}