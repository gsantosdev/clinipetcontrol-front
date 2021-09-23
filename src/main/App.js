import 'bootswatch/dist/flatly/bootstrap.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import SideBar from '../components/sidebar';
import  UserBar  from '../components/userbar';
import '../custom.css';
import Rotas from './rotas';
import ProvedorAutenticacao from './provedorAutenticacao';



class App extends React.Component {

  state = {
    usuario: 'Gustavo Santos'
  }


  render() {
    return (
      <ProvedorAutenticacao>
        <SideBar />
        <div className="content-navbar">
          <UserBar/>

        </div>
        <div className="content">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )

  }
}

export default App;
