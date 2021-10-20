import React from "react";
import Card from '../../components/card'

import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Venda from "./venda";



class ComercialHome extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="efetuar_venda" id="uncontrolled-tab">
          <Tab eventKey="efetuar_venda" title="Venda de serviço">
            <Card title="Efetuar Venda de Serviço">
              <Venda />
            </Card>
          </Tab>
        </Tabs>
      </div>
    )
  }


}



export default withRouter(ComercialHome)
