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
        .get('http://ec2-54-205-202-188.compute-1.amazonaws.com/api/usuarios/verificacion', {
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
