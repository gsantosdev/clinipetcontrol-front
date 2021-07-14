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

        <Tabs defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Funcionarios">
              <CadastroFuncionario />
            </Card>
          </Tab>
          <Tab eventKey="prontuario" title="Prontuário">
            <Card title="Prontuário">
              <ProntuarioFuncionario/>
            </Card>
          </Tab>
          <Tab eventKey="contact" title="Agendamentos">
            <Card title="Agendamentos">

            </Card>
          </Tab>
        </Tabs>


      </div>
    )
  }

}


export default withRouter(FuncionarioHome)
