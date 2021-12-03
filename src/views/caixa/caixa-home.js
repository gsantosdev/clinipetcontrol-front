import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Card from '../../components/card';
import VisualizarCaixa from "./visualizar-caixa";
import CadastrarLancamento from "./cadastrar-lancamento";
import { AuthContext } from "../../main/provedorAutenticacao";

class CaixaHome extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <Tabs unmountOnExit defaultActiveKey="visualizar_caixa" id="uncontrolled-tab">
          <Tab eventKey="visualizar_caixa" title="Visualizar Caixa">
            <Card title="Visualizar Caixa">
              <VisualizarCaixa />
            </Card>
          </Tab>
          <Tab disabled={!this.context.isCaixaOpen} eventKey="cadastrar_lancamento" title="Cadastrar lançamento">
            <Card title="Cadastrar lançamento">
              <CadastrarLancamento />
            </Card>
          </Tab> 



        </Tabs>
      </div>
    )
  }
}

CaixaHome.contextType = AuthContext



export default withRouter(CaixaHome)
