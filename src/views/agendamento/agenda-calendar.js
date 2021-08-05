import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom';
import AgendamentoService from '../../app/service/agendamentoService';


class AgendaCalendar extends React.Component {

  state = {
    agendamentos: [],
    events: []
  }

  constructor() {
    super();
    this.service = new AgendamentoService();
  }


  listarAgendamentos = async () => {
    await this.service.listar()
      .then(resposta => {
        this.setState({ agendamentos: resposta.data })
        console.log(this.state.agendamentos)
        Object.keys(resposta.data).forEach(index => {
          this.state.events.push({
            id: resposta.data[index].id,
            title: resposta.data[index].title,
            start: moment(resposta.data[index].start, "YYYY-MM-DDTHH:mm:ss")._d,
            end: moment(resposta.data[index].end, "YYYY-MM-DDTHH:mm:ss")._d
          })
        })
      }).catch(error => {
        console.log(error)
      })
    this.forceUpdate();
  }

  componentDidMount() {

    this.listarAgendamentos();

  }

  render() {
    const localizer = momentLocalizer(moment);
    return (
      <>

        <div style={{ height: '500pt' }} className="row mb-3">

          <Calendar
            localizer={localizer}
            views={['month', 'day', 'week', 'agenda']}
            startAcessor="start"
            step={10}
            endAcessoor="end"
            defaultView="month"
            defaultDate={moment().toDate()}
            events={this.state.events}
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              date: "Data",
              event: "Agendamento",
              time: "Duração",
              agenda:"Periodo Mensal",
              showMore: function showMore(total) {
                return '+' + total + ' agendamentos';
              }

            }}
            dayLayoutAlgorithm="no-overlap"

          >

          </Calendar>
        </div>
      </>
    )
  }

}

export default withRouter(AgendaCalendar)