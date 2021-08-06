import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom';
import AgendamentoService from '../../app/service/agendamentoService';
import { Dialog } from 'primereact/dialog';



class AgendaCalendar extends React.Component {

  state = {
    agendamentos: [],
    events: [],
    showEventDialog: false,
    eventOnScreen: {}
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
            nomeFuncionario: resposta.data[index].nomeFuncionario,
            nomeAnimal: resposta.data[index].nomeAnimal,
            nomeServico: resposta.data[index].nomeServico,
            telefoneProprietario: resposta.data[index].telefoneProprietario,
            nomeProprietario: resposta.data[index].nomeProprietario,
            start: moment(resposta.data[index].start, "YYYY-MM-DDTHH:mm:ss")._d,
            end: moment(resposta.data[index].end, "YYYY-MM-DDTHH:mm:ss")._d
          })
        })
      }).catch(error => {
        console.log(error)
      })
    this.forceUpdate();
  }

  abrirEventDialog = async (event) => {
    await this.setState({ showEventDialog: true, eventOnScreen: event })
    console.log(this.state.eventOnScreen)

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
            onSelectEvent={event => {
              this.abrirEventDialog(event)
            }}
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
              agenda: "Periodo Mensal",
              showMore: function showMore(total) {
                return '+' + total + ' agendamentos';
              }

            }}
            dayLayoutAlgorithm="no-overlap"

          >

          </Calendar>
        </div>

        <Dialog
          visible={this.state.showEventDialog}
          style={{ width: '50vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showEventDialog: false, eventOnScreen: {} })
          }
          }
        >
          <div>


            <div className="col d-flex justify-content-center">


            <h1 style={{fontSize:"2.5rem"}}>
              <b>
                Dados do agendamento
              </b>
            </h1>
            </div>

            <div className="col d-flex justify-content-center">

            <table className="mt-5 table table-hover">
              <thead>
                <tr>
                  <th scope="col">Funcionário</th>
                  <th scope="col">Serviço</th>
                  <th scope="col">Animal</th>
                  <th scope="col">Proprietário</th>
                  <th scope="col">Contato do Proprietário</th>
                </tr>
              </thead>
              <tbody className="col-12">
                <tr>
                  <td> {this.state.eventOnScreen.nomeFuncionario}</td>
                  <td> {this.state.eventOnScreen.nomeServico}</td>
                  <td> {this.state.eventOnScreen.nomeAnimal}</td>
                  <td> {this.state.eventOnScreen.nomeProprietario}</td>
                  <td> {this.state.eventOnScreen.telefoneProprietario}</td>


              </tr>
              </tbody>

            </table>
            </div>
            
          </div>



        </Dialog>
      </>
    )
  }

}

export default withRouter(AgendaCalendar)