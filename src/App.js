import React from 'react'
import Routes from './routes'
import './App.scss'

const App = () => {

  setInterval(() => {
    window.location.reload()
  }, 50000);

  return (
    <div>
      <Routes />
    </div>
  )
}

export default App