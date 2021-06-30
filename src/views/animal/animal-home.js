import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroAnimal from './cadastro-animal'




class AnimalHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Animais">
              <CadastroAnimal/>
            </Card>
          </Tab>
          <Tab eventKey="prontuario" title="Prontuário">
            <Card title="Prontuário">

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


export default withRouter(AnimalHome)