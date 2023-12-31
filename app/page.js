"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logol from "../img/logol.png";
import { useRouter } from 'next/navigation'; 
import style from "@/styles/Login.module.css"

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors([]);

    if (!email || !password) {
      setErrors((prevErrors) => [...prevErrors, "Todos los campos son obligatorios"]);
    }

    if (!isEmailValid(email)) {
      setErrors((prevErrors) => [...prevErrors, "El correo electrónico no es válido"]);
    }

    if (errors.length > 0) {
      return;
    }

    try {
      const response = await axios.post("http://ec2-54-205-202-188.compute-1.amazonaws.com/auth/login", {
        email,
        password,
      });

      if (response.data.message === "Acceso concedido" && response.data.token) {

        localStorage.setItem("token", response.data.token);

        const decodedToken = parseJwt(response.data.token);
        const idUsuario = decodedToken.usuario.id;
        localStorage.setItem("idUsuario", idUsuario);

        console.log("Inicio de sesión exitoso");
        router.push("/sesion/pedidos/")
      } else {
        console.log("Mensaje desconocido de la API");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
    return JSON.parse(jsonPayload);
  };

  return (
    <div className={style.container}>
      <div className={style.naranja}>
        <Image className={style.imagenlogo} src={logol} width={350} height={350}></Image>
      </div>

      <div className={style.blanco}>
        <form onSubmit={handleLogin}
        className={style.form}>
          <h1 className={style.arriba}>Iniciar Sesión</h1>
          <input
            type="text"
            className={style.input}
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={style.button} type="submit">Entrar</button>

          {errors.length > 0 && (
            <div className="error-container">
              {errors.map((error, index) => (
                <p key={index} className="error-message">
                  {error}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
