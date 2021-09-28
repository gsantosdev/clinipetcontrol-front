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

        <SideBarItem render={props.isAdmin || props.isSecretaria} icon={faHome} href="#/home" label="Home" />
        <SideBarItem render={props.isAdmin || props.isSecretaria} icon={faUsers} href="#/cliente" label="Clientes" />

        <SideBarItem render={props.isAdmin || props.isSecretaria} icon={faDog} href="#/animal" label="Animais" />
        <SideBarItem render={props.isAdmin} icon={faHandHoldingMedical} href="#/servico" label="Serviços" />
        <SideBarItem render={props.isAdmin} icon={faAddressCard} href="#/funcionario" label="Funcionários" />

        <SideBarItem render={props.isAdmin || props.isSecretaria} icon={faCalendar} href="#/agendamento" label="Agenda" />
        <SideBarItem render={props.isAdmin} icon={faUser} href="#/usuarios" label="Usuarios" />

        <SideBarItem render={true} onClick={props.encerrarSessao} icon={faArrowLeft} href="#/login" label="Sair" />
        {/*<SideBarItem icon={faNotesMedical} href="#/" label="Relatórios" />*/}



      </div>
    )
  }
  else return false



}



export default () => (
  <AuthConsumer>
    {(context) => (<SideBar isUsuarioAutenticado={context.isAutenticado} encerrarSessao={context.encerrarSessao} isSecretaria={context.isSecretaria} isAdmin={context.isAdmin} isVeterinario={context.isVeterinario} />)}
  </AuthConsumer>
);