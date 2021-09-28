import { faAddressCard, faArrowLeft, faCalendar, faDog, faHandHoldingMedical, faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { AuthConsumer } from '../main/provedorAutenticacao'
import SideBarItem from './sidebarItem'


function SideBar(props) {

  if (props.isUsuarioAutenticado) {
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
        <SideBarItem icon={faUser} href="#/usuarios" label="Usuarios" />

        <SideBarItem onClick={props.encerrarSessao} icon={faArrowLeft} href="#/login" label="Sair" />
        {/*<SideBarItem icon={faNotesMedical} href="#/" label="Relatórios" />*/}



      </div>
    )
  }
  else return false



}



export default () => (
  <AuthConsumer>
    {(context) => (<SideBar isUsuarioAutenticado={context.isAutenticado} encerrarSessao={context.encerrarSessao} />)}
  </AuthConsumer>
);