"use client"
import { useEffect, useState } from 'react';
import styles from '@/Styles/Seleccionar.module.css';
import Image from 'next/image';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [aguacate, setAguacate] = useState(0);
  const [queso, setQueso] = useState(0);
  const [ambos, setAmbos] = useState(0);

  useEffect(() => {
    fetch('http://ec2-54-205-202-188.compute-1.amazonaws.com/productos/')
      .then(response => response.json())
      .then(data => setProductos(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const tacos = productos.filter(producto => producto.tipo === 'Bebida');

const openModal = (product) => {
  setSelectedProduct(product);
};

const closeModal = () => {
  setSelectedProduct(null);
  setCantidad(1);
  setAguacate(0);
  setQueso(0);
  setAmbos(0);
};

const handleCantidadChange = (event) => {
  const newCantidad = parseInt(event.target.value, 10) || 0;
  setCantidad(newCantidad);
};

const handleAccept = () => {
  if (cantidad > 0) {
    const detallePrincipal = {
      id_producto: selectedProduct.id,
      cantidad: cantidad,
      precio: selectedProduct.precio,
      extra: []
    };

    if (aguacate > 0) {
      detallePrincipal.extra.push({
        id_producto: 10,
        cantidad: aguacate,
        precio: 5
      });
    }

    if (queso > 0) {
      detallePrincipal.extra.push({
        id_producto: 11,
        cantidad: queso,
        precio: 5
      });
    }

    if (ambos > 0) {
      detallePrincipal.extra.push({
        id_producto: 12,
        cantidad: ambos,
        precio: 8
      });
    }

    const detallesExistente = JSON.parse(localStorage.getItem('detalle')) || [];
    const nuevosDetalles = [...detallesExistente, detallePrincipal];
    localStorage.setItem('detalle', JSON.stringify(nuevosDetalles));
    console.log('Detalle Principal:', detallePrincipal);

    const compararExistente = JSON.parse(localStorage.getItem('comparar')) || {};
    if (!compararExistente[selectedProduct.id]) {
      const nuevosComparar = {
        ...compararExistente,
        [selectedProduct.id]: selectedProduct.nombre
      };
      localStorage.setItem('comparar', JSON.stringify(nuevosComparar));
    }

    closeModal();
  } else {
    console.log('La cantidad debe ser mayor a cero');
  }
};

return (
  <div className={styles.papa}>
    <h1>Tacos</h1>
    <div className={styles.container}>
      {tacos.map(taco => (
        <div key={taco.id} className={styles.card} onClick={() => openModal(taco)}>
          <Image src={taco.imagen} alt={taco.nombre} width={100} height={100} />
          <p>{taco.nombre}</p>
        </div>
      ))}
    </div>

    {selectedProduct && (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalContent}>
            <div className={styles.leftContent}>
              <Image src={selectedProduct.imagen} alt={selectedProduct.nombre} width={200} height={200} />
              <div>
                <h2>{selectedProduct.nombre}</h2>
                <p>Precio: $ {selectedProduct.precio}</p>
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.column}>
                <label htmlFor="cantidad">Cantidad</label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={handleCantidadChange}
                />
                {selectedProduct.tipo === 'Tacos' && (
                  <>
                    <label htmlFor="aguacate">Aguacate</label>
                    <input
                      type="number"
                      placeholder="Aguacate"
                      max={cantidad}
                      value={aguacate}
                      onChange={(e) => setAguacate(Math.min(parseInt(e.target.value, 10) || 0, cantidad))}
                    />
                    <label htmlFor="queso">Queso</label>
                    <input
                      type="number"
                      placeholder="Queso"
                      max={cantidad}
                      value={queso}
                      onChange={(e) => setQueso(Math.min(parseInt(e.target.value, 10) || 0, cantidad))}
                    />
                    <label htmlFor="ambos">Ambos</label>
                    <input
                      type="number"
                      placeholder="Ambos"
                      max={cantidad}
                      value={ambos}
                      onChange={(e) => setAmbos(Math.min(parseInt(e.target.value, 10) || 0, cantidad))}
                    />
                  </>
                )}
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={handleAccept}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}