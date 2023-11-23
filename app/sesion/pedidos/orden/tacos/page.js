import styles from '@/Styles/Seleccionar.module.css';
import Image from 'next/image';
import Borrar from '@/img/cerrar.png'
export default function home(){
    return(
        <div className={styles.papa}>
            <h1>Refrescos</h1>
        <div className={styles.container}>
            <div className={styles.card}>
                hola
            </div>
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
        </div>
    );
}