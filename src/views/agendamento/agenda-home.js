import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/card';
import { Tabs, Tab } from 'react-bootstrap';
import MarcarAgendamento from './marcar';
import AgendaCalendar from './agenda-calendar';

class AgendamentoHome extends React.Component {


  render() {
    return (
      <div className="container-fluid">

        <Tabs defaultActiveKey="marcar" id="uncontrolled-tab">
          <Tab eventKey="marcar" title="Marcar">
            <Card title="Marcar Agendamento">
              <MarcarAgendamento />
            </Card>
          </Tab>
          <Tab eventKey="remarcar" title="Remarcar">
            <Card title="Remarcar Agendamento">

            </Card>
          </Tab>
          <Tab eventKey="desmarcar" title="Desmarcar">
            <Card title="Desmarcar Agendamento">

            </Card>
          </Tab>
          <Tab eventKey="agenda" title="Visualizar Agenda">
            <Card title="Agenda">
              <AgendaCalendar />
            </Card>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


export default withRouter(AgendamentoHome)