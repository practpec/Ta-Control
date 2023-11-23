"use client"
import React, { useState } from 'react';
import styles from '@/Styles/Pedidos.module.css';
import Link from 'next/link';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // 'Mesas' o 'Pedido'
  const [inputValue, setInputValue] = useState('');

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
    // Realizar acciones según la opción seleccionada y el valor del input
    console.log(`Opción seleccionada: ${selectedOption}`);
    console.log(`Valor del input: ${inputValue}`);
    // Aquí puedes realizar acciones adicionales, como enviar datos a la base de datos, etc.
    closeModal();
  };

  return (
    <div className={styles.papa}>
      <h1>Mesas</h1>
      <div className={styles.container}>
        <Link href='/sesion/pedidos/orden/'>
          <div className={styles.card}>hola</div>
        </Link>
        <div className={styles.card}>hola</div>
        <div className={styles.card}>hola</div>
        <div className={styles.card}>hola</div>
      </div>
      <h1>Para Llevar</h1>
      <div className={styles.container}>
        <div className={styles.card}>hola</div>
        <div className={styles.card}>hola</div>
        <div className={styles.card}>hola</div>
        <div className={styles.card}>hola</div>
      </div>
      <button className={styles.boton} onClick={openModal}>
        Agregar
      </button>

      {modalVisible && (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {/* Contenido del modal */}
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
              Para Levar
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
        </div></div>
      )}
    </div>
  );
}
