import style from '@/Styles/NavDos.module.css'
import Link from 'next/link';
export default function NavbarSec(){
    return(
        <>
        <Link href='/sesion/pedidos/orden/'className={style.carddos}>
                Orden</Link>
            <Link href='/sesion/pedidos/orden/tacos/'className={style.card}>
                Tacos</Link>
            <Link href='/sesion/pedidos/orden/quesadillas/'className={style.card}>
                Quesadillas</Link>
            <Link href='/sesion/pedidos/orden/refrescos/'className={style.card}>
                Refrescos</Link>
        </>
    );
}