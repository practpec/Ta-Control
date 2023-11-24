"use client"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import styles from "@/styles/Pedido.module.css";

function Pedido() {
  const [idMesas, setIdMesas] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [productosNombres, setProductosNombres] = useState({});
  const [extrasNombres, setExtrasNombres] = useState({});

  useEffect(() => {
    const storedIdMesas = localStorage.getItem('idMesas');
    const storedDetalles = JSON.parse(localStorage.getItem('detalle')) || [];
    const storedProductosNombres = JSON.parse(localStorage.getItem('comparar')) || {};
    const storedIdPedido = localStorage.getItem('idPedido');

    const storedExtrasNombres = {
      10: "Queso",
      11: "Aguacate",
      12: "Ambos"
    };

    if (storedIdMesas) {
      setIdMesas(storedIdMesas);
    }

    if (storedDetalles) {
      setDetalles(storedDetalles);
    }

    if (storedProductosNombres) {
      setProductosNombres(storedProductosNombres);
    }

    setExtrasNombres(storedExtrasNombres);
  }, []);

  const enviarPedido = async () => {
    try {
      const detallesPedido = JSON.parse(localStorage.getItem('detalle')) || [];
      const idMesas = localStorage.getItem('idMesas');

      if (!idMesas || detallesPedido.length === 0) {
        console.error('No hay datos suficientes para enviar el pedido.');
        return;
      }

      const pedidoData = {
        idMesas: idMesas,
        detalle: detallesPedido,
      };
      const response = await fetch('http://localhost:3006/pedidos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        localStorage.removeItem('detalle');
        console.log('Pedido enviado correctamente.');
      } else {
        console.error('Error al enviar el pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };
  const handlePagarClick = () => {
    fetch(`http://localhost:3006/pedidos/${idPedido}`)
      .then(response => {
        console.log('Respuesta de la API:', response);
      })
      .catch(error => {
        console.error('Error al llamar a la API:', error);
      });
  };


  const renderDetalles = () => {
    return detalles.map((detalle, index) => (
      <div key={index} className={styles.detalle}>
        <p>Producto: {productosNombres[detalle.idProducto]} Cantidad: {detalle.cantidad} Precio:$ {detalle.precio}</p>
        {detalle.extra && detalle.extra.length > 0 && (
          <div className={styles.extraContainer}>
            {detalle.extra.map((extra, i) => (
              <p key={i}>{extrasNombres[extra.idProducto]} Cantidad: {extra.cantidad} Precio:$ {extra.precio} </p>
            ))}
          </div>
        )}
        <p>Subtotal: ${(detalle.cantidad * detalle.precio).toFixed(2)}</p>
      </div>
    ));
  };

  const calcularTotal = () => {
    return detalles.reduce((total, detalle) => {
      const subtotalPrincipal = detalle.cantidad * detalle.precio;
      const subtotalExtra = detalle.extra
        ? detalle.extra.reduce((subtotal, extra) => {
            return subtotal + extra.cantidad * extra.precio;
          }, 0)
        : 0;
      return total + subtotalPrincipal + subtotalExtra;
    }, 0);
  };

  return (
    <section className={styles.container}>
      <div className={styles.pB}>
        <div className={styles.pedido}>
          <div className={styles.arriba}>
            <p>{idMesas}</p>
          </div>
          
          <div id="pedido-container" className={styles.pedidoContainer}>
            {renderDetalles()}
          </div>

          <div className={styles.abajo}>
            <h1>Total: ${calcularTotal().toFixed(2)}</h1>
            <button
              id="btnAgregar"
              className={styles.btnAgregar}
              onClick={() => {
                enviarPedido(); 
              }}
            >
              Agregar
            </button>
          </div> 
        </div>

        <button id="btnCancelar" className={styles.btnCancelar}>
          <Link href="/pedidosTotales">Cancelar</Link>
        </button>
        <button id="btnPagar" className={styles.btnPagar} onClick={handlePagarClick}>
          <Link href="/sesion/pedidos/">Pagar</Link>
        </button>
      </div>
    </section>
  );
}

export default Pedido;
