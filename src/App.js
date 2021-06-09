import React from 'react'

import Login from './views/login'
import CadastroUsuario from './views/cadastroUsuario'


import 'bootswatch/dist/flatly/bootstrap.css'

import './custom.css'


class App extends React.Component {


  render() {
    return (
      <CadastroUsuario/>
    )

  }
}

export default App;
