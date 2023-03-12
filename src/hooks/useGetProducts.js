import React from "react"
import { REQUEST } from "../api"
import { useNavigate, useParams } from 'react-router-dom'

export const useGetProducts = () => {
  const [ products, setProducts ] = React.useState(null)
  const { id } = useParams()

  React.useEffect(() => {
    REQUEST.getProducts()
      .then(res => {
        setProducts(res.data);
      })
  }, [])

  const tableId = id
  
  const Navigate = useNavigate()

  const toTablePage = React.useCallback((id) => Navigate(`/t/${id}`), [])

  return {
    products,
    tableId,
    toTablePage
  }
}