import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthConsumer } from '../main/provedorAutenticacao';


function UserBar(props) {

  if (props.isUsuarioAutenticado) {
  return (
    <nav className="navbar justify-content-end">
      <ul>
        <li style={{ listStyle: "none" }}>
          <h1 class="navbar-brand ">Usuário:  {props.usuarioAutenticado.nome}</h1>
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
      <ul>
        <li style={{ listStyle: "none" }}>
          <h1 class="navbar-brand ">Tipo:  {props.usuarioAutenticado.tipo}</h1>
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </nav>
  )
  } else return false
}

export default () => (
  <AuthConsumer>
    {(context) => (<UserBar isUsuarioAutenticado={context.isAutenticado} usuarioAutenticado={context.usuarioAutenticado} />)}
  </AuthConsumer>
);