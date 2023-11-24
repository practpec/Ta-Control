import style from '@/Styles/NavDos.module.css'
import Link from 'next/link';
import Image from 'next/image';
import Taco from '@/img/taco.png'
import Quesadilla from '@/img/quesadilla.png'
import Refresco from '@/img/refresco.png'
export default function NavbarSec(){
    return(
        <>
        <Link href='/sesion/pedidos/orden/'className={style.carddos}>
           
                Orden</Link>
            <Link href='/sesion/pedidos/orden/tacos/'className={style.card}> 
            <Image src={Taco} width={100} height={100}></Image>
                Tacos</Link>
            <Link href='/sesion/pedidos/orden/quesadillas/'className={style.card}>
            <Image src={Quesadilla} width={100} height={100}></Image>
                Quesadillas</Link>
            <Link href='/sesion/pedidos/orden/refrescos/'className={style.card}>
            <Image src={Refresco} width={100} height={100}></Image>
                Refrescos</Link>
        </>
    );
}