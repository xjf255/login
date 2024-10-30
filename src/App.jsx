import { useState } from 'react'
import './App.css'
import { Form } from './Form'
import { Home } from './Home'

function App() {
  const [state, setState] = useState(null)
  const [account, setAccount] = useState([])
  const [isRegister, setIsRegister] = useState(false)

  const handleClick = (value) => {
    setIsRegister(value)
    setState(false)
  }

  const addAccount = (user) => {
    setAccount(user)
    setState(true)
  }
  return (
    <>
      {state ?? <h1>Bienvenido</h1>}
      {state !== true && <button onClick={() => handleClick(false)}>Iniciar Sesion</button>}
      {state !== true && <button onClick={() => handleClick(true)}>Registrarse</button>}
      {state === false && <Form isRegister={isRegister} changeState={addAccount}/>}
      {state === true && <Home user={account}/>}
    </>
  )
}

export default App
