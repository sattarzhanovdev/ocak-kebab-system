import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { Components } from '../../components'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/basket_details/basket_details.module.scss'

const BasketDetail = ({item, setRefresh}) => {
  function deleteBasket (id) {
    REQUEST.deleteBasket(id)
    setRefresh('ref', Math.random(0, 10))
  }

  return (
    <div className={cls.down}>
      <div className={cls.left}>
        <Components.Image
          src={item.product.image}
          alt={item.product.title}
        />
      </div>
      <div className={cls.right}>
        <p>{item.amount}</p>
        <p>{item.amount * item.product.price}</p>
        <p
          className={cls.trash}
          onClick={() => deleteBasket(item.id)}
        >
          <BiTrash />
        </p>
      </div>
    </div>
  )
}

export default BasketDetail