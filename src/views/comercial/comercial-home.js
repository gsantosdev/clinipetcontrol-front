import React from "react";
import Card from '../../components/card'

import { Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import Venda from "./venda";



class ComercialHome extends React.Component {

  render() {
    return (
      <div className="container-fluid">

        <Tabs unmountOnExit defaultActiveKey="efetuar_venda" id="uncontrolled-tab">
          <Tab eventKey="efetuar_venda" title="Venda">
            <Card title="Efetuar Venda">
              <Venda />
            </Card>
          </Tab>
        </Tabs>
      </div>
    )
  }


}



export default withRouter(ComercialHome)
