"use client"
import "@/Styles/Reporte.css"
import Navbar from "@/components/navbar"
export default function RootLayout({ children }) {

  return (
    <div className="container">
        <div className="blanco">
        <Navbar/>
        </div>
      <div className="naranja">{children}</div>
    </div>
  )
}