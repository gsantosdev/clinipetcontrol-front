import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Card from '../../components/card';
import VisualizarCaixa from "./visualizar-caixa";
import CadastrarLancamento from "./cadastrar-lancamento";

class CaixaHome extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <Tabs unmountOnExit defaultActiveKey="cadastrar_lancamento" id="uncontrolled-tab">
          <Tab eventKey="cadastrar_lancamento" title="Cadastrar lançamento">
            <Card title="Cadastrar lançamento">
              <CadastrarLancamento />
            </Card>
          </Tab>
          <Tab eventKey="visualizar_caixa" title="Visualizar Caixa">
            <Card title="Visualizar Caixa">
              <VisualizarCaixa />
            </Card>
          </Tab>
        </Tabs>
      </div>
    )
  }
}



export default withRouter(CaixaHome)
