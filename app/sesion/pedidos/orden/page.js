"use client"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import styles from "@/styles/Pedido.module.css";

function Pedido() {
  const [idPedido, setIdPedido] = useState('');
  const [idMesas, setIdMesas] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [productosNombres, setProductosNombres] = useState({});
  const [extrasNombres, setExtrasNombres] = useState({});
  const [detallesprincipales, setDetallesprincipales] = useState([]);


  useEffect(() => {
    const storedIdMesas = localStorage.getItem('idMesas');
    const storedDetalles = JSON.parse(localStorage.getItem('detalle')) || [];
    const storedProductosNombres = JSON.parse(localStorage.getItem('comparar')) || {};
    const storedIdPedido = localStorage.getItem('idPedido');
    setIdPedido(storedIdPedido);
    const storedExtrasNombres = {
      9: "Queso",
      10: "Aguacate",
      11: "Ambos"
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
    if (storedIdPedido) {
      obtenerDetallesPedido(storedIdPedido);
    }
  }, []);
  
  const enviarPedido = async () => {
    try {
      const detallesPedido = JSON.parse(localStorage.getItem('detalle')) || [];
      const idMesas = localStorage.getItem('idMesas');
      const storedIdPedido = localStorage.getItem('idPedido');
  
      if (!idMesas || detallesPedido.length === 0) {
        console.error('No hay datos suficientes para enviar el pedido.');
        return;
      }
  
      const pedidoData = {
        id_pedido: storedIdPedido,  
        detalle: detallesPedido,
      };
  

      if (storedIdPedido) {
        const response = await fetch('http://ec2-54-205-202-188.compute-1.amazonaws.com/detalles/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidoData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('Detalles agregados correctamente al pedido existente:', responseData);
        } else {
          console.error('Error al agregar detalles al pedido existente:', response.statusText);
        }
      } else {
        const nuevoPedidoResponse = await fetch('http://ec2-54-205-202-188.compute-1.amazonaws.com/pedidos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo: idMesas,
            detalle: detallesPedido,
          }),
        });
  
        if (nuevoPedidoResponse.ok) {
          const nuevoPedidoData = await nuevoPedidoResponse.json();
          const nuevoIdPedido = nuevoPedidoData.idPedido;
  
          console.log('Pedido enviado correctamente. Nuevo idPedido:', nuevoIdPedido);
        } else {
          console.error('Error al enviar el nuevo pedido:', nuevoPedidoResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };
  
  
  const handlePagarClick = () => {
    const id=idPedido;
    try {
      fetch(`http://ec2-54-205-202-188.compute-1.amazonaws.com/pedidos/${id}`, {
        method: 'PATCH',
      })
        .then(response => {
          if (response.ok) {
            console.log('Pago realizado correctamente.');
          } else {
            console.error('Error al realizar el pago:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error al llamar a la API:', error);
        });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };
  
  const obtenerDetallesPedido = async (idPedido) => {
    try {
      const detallesResponse = await fetch(`http://ec2-54-205-202-188.compute-1.amazonaws.com/detalles/${idPedido}`);
      if (detallesResponse.ok) {
        const detallesData = await detallesResponse.json();
        console.log('Detalles obtenidos correctamente:', detallesData);

        if (detallesData.detalle) {
          setDetallesprincipales(detallesData.detalle);
        }
      } else {
        console.error('Error al obtener detalles:', detallesResponse.statusText);
      }
    } catch (error) {
      console.error('Error al obtener detalles:', error);
    } 
  };
  const renderDetallesprincipales = () => {
    const detallesArray = detallesprincipales.detalle || [];
  
    return detallesArray.map((detalle, index) => (
      <div key={index} className={styles.detalle}>
        <p>Producto: {detalle.nombre_producto} Cantidad: {detalle.cantidad} Precio:$ {detalle.precio}</p>
        {detalle.extra && detalle.extra.length > 0 && (
          <div className={styles.extraContainer}>
            {detalle.extra.map((extra, i) => (
              <p key={i}>
                {extra.nombre_extra} Cantidad: {extra.cantidad} Precio:$ {extra.precio}
              </p>
            ))}
          </div>
        )}
        <p>Subtotal: ${(detalle.cantidad * detalle.precio).toFixed(2)}</p>
      </div>
    ));
  };
  const calcularTotalDetallesPrincipales = () => {
    const detallesArray = detallesprincipales?.detalle || [];
  
    if (!Array.isArray(detallesArray)) {
      console.error('El array de detalles principales es nulo o no es un array:', detallesArray);
      return 0; 
    }
  
    return detallesArray.reduce((total, detalle) => {
      const subtotalPrincipal = detalle.cantidad * detalle.precio;
      const subtotalExtra = detalle.extra
        ? detalle.extra.reduce((subtotal, extra) => {
            return subtotal + extra.cantidad * extra.precio;
          }, 0)
        : 0;
      return total + subtotalPrincipal + subtotalExtra;
    }, 0);
  };
  
  
  const renderDetalles = () => {
    return detalles.map((detalle, index) => (
      <div key={index} className={styles.detalle}>
        <p className={styles.agregar}>Producto: {productosNombres[detalle.id_producto]} Cantidad: {detalle.cantidad} Precio:$ {detalle.precio}</p>
        {detalle.extra && detalle.extra.length > 0 && (
          <div className={styles.extraContainer}>
            {detalle.extra.map((extra, i) => (
              <p className={styles.agregar} key={i}>{extrasNombres[extra.id_producto]} Cantidad: {extra.cantidad} Precio:$ {extra.precio} </p>
            ))}
          </div>
        )}
        <p className={styles.agregar}>Subtotal: ${(detalle.cantidad * detalle.precio).toFixed(2)}</p>
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
            <h1>{idMesas}</h1>
          </div>
          
          <div id="pedido-container" className={styles.pedidoContainer}>
            {renderDetallesprincipales()}
            {renderDetalles()}
          </div>

          <div className={styles.abajo}>
          <p>Total Actual: ${calcularTotalDetallesPrincipales().toFixed(2)}</p>
            <p>Agregar: ${calcularTotal().toFixed(2)}</p>
            <h1>Total: ${parseFloat(calcularTotalDetallesPrincipales() + calcularTotal()).toFixed(2)}</h1>
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
          <Link href="/sesion/pedidos/">Cancelar</Link>
        </button>
        <button id="btnPagar" className={styles.btnPagar} onClick={handlePagarClick}>
          <Link href="/sesion/pedidos/">Pagar</Link>
        </button>
      </div>
    </section>
  );
}

export default Pedido;