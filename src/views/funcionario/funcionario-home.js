import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroFuncionario from './cadastro-funcionario'
import ProntuarioFuncionario from './prontuario-funcionario'
import RelatorioColaborador from './relatorio-colaborador'



class FuncionarioHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastro" id="uncontrolled-tab">
          <Tab eventKey="cadastro" title="Cadastro">
            <Card title="Cadastro de Colaboradores">
              <CadastroFuncionario />
            </Card>
          </Tab>
          <Tab eventKey="consultar" title="Consultar/Editar/Deletar">
            <Card title="Consultar/Editar/Deletar">
              <ProntuarioFuncionario />
            </Card>
          </Tab>
          <Tab eventKey="relatorios" title="Relatórios">
            <Card title="Relatórios de colaborador">
              <RelatorioColaborador />
            </Card>
          </Tab>

        </Tabs>


      </div>
    )
  }

}


export default withRouter(FuncionarioHome)
