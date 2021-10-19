import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Card from '../../components/card';
import CadastroUsuario from './cadastro-usuario';
import ProntuarioUsuario from './prontuario-usuario';


class UsuarioHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Usuários">
              <CadastroUsuario />
            </Card>
          </Tab>
          <Tab eventKey="consultar" title="Consultar/Editar/Deletar">
            <Card title="Consultar/Editar/Deletar">
              <ProntuarioUsuario />
            </Card>
          </Tab>

        </Tabs>

      </div>
    )
  }
}


export default withRouter(UsuarioHome)