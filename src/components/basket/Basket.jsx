import React from 'react'
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


    
  return (
    <div className={cls.basket}>
      {
        basketBase?.basket_products.length !== 0 ? 
        basketBase?.basket_products.map((val, i) => (
          <Components.BasketDetail 
            key={i}
            item={val}
            setRefresh={setRefresh}
          />
        )) : 
        <div className={cls.nothing}>
          <h3>Пока вы ничего не добавили</h3>
        </div>
      }
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