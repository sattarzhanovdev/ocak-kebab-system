import React from 'react'
import { REQUEST } from '../../api'
import { Components } from '../../components'
import { HOOKS } from '../../hooks'

const Main = () => {
  const { products, tableId } = HOOKS.useGetProducts()

  const basketId = localStorage.getItem('basketId')

  React.useEffect(() => {
    // localStorage.setItem('tableId', tableId)
    // if(!basketId){
    //   REQUEST.postBaskets({qrcode_id: tableId})
    //     .then(res => localStorage.setItem('basketId', res.data.id))
    // }
  localStorage.clear()
    
  }, [tableId])

  return (
    <div>
      <Components.Sidebar />
      <Components.FoodsContainer 
        products={products}
      />
    </div>
  )
}

export default Main