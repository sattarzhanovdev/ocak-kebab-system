import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Components } from '..'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/confirm/confirm.module.scss'

const Confirm = ({base, setRefresh, setActiveSide}) => {
  const [ item, setItem ] = React.useState(null)
  const [ active, setActive ] = React.useState(false)
  const basketId = localStorage.getItem('basketId')
  const tableId = localStorage.getItem('tableId')

  const send_order = () => {
    const data = {qrcode_id: tableId, basket: basketId}
    REQUEST.postOrders(data)
      .then(() => {
        setItem({title: 'Ваш заказ отправлен!', icon: 'success'})
        localStorage.clear()
        setActive(true)
      })
  }
  
  return (
    <div className={cls.confirm_container}>
      <div className={cls.close}>
        <li
          onClick={() => setActiveSide(false)}
        >
          <AiOutlineClose />
        </li>
      </div>
      <div className={cls.confirm}>
        {
          base?.basket_products.length !== 0 ? 
          base?.basket_products.map(item => (
            <Components.BasketDetail item={item} setRefresh={setRefresh} />
          )) :
          null
        }
        <div className={cls.send}>
          <button
            onClick={() => send_order()}
          >
            Готово
          </button>
        </div>
      </div>

      {
        active ? <Components.Alert item={item} /> : null
      }
    </div>
  )
}

export default Confirm