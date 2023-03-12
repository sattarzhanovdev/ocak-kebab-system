import React from 'react'
import { Components } from '../../components'
import cls from "../../assets/styles/foods_more/foods_more.module.scss";
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { useGetProducts } from '../../hooks/useGetProducts';
import { REQUEST } from '../../api';

const FoodsMore = () => {
  const [ count, setCount ] = React.useState(1)
  const item = JSON.parse(localStorage.getItem('item'))

  const basketId = localStorage.getItem('basketId')
  const tableId = localStorage.getItem('tableId')

  const { toTablePage } = useGetProducts()

  const Navigate = useNavigate()

  function addToCart () {
    REQUEST.postBasketsDetails({
      qrcode_id: tableId, 
      amount: count,
      product: item?.id,
      basket: Number(basketId)
    })
      .then(() => {
        localStorage.setItem('basketId', basketId)
        toTablePage(Number(tableId))
      })
  }

  return (
    <div className={cls.more}>
      <div className={cls.back}>
        <button
          onClick={() => Navigate(`/t/${tableId}/`)}
        >
          <IoIosArrowBack />
        </button>
      </div>
      <div className={cls.image}>
        <Components.Image 
          src={item?.image}
          alt={item?.title}
        />
      </div>
      <div className={cls.title}>
        <h2>{item?.title}</h2>
      </div>
      <div className={cls.counter}>
        <button
          onClick={() => setCount(count - 1)}
          disabled={count === 1}
        >
          -
        </button>
        <input 
          type="number" 
          value={count}
          placeholder={1}
          onChange={e => setCount(Number(e.target.value))}
        />
        <button
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
      <div className={cls.ingredients}>
      <div className={cls.ingredients}>
          <h5>Ингредиент <span>Грамм</span></h5>
          {
            item.product_ingredients.length !== 0 ?
            item.product_ingredients.map((ing, i) => (
              <h5 key={i}>{ing.title.length > 16 ? `${ing.title.slice(0, 16)}...` : ing.title} <span>{ing.gram} гр.</span></h5>
            )) :
            <h5>
              Ингредиентов нету
            </h5>
          }
          <h5 className={cls.all}>ㅤ<span>Всего: </span></h5>
        </div>  
      </div>
      <div className={cls.add_to_cart}>
        <button
          onClick={() => addToCart()}
        >
          Добавить {count} за {item?.price * count} сом
        </button>
      </div>
    </div>
  )
}

export default FoodsMore