"use client"
import styles from '@/Styles/Orden.module.css'
import Navbardos from "@/components/NavSecundario"
export default function RootLayout({ children }) {
  

  return (
    <div className={styles.container}>
      <div className={styles.blanco}>
        <Navbardos/></div>
      <div className={styles.naranja}>{children}</div>
    </div>
  )
}