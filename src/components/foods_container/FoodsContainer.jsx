import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Components } from '..'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/foods_container/foods_container.module.scss'
import FoodsCard from '../foods_card/FoodsCard'

const FoodsContainer = ({products}) => {
  const [ search, setSearch ] = React.useState('')
  const [ checked, setChecked ] = React.useState('Все')
  const [ categoryId, setCategoryId ] = React.useState(0)
  const [ categories, setCategories ] = React.useState(null) 
  const [ active, setActive ] = React.useState(false)
  
  React.useEffect(() => {
    REQUEST.getCategories()
      .then(res => setCategories(res.data))
  }, [categoryId])

  let needly_products = products
  
  const categoried_base = products?.filter(item => categoryId === item.category.id , needly_products = [])

  const searched_base = products?.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()) , needly_products = [])

  return (
    <div className={cls.foods_container}>
      <div className={cls.searching}>
        <div className={cls.search}>
          <input 
            type="text" 
            placeholder='Поиск'
            onChange={e => {
              setSearch(e.target.value)
              setChecked('Все')
              setCategoryId(0)
            }}
          />
        </div>
        <div className={cls.category}>
          <p>Категория: <span onClick={() => setActive(!active)}>{checked} <FiChevronDown /></span></p>
          {
            active ? 
            <div>
              <p
                onClick={() => {
                  setChecked('Все')
                  setCategoryId(0)
                  setActive(!active)
                }}
              >
                Все
              </p>
              {
                categories ? categories.map((category, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setChecked(category.title)
                      setCategoryId(category.id)
                      setActive(!active)
                    }}
                  >
                    {category.title}
                  </p>
                )) : null
              }
            </div> :
            null
          }
        </div>
      </div>
      {
        needly_products?.length !== 0 ?
        needly_products?.map((item, i) => (
          <FoodsCard 
            key={i}
            item={item}
          />
        )) : 
        categoryId === 0 ?
        searched_base?.map((item, i) => (
          <FoodsCard 
            key={i}
            item={item}
          />
        )) :
        categoryId !== 0 ?
        categoried_base?.map((item, i) => (
          <FoodsCard 
            key={i}
            item={item}
          />
        )) :
        !searched_base && !categoried_base && !needly_products ?
        <div className={cls.loader_container}>
          <Components.Loader />
        </div> :
        <div className={cls.loader_container}>
          <Components.Loader />
        </div>
      }
    </div>
  )
}

export default FoodsContainer