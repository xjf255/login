import { useEffect, useState } from "react"

export function Home({ user }) {
  const { nombre, correo, rol = {}, activo } = user
  const nombreRol = rol?.nombre
  const isAdmin = nombreRol === "Admin"
  const [accounts, setAccount] = useState([])

  useEffect(() => {
    if (isAdmin) {
      const getUser = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/usuarios`);

          if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos exitosamente:', data);
            setAccount(data)
          } else {
            console.error('Error en la peticion:', response.status);
          }
        } catch (error) {
          console.error('Error en la petición:', error);
        }
      }
      getUser()
    }
  }, [])

  if (!activo) return <h2>Usuario Inactivo, por favor informele a su administrador para optar a nuestras funcionalidades</h2>
  return (
    <main>
      <h1>Bienvenido {nombre}</h1>
      {!isAdmin && (
        <>
          <h3>Informacion Personal:</h3>
          <p>correo: {correo}</p>
          <p>rol: {nombreRol ?? "Principiante"}</p>
        </>)}
      {isAdmin && accounts && accounts.map(account => {
        console.log(account)
        const { id, nombre, correo, rol = {} } = account
        const nombreRol = rol?.nombre
        return (
          <div className="accounts" key={id}>
            <p>id: {id}</p>
            <p>nombre: {nombre}</p>
            <p>correo: {correo}</p>
            <p>rol: {nombreRol ?? "principiante"}</p>
          </div>
        )
      })}
    </main>
  )
}