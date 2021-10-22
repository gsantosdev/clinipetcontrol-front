import React from "react";
import Card from '../../components/card'

import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Venda from "./venda";
import ProntuarioOrdemServico from "./prontuario-ordemServico";



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
              <Venda />
            </Card>
          </Tab>
          <Tab eventKey="consultar_ordem" title="Consultar ordem de serviço">
            <Card title="Consultar ordem de serviço">
              <ProntuarioOrdemServico />
            </Card>
          </Tab>
        </Tabs>
      </div>
    )
  }


}



export default withRouter(ComercialHome)
