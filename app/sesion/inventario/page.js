import styles from '@/Styles/Inventario.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Borrar from '@/img/cerrar.png'
import Taco from '@/img/taco.png'
export default function home(){
    return(
        <div className={styles.papa}>
            <h1>Refrescos</h1>
        <div className={styles.container}>
            <Link href={'/sesion/inventario/producto'}>
            <div className={styles.card}>
                <Image src={Taco} width={100} height={100}></Image>
                hola
            </div></Link>
            <div className={styles.card}>
                <Image src={Borrar} alt="producto"></Image>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
        </div>
        <h1>Tacos</h1>
        <div className={styles.container}>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
        </div>
        <h1>Quesadillas</h1>
        <div className={styles.container}>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
        </div>
        <h1>Quesadillas</h1>
        <div className={styles.container}>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
        </div>
        <h1>Quesadillas</h1>
        <div className={styles.container}>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
            <div className={styles.card}>
                hola
            </div>
        </div>
        
        <Link href={'/sesion/inventario/agregarProducto'}>
        <button className={styles.boton}>
            Agregar
        </button></Link>
        </div>
    );
}