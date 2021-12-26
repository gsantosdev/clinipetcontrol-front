import moment from 'moment';
import 'moment/locale/pt-br';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom';
import AgendamentoService from '../../app/service/agendamentoService';
import ConfigService from '../../app/service/configService';
import configData from "../../config.json";



class AgendaCalendar extends React.Component {

  state = {
    horarioFim: null,
    minutosFim: null,
    horarioInicio: null,
    minutosInicio: null,
    agendamentos: [],
    events: [],
    showEventDialog: false,
    eventOnScreen: {}
  }

  constructor() {
    super();
    this.agendamentoService = new AgendamentoService();
    this.configService = new ConfigService();

  }

  getHorario = async () => {
    await this.configService.getConfig().then(response => {
      this.setState({ horarioInicio: response.data.horarioInicio.split(':')[0], minutosInicio: response.data.horarioInicio.split(':')[1], horarioFim: response.data.horarioFim.split(':')[0], minutosFim: response.data.horarioFim.split(':')[1] })


    }).catch(error => {
      console.log(error)
    })
  }

  update = () => {
    this.forceUpdate();
  }


  listarAgendamentos = async () => {
    await this.agendamentoService.listar()
      .then(resposta => {
        this.setState({ agendamentos: resposta.data })
        console.log(this.state.agendamentos)
        Object.keys(resposta.data).forEach(index => {
          this.state.events.push({
            id: resposta.data[index].id,
            ativo: resposta.data[index].ativo,
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


  async componentDidMount() {
    await this.getHorario();

    this.listarAgendamentos();
    console.log(this.state.horarioFim)

  }

  render() {
    const localizer = momentLocalizer(moment);

    return (
      <>

        <div style={{ height: '500pt' }} className="row mb-3">

          <Calendar
            eventPropGetter={(event) => {
              const backgroundColor = event.ativo ? '#00a0d4' : 'gray';
              const opacity = event.ativo ? 'none' : '65%';
              return { style: { backgroundColor, opacity } }
            }}
            min={new Date(2021, 1, 0, this.state.horarioInicio, this.state.minutosInicio, 0)} max={new Date(2020, 1, 0, this.state.horarioFim, this.state.minutosFim, 0)}
            localizer={localizer}
            views={['month', 'day', 'week', 'agenda']}
            startAcessor="start"
            step={15}
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
              noEventsInRange:'Não existem agendamentos no período selecionado',
              showMore: function showMore(total) {
                return '+' + total + ' agendamentos';
              }

            }}
            dayLayoutAlgorithm="no-overlap"

          >

          </Calendar>
        </div>

        <Dialog
          contentStyle={{ overflowX: "auto" }}
          visible={this.state.showEventDialog}
          style={{ width: '70vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showEventDialog: false, eventOnScreen: {} })
          }
          }
        >
          <div className="row">
            <div className="col-12" style={{ overflowX: "auto" }}>

              <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>
                <b>
                  Dados do agendamento
                </b>
              </h1>
            </div>

            <div className="row">
              <div className="col-12" style={{ overflowX: "auto" }}>

                <div className="col-12" style={{ overflowX: "auto" }}>

                  <table className="mt-5 table table-hover" style={{ overflowX: "auto" }}>
                    <thead>
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Serviço</th>
                        <th scope="col">Animal</th>
                        <th scope="col">Proprietário</th>
                        <th scope="col">Contato do Proprietário</th>
                        <th scope="col">Status</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> {this.state.eventOnScreen.nomeFuncionario}</td>
                        <td> {this.state.eventOnScreen.nomeServico}</td>
                        <td> {this.state.eventOnScreen.nomeAnimal}</td>
                        <td> {this.state.eventOnScreen.nomeProprietario}</td>
                        <td> {this.state.eventOnScreen.telefoneProprietario}</td>
                        <td> {this.state.eventOnScreen.ativo ? "A REALIZAR" : "CONCLUÍDO / ENCERRADO"}</td>


                      </tr>
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>



        </Dialog>
      </>
    )
  }

}

export default withRouter(AgendaCalendar)