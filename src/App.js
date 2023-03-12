import React from 'react'
import Routes from './routes'
import './App.scss'
import { useNavigate } from 'react-router-dom'

const App = () => {
  setInterval(() => {
    window.location.reload()
  }, 50000);

  localStorage.clear()

  return (
    <div>
      <Routes />
    </div>
  )
}

export default App