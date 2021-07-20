import React from 'react';
import { Inject, Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/pt-br'
import { withRouter } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AgendamentoService from '../../app/service/agendamentoService';


class AgendaCalendar extends React.Component {

  state = {
    agendamentos: []
  }

  constructor() {
    super();
    this.service = new AgendamentoService();
  }




  listarAgendamentos = () => {
    this.service.listar()
      .then(resposta => {
        this.setState({ agendamentos: resposta.data })
      }).catch(error => {
        console.log(error)
      })

  }

  async componentDidMount() {
    await this.listarAgendamentos();
  }

  render() {
    const localizer = momentLocalizer(moment);
    return (

      <div style={{ height: '500pt' }} className="row mb-3">
        <Calendar
          localizer={localizer}
          defaultView="month"
          startAcessor="start"
          endAcessoor="end"
          defaultDate={moment().toDate()}
          events={this.state.agendamentos}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
          }}
        >

        </Calendar>
      </div>
    )
  }

}

export default withRouter(AgendaCalendar)