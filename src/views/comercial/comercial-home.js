import React from "react";
import Card from '../../components/card'

import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import VendaServico from "./vendaServico";
import ProntuarioOrdemServico from "./prontuario-ordemServico";
import VendaProduto from "./vendaProduto";
import { AuthContext } from "../../main/provedorAutenticacao";



class ComercialHome extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="cadastrar_ordem" id="uncontrolled-tab">
          <Tab eventKey="cadastrar_ordem" title="Cadastrar ordem de serviço">
            <Card title="Cadastrar ordem de serviço">
              <VendaServico />
            </Card>
          </Tab>
          <Tab eventKey="consultar_ordem" title="Consultar ordem de serviço">
            <Card title="Consultar ordem de serviço">
              <ProntuarioOrdemServico />
            </Card>
          </Tab>
          <Tab disabled={!this.context.isCaixaOpen} eventKey="venda_produto" title="Venda de produtos">
            <Card title="Efetuar venda">
              <VendaProduto />
            </Card>
          </Tab>

        </Tabs>
      </div>
    )
  }


}

ComercialHome.contextType = AuthContext



export default withRouter(ComercialHome)
