import {faAddressCard, faCalendar, faDog, faHandHoldingMedical, faHome, faNotesMedical, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import SideBarItem from './sidebarItem'


function SideBar() {

  return (

    <div className="sidebar">
      <div className="sidebar-header">
        <figure>
          <img width="100%" height="50%" src="/logo.png"></img>
        </figure>
      </div>

      <SideBarItem icon={faHome} href="#/home" label="Home" />
      <SideBarItem icon={faUsers} href="#/cliente" label="Clientes" />

      <SideBarItem icon={faDog} href="#/animal" label="Animais" />
      <SideBarItem icon={faHandHoldingMedical} href="#/servico" label="Serviços" />
      <SideBarItem icon={faAddressCard} href="#/funcionario" label="Funcionários" />

      <SideBarItem icon={faCalendar} href="#/agendamento" label="Agenda" />
      <SideBarItem icon={faNotesMedical} href="#/" label="Relatórios" />
      <SideBarItem icon={faUser} href="#/cadastro-usuarios" label="Usuarios" />



    </div>
  )
}


export default SideBar
