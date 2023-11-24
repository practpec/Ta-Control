"use client"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import MyModal from '@/components/Modal';
import "@/Styles/Modal.css"

export default function MyPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Página con Modal</h1>
      <Button variant="primary" onClick={openModal}>
        Abrir Modal
      </Button>
      <h1>hola hfbebcvgucrueh sbn g</h1>

      <MyModal showModal={showModal} onClose={closeModal} />
    </div>
  );
}
