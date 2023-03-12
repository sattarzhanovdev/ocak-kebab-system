import React from 'react'
import { Components } from '..'
import { images } from '../../assets/images'
import cls from '../../assets/styles/sidebar/sidebar.module.scss'
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = () => {
  const [ active, setActive ] = React.useState(false) 

  return (
    <div className={active ? cls.sidebar_active : cls.sidebar_none}>
      <div className={cls.btn_side}>
        <button
          onClick={() => setActive(true)}
        >
          Ваши заказы
        </button>
      </div>
      <div className={cls.up}>
        <Components.Image
          src={images.logo.logo_light}
          alt={'logo'}
        />
        <li
          onClick={() => setActive(false)}
        >
          <AiOutlineClose />
        </li>
      </div>
      <h3>Ваши заказы</h3>
      <Components.Basket />
    </div>
  )
}

export default Sidebar