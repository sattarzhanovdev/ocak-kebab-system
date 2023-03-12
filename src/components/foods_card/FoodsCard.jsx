import React from 'react'
import { Components } from '..'
import cls from '../../assets/styles/foods_card/foods_card.module.scss'
import { BiTime } from 'react-icons/bi'
import { FiShoppingCart } from 'react-icons/fi'
import { REQUEST } from '../../api'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useNavigate } from 'react-router-dom'

const FoodsCard = ({item}) => {
  const Navigate = useNavigate()

  return (
    <div className={cls.card}>
      <div 
        className={cls.left__side}
        onClick={() => {
          Navigate(`/more/${item.title}`)
          localStorage.setItem('item', JSON.stringify(item))
        }}
      >
        <Components.Image 
          src={item?.image}
          alt={item?.title}
        />
      </div>
      <div className={cls.right__side}>
        <div className={cls.up}>
          <h4>{item?.title.length > 15 ? `${item?.title.slice(0, 15)}...` : item?.title}</h4>
          <span>{item?.price} сом</span>
        </div>
        <div className={cls.row}>
          <p>ㅤ</p> 
          <div className={cls.cooking__time}>
            <BiTime /> <span>{item.ready_time} мин</span>
          </div>
        </div>
        <div className={cls.more}>
          <button
            onClick={() => {
              Navigate(`/more/${item.title}`)
              localStorage.setItem('item', JSON.stringify(item))
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodsCard