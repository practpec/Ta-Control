"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/Styles/Pedidos.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    localStorage.removeItem('idPedido');
    localStorage.removeItem('idMesas');

    fetch('http://localhost:3006/pedidos/')
      .then((response) => response.json())
      .then((data) => setPedidos(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOption('');
    setInputValue('');
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    const pedidoType = selectedOption === 'Mesa' ? 'Mesa' : 'Para Llevar';
    const pedidoNumber = inputValue;

    const idMesa = `${pedidoType} ${pedidoNumber}`;

    localStorage.setItem('idMesas', idMesa);
    router.push('/sesion/pedidos/orden/');
    closeModal();
  };

  const handleCardClick = (idPedido, idMesa) => {
    localStorage.setItem('idPedido', idPedido);
    localStorage.setItem('idMesas', idMesa);
    router.push('/sesion/pedidos/orden/');
  };

  return (
    <div className={styles.papa}>
      <div>
        <h1>Mesas</h1>
        <div className={styles.container}>
          {pedidos
            .filter((pedido) => pedido.idMesas.startsWith('Mesa'))
            .map((pedido) => (
              <div
                key={pedido.idPedido}
                className={styles.card}
                onClick={() => handleCardClick(pedido.idPedido, pedido.idMesas)}
              >
                {pedido.idMesas}
              </div>
            ))}
        </div>
      </div>
      <div>
        <h1>Para Llevar</h1>
        <div className={styles.container}>
          {pedidos
            .filter((pedido) => pedido.idMesas.startsWith('Para Llevar'))
            .map((pedido) => (
              <div
                key={pedido.idPedido}
                className={styles.card}
                onClick={() => handleCardClick(pedido.idPedido, pedido.idMesas)}
              >
                {pedido.idMesas}
              </div>
            ))}
        </div>
      </div>
      <button className={styles.boton} onClick={openModal}>
        Agregar
      </button>

      {modalVisible && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Tipo de Pedido:</h2>
            <div>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="Mesa"
                  checked={selectedOption === 'Mesa'}
                  onChange={() => handleOptionChange('Mesa')}
                />
                Mesa
              </label>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="Para Llevar"
                  checked={selectedOption === 'Para Llevar'}
                  onChange={() => handleOptionChange('Para Llevar')}
                />
                Para Llevar
              </label>
            </div>
            <input
              type="number"
              placeholder="Numero de Atención"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleConfirm}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
