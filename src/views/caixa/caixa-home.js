import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Card from '../../components/card';
import VisualizarCaixa from "./visualizar-caixa";

class CaixaHome extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <Tabs unmountOnExit defaultActiveKey="cadastrar_ordem" id="uncontrolled-tab">
          <Tab eventKey="cadastrar_conta_a_pagar" title="Contas a Pagar">
            <Card title="Cadastrar contas a pagar">
            </Card>
          </Tab>
          <Tab eventKey="cadastrar_conta_a_receber" title="Contas a Receber">
            <Card title="Cadastrar contas a receber">
            </Card>
          </Tab>
          <Tab eventKey="visualizar_caixa" title="Visualizar Caixa">
            <Card title="Visualizar Caixa">
              <VisualizarCaixa/>
            </Card>
          </Tab>
        </Tabs>
      </div>
    )
  }
}



export default withRouter(CaixaHome)
