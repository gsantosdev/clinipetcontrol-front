import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroFuncionario from './cadastro-funcionario'
import ProntuarioFuncionario from './prontuario-funcionario'



class FuncionarioHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Funcionarios">
              <CadastroFuncionario />
            </Card>
          </Tab>
          <Tab eventKey="consultar" title="Consultar">
            <Card title="Consultar">
              <ProntuarioFuncionario />
            </Card>
          </Tab>
        
        </Tabs>


      </div>
    )
  }

}


export default withRouter(FuncionarioHome)
