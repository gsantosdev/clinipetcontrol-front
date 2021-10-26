import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroProduto from './cadastro-produto'



class ProdutoHome extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastroProd" id="uncontrolled-tab">
          <Tab eventKey="cadastroProd" title="Cadastro">
            <Card title="Cadastro de Produtos">
              <CadastroProduto />
            </Card>
          </Tab>
          <Tab eventKey="consultar" title="Consultar/Editar/Deletar">
            <Card title="Consultar/Editar/Deletar">
            </Card>
          </Tab>

        </Tabs>


      </div>
    )
  }

}


export default withRouter(ProdutoHome)
