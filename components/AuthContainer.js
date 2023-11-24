"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) { 
      axios
        .get('https://server-nota.vercel.app/api/usuarios/verificacion', {
          headers: {
            Authorization: token, 
          },
        })
        .then((response) => {
          setAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error al verificar la autenticación', error);
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, []);

  if (authenticated) {
    return <>{children}</>;
  } else {
    return <p>Cargando...</p>;
  }
}

export default ProtectedRoute;
