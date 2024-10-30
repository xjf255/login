import React, { useState } from 'react';
import day from './day';

export function Form({ isRegister, changeState } = { isRegister: false, changeState: () => {} }) {

  const INITIAL_FORM = {
    correo: '',
    nombre: '',
    contra: ''
  }

  const [formData, setFormData] = useState(INITIAL_FORM);

  const createUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "activo": true,
          "actualizacion": day(),
          "contrasena": formData.contra,
          "correo": formData.correo,
          "creacion": day(),
          "id": "",
          "nombre": formData.nombre,
          "rol": {
            "idRol": 2,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos enviados exitosamente:', data);
        return data
      } else {
        console.error('Error en el envío:', response.status);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/login?contrasena=${formData.contra}&correo=${formData.correo}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Datos recibidos exitosamente:', data);
        return data
      } else {
        console.error('Error en la peticion:', response.status);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = isRegister === false ? await getUser() : await createUser()
    changeState(state)
    return setFormData(INITIAL_FORM)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo:
        <input
          type="text"
          name="correo"
          placeholder="ej. prueba04@miumg.edu.gt"
          value={formData.correo}
          onChange={handleChange}
        />
      </label>
      {isRegister && (
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            placeholder="Ingrese su nombre de usuario..."
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
      )}
      <label>
        Contraseña:
        <input
          type="password"
          name="contra"
          placeholder="Ingrese su contraseña..."
          value={formData.contra}
          onChange={handleChange}
        />
      </label>

      <button type="submit">{isRegister ? 'Registrar' : 'Iniciar Sesión'}</button>
    </form>
  );
}
