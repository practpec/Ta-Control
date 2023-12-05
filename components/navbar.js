"use client"
import "@/Styles/Navbar.css"
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import cerrar from '@/img/cerrar.png';
import papalera from '@/img/trash.png';
import ayuda from '@/img/help.png';
import logo from '@/img/logo.png';
import pedido from '@/img/pedido.png';
import inventario from '@/img/inventario.png';
import reporte from '@/img/reporte.png';
import Link from 'next/link';
import style from '@/styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {

    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará la sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/');
      }
    });
  };

  return (
    <>
      <div className={style.logo}>
        <Image alt='Logo' src={logo} className={style.logo2} />
        Ta-Control
      </div>
      <div className={style.boton}>
        <Link href="/sesion/pedidos">
          <div className="enlace">
            <Image src={pedido} alt="Pedidos" className="comp" width={100} height={100} />
            <p>Pedidos</p>
          </div>
        </Link>
        <Link href="/sesion/inventario">
          <div className="enlace">
            <Image src={inventario} alt="Inventario" className="comp" width={70} height={70} />
            <p>Inventario</p>
          </div>
        </Link>
        <Link href="/sesion/reportes">
          <div className="enlace">
            <Image src={reporte} alt="Reporte de ventas" className="comp" width={70} height={70} />
            <p>Reporte de ventas</p>
          </div>
        </Link>
      </div>
      <button className="cerrar" onClick={handleLogout}>
        <Image alt='Cerrar' src={cerrar} className="imagen" />
      </button>
      <Link href='/sesion/papelera/'>
        <button className="papelera">
          <Image alt='papelera' src={papalera} className="imagen" />
        </button>
      </Link>
      <Link href='/sesion/ayuda/'>
        <button className="ayuda">
          <Image alt='Ayuda' src={ayuda} className="imagen" />
        </button>
      </Link>
    </>
  );
}
