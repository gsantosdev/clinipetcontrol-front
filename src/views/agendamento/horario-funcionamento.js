import { Dialog } from "primereact/dialog";
import React from "react";
import { Button } from 'primereact/button';
import ConfigService from "../../app/service/configService";
import AlterarHorario from "./alterar-horario";


class HorarioFuncionamento extends React.Component {

  state = {
    horarioInicio: '',
    horarioFim: ''
  }

  constructor() {
    super();
    this.service = new ConfigService();
  }

  abrirConfirmacaoEditar = () => {
    this.setState({ showConfirmDialogEditar: true })
  }

  cancelar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  getHorario = () => {
    this.service.getConfig().then(response => {
      this.setState({ horarioInicio: response.data.horarioInicio, horarioFim: response.data.horarioFim })
    }).catch(error => {
      console.log(error)
    })
  }


  componentDidMount() {
    this.getHorario();
  }

  reset = () => {
    this.cancelar()
    this.getHorario();
  }



  render() {

    return (
      <>
        <div className="d-flex justify-content-center"><h1>{this.state.horarioInicio + ' - ' + this.state.horarioFim}</h1></div>
        <div className="d-flex justify-content-center"><button className="btn btn-warning" onClick={this.abrirConfirmacaoEditar}> Alterar horário </button></div>

        <Dialog

          onChange={e => this.setState({ showConfirmDialogEditar: false })}
          visible={this.state.showConfirmDialogEditar}
          style={{ width: '60vw' }}
          modal={true}
          onHide={() => {
            this.setState({ showConfirmDialogEditar: false })


          }}
        >
          <AlterarHorario reset={this.reset} />
        </Dialog>
      </>
    )
  }





}

export default HorarioFuncionamento