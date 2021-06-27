import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function UserBar(props) {
  return (
    <nav className="navbar justify-content-end">
      <ul>
        <li style={{ listStyle: "none" }}>
          <h1 class="navbar-brand ">Usuário:  {props.username}</h1>
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </nav>
  )
}