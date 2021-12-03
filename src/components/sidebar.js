import { faAddressCard, faArrowLeft, faBoxOpen, faCalendar, faDog, faFile, faHandHoldingMedical, faHome, faMoneyBill, faShoppingCart, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { React, useState } from 'react'
import { AuthConsumer } from '../main/provedorAutenticacao'
import { modulosEnum } from '../utils/modulosEnum'
import SideBarItem from './sidebarItem'


function SideBar(props) {


  const [selecionado, setSelecionado] = useState("")



  const selecionar = (selected) => {
    setSelecionado(selected)
  }




  if (props.isUsuarioAutenticado) {
    return (
      <div className="sidebar">
        <div className="sidebar-header d-flex justify-content-center">
          <figure>
            <img width="100%" src="/logo.png"></img>
          </figure>
        </div>

        <SideBarItem render={props.isAdmin || props.isSecretaria || props.isVeterinario}

          icon={faHome} href="#/home"
          label="Home"
          selecionar={selecionar}
          nome={modulosEnum.HOME}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin || props.isSecretaria}

          icon={faUsers}
          href="#/cliente"
          label="Clientes"
          nome={modulosEnum.CLIENTES}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin || props.isSecretaria}
          icon={faDog}
          href="#/animal"
          label="Animais"
          nome={modulosEnum.ANIMAIS}
          selecionar={setSelecionado}
          selecionado={selecionado}
        />
        <SideBarItem render={props.isAdmin || props.isSecretaria}
          icon={faShoppingCart}
          href="#/comercial"
          label="Comercial"
          nome={modulosEnum.COMERCIAL}
          selecionar={setSelecionado}
          selecionado={selecionado}
        />

        <SideBarItem render={props.isAdmin || props.isSecretaria}
          icon={faCalendar}
          href="#/agendamento"
          label="Agenda"
          nome={modulosEnum.AGENDA}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin}
          icon={faHandHoldingMedical}
          href="#/servico"
          label="Serviços"
          nome={modulosEnum.SERVICOS}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin || props.isSecretaria}
          icon={faBoxOpen}
          href="#/produto"
          label="Produtos"
          nome={modulosEnum.PRODUTOS}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin}
          icon={faAddressCard}
          href="#/colaboradores"
          label="Colaboradores"
          nome={modulosEnum.COLABORADORES}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin || props.isSecretaria}
          icon={faMoneyBill}
          href="#/caixa"
          label="Caixa"
          nome={modulosEnum.CAIXA}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={props.isAdmin}
          icon={faUser}
          href="#/usuarios"
          label="Usuarios"
          nome={modulosEnum.USUARIOS}
          selecionar={setSelecionado}
          selecionado={selecionado} />

        <SideBarItem render={true}
          encerrarSessao={props.encerrarSessao}
          icon={faArrowLeft}
          href="#/login"
          label="Sair"
          nome={modulosEnum.SAIR}
          selecionar={setSelecionado}
          selecionado={selecionado}
        />
        {/*<SideBarItem 
icon={faNotesMedical} href="#/" label="Relatórios" />*/}



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