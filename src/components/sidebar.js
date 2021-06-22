import { faDog, faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import SideBarItem from './sidebarItem'

function SideBar() {

  return (

    <div className="sidebar">
      <div className="nav-header">
        <figure>
          <img width="100%" src="/logo.png"></img>
        </figure>
      </div>

      <SideBarItem icon={faHome} href="#/home" label="Home" />
      <SideBarItem icon={faUsers} href="#/cadastro-usuarios" label="Clientes" />
      <SideBarItem icon={faDog} href="#/" label="Animais" />
    </div>
  )
}


export default SideBar
