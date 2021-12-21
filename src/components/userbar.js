import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthConsumer } from '../main/provedorAutenticacao';


function UserBar(props) {

  if (props.isUsuarioAutenticado) {
    return (
      <nav className="navbar justify-content-end nao-imprimir">
      
        <ul>
          <li style={{ listStyle: "none" }}>
            <h1 className="navbar-brand"> Status do caixa: </h1>
            <h1 className="navbar-brand" style={{ color: props.isCaixaOpen ? '#8af18a' : 'rgb(231 28 28)' }}> {props.isCaixaOpen ? "ABERTO" : "FECHADO"}</h1>

            <FontAwesomeIcon icon={faCashRegister} />
          </li>
        </ul>
        <ul>
          <li style={{ listStyle: "none" }}>
            <h1 className="navbar-brand ">Usuário:  {props.usuarioAutenticado.nome}</h1>

            <FontAwesomeIcon icon={faUser} />
          </li>
        </ul>

      </nav>
    )
  } else return false
}

export default () => (
  <AuthConsumer>
    {(context) => (<UserBar isCaixaOpen={context.isCaixaOpen} isUsuarioAutenticado={context.isAutenticado} usuarioAutenticado={context.usuarioAutenticado} />)}
  </AuthConsumer>
);