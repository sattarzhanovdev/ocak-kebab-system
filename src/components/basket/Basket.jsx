import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { Components } from '..'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/basket/basket.module.scss'

const Basket = () => {
  const [ basketBase, setBasketBase ] = React.useState(null)
  const [ amount, setAmount ] = React.useState(null)
  const [ activeSide, setActiveSide ] = React.useState(false)
  const [ refresh, setRefresh ] = React.useState(null)

  const basketId = localStorage.getItem('basketId')

  React.useEffect(() => {
    REQUEST.getBaskets(Number(basketId))
      .then(res => {
        setAmount(res.data.sum_price);
        setBasketBase(res.data);
        setRefresh('REF', Math.random(0, 10))
      })
  }, [refresh, basketId])

  const deleteBasket = (id) => {
    REQUEST.deleteBasket(id)
      .then(() => setRefresh('ref', Math.random(0, 10)))
  }
    
  return (
    <div className={cls.basket}>
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
              basketBase?.basket_products?.length !== 0 ?
              basketBase?.basket_products?.map((item, i) => (
                <tr key={i} className={'text-light'}>
                  <td>
                    <img style={{width: '35px', height: '35px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50px'}} src={item.product.image} alt="" />
                  </td>
                  <td className='text-center'>{item.amount}</td>
                  <td className='text-center'>{item.amount * item.product.price}.00</td>
                  <td className='text-center' style={{color: 'red'}} onClick={() => deleteBasket(item.id)}>
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
      <div className={cls.amount}>
        <h3>Всего: <span>{amount ? amount : 0}.00 сом</span></h3>
      </div>
      {
        basketBase?.basket_products.length !== 0?
        <div className={cls.send_order}>
          <button
            onClick={() => setActiveSide(true)}
          >
            Подтвердить заказ
          </button>
        </div> :
        null
      }
      {
        activeSide ? 
        <Components.Confirm 
          base={basketBase}
          setRefresh={setRefresh}
          setActiveSide={setActiveSide}
        /> :
        null
      }
    </div>
  )
}

export default Basket