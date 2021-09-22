import { faAddressCard, faArrowLeft, faCalendar, faDog, faHandHoldingMedical, faHome, faNotesMedical, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import SideBarItem from './sidebarItem'


import AuthService from '../app/service/authService'


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
      {/*<SideBarItem onClick={deslogar} icon={faArrowLeft} href="#/login" label="Sair" />*/}

      {/*<SideBarItem icon={faNotesMedical} href="#/" label="Relatórios" />*/}
      {/*}<SideBarItem icon={faUser} href="#/cadastro-usuarios" label="Usuarios" />*/}



    </div>
  )
}


export default SideBar
