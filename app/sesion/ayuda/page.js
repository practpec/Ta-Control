"use client"
import salva from '@/img/salvavidas.png'
import Image from 'next/image';
import style from '@/styles/Ayuda.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [showPdf, setShowPdf] = useState(false);
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);

  const handlePdfClick = () => {
    setShowPdf(!showPdf);
    setShowVideo1(false);
    setShowVideo2(false);
  };

  const handleVideo1Click = () => {
    setShowVideo1(!showVideo1);
    setShowPdf(false);
    setShowVideo2(false);
  };

  const handleVideo2Click = () => {
    setShowVideo2(!showVideo2);
    setShowPdf(false);
    setShowVideo1(false);
  };

  return (
    <div className={style.container}>
      <h1 className={style.arriba}>¿Cómo te podemos ayudar?</h1>
      <Image src={salva} alt="Ayuda" className={style.imagen} />
      <div className={style.contman}>
      <div className={style.manual}>
        <h2>Guías</h2>
        <div className={style.card}>
            <div onClick={handlePdfClick}>
              Manual de Usuario
            </div>
        </div>
      </div></div>

      <div className={style.manual} onClick={handleVideo1Click}>
        <h2>Videos</h2>
        <Link href='https://youtu.be/QLIxriiBAos?si=D6fCbQfS29R-Tai2'>
          <div className={style.card}>
            <img
              src={`https://img.youtube.com/vi/QLIxriiBAos/maxresdefault.jpg`}
              alt="Miniatura del video"
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </div>
        </Link>
      </div>

      <div className={style.manual} onClick={handleVideo2Click}>
        <Link href='https://youtu.be/SVQ4_KZ0-bE?si=L1ZmRPlUEZxuxC2c'>
          <div className={style.card}>
            <img
              src={`https://img.youtube.com/vi/SVQ4_KZ0-bE/maxresdefault.jpg`}
              alt="Miniatura del video"
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
