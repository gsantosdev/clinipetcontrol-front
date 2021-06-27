import React from 'react'

import { Button } from 'primereact/button';
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Rotas from './rotas'
import NavBar from '../components/navbar'
import SideBar from '../components/sidebar'

import 'toastr/build/toastr.min.js'


import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'




import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import { UserBar } from '../components/userbar';



class App extends React.Component {

  state = {
    usuario: 'Gustavo Santos'
  }


  render() {
    return (
      <>
        <SideBar />
        <div className="content-navbar">
          <UserBar username={this.state.usuario} />

        </div>
        <div className="content">
          <Rotas />
        </div>
      </>
    )

  }
}

export default App;
