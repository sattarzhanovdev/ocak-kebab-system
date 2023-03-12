import React from 'react'
import Routes from './routes'
import './App.scss'
import { useNavigate } from 'react-router-dom'

const App = () => {

  const tableId = localStorage.getItem('tableId')

  const Navigate = useNavigate()

  React.useEffect(() => {
    Navigate(tableId)
  }, [])

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