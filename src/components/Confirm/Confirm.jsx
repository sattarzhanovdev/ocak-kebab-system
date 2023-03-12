import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
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
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })
  }

  const deleteBasket = (id) => {
    REQUEST.deleteBasket(id)
      .then(() => setRefresh('ref', Math.random(0, 10)))
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
        <table className="table">
          <thead className={'text-light'}>
            <tr>
              <th scope="col">Фото</th>
              <th scope="col" className='text-center'>Кол-во</th>
              <th scope="col" className='text-center'>Сумма</th>
              <th scope="col" className='text-center'>ㅤ</th>
            </tr>
          </thead>
          <tbody>
              {
                base?.basket_products?.length !== 0 ?
                base?.basket_products?.map((item, i) => (
                  <tr key={i} className={'text-light'}>
                    <td>
                      <img style={{width: '35px', height: '35px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50px'}} src={item.product.image} alt="" />
                    </td>
                    <td className='text-center'>{item.amount}</td>
                    <td className='text-center'>{item.amount * item.product.price}.00</td>
                    <td className='text-center text-danger' onClick={() => deleteBasket(item.id)}>
                      <BiTrash />
                    </td>
                  </tr>
                )) : 
                <tr>
                  <td className={'text-light'}>Ничего нет</td>
                  <td>ㅤ</td>
                  <td>ㅤ</td>
                  <td>ㅤ</td>
                </tr>
              }
          </tbody>
        </table>
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