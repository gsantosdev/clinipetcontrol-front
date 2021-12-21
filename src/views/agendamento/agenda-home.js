import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/card';
import { Tabs, Tab } from 'react-bootstrap';
import MarcarAgendamento from './marcar';
import AgendaCalendar from './agenda-calendar';
import HorarioFuncionamento from './horario-funcionamento';

class AgendamentoHome extends React.Component {


  render() {
    return (
      <div className="container-fluid">
        <Tabs unmountOnExit defaultActiveKey="agenda" id="uncontrolled-tab">

          <Tab eventKey="agenda" title="Agenda">
            <Card title="Agenda">
              <AgendaCalendar />
            </Card>
          </Tab>
          <Tab eventKey="horario" title="Alterar horário de funcionamento">
            <Card title="Horário de funcionamento">
              <HorarioFuncionamento />
            </Card>
          </Tab>

        </Tabs>




      </div>
    );
  }
}


export default withRouter(AgendamentoHome)