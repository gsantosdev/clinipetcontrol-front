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

        <Card title="Agenda">
          <AgendaCalendar />
        </Card>


      </div>
    );
  }
}


export default withRouter(AgendamentoHome)