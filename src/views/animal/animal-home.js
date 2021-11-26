import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroAnimal from './cadastro-animal'
import EspeciesHome from './especie/especies-home'
import ProntuarioAnimal from './prontuario-animal'
import RelatorioAnimal from './relatorio-animal'


class AnimalHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Animais">
              <CadastroAnimal />
            </Card>
          </Tab>
          <Tab eventKey="consultar" title="Consultar/Editar/Deletar">
            <Card title="Consultar/Editar/Deletar">
              <ProntuarioAnimal />
            </Card>
          </Tab>
          <Tab eventKey="especies" title="Espécies">
            <EspeciesHome />
          </Tab>
          <Tab eventKey="relatorios" title="Relatórios">
            <Card title="Relatórios de animal">

              <RelatorioAnimal />
            </Card>
          </Tab>
        </Tabs>


      </div>
    )
  }

}


export default withRouter(AnimalHome)