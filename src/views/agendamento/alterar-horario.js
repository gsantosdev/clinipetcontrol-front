import React from "react";
import ConfigService from "../../app/service/configService";
import FormGroup from "../../components/form-group";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";


class AlterarHorario extends React.Component {

  state = {
    horarioInicio: '',
    horarioFim: ''
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  constructor() {
    super();
    this.service = new ConfigService();
  }

  getHorario = () => {
    this.service.getConfig().then(response => {
      this.setState({ horarioInicio: response.data.horarioInicio, horarioFim: response.data.horarioFim })
    }).catch(error => {
      console.log(error)
    })
  }

  validar() {
    const msgs = []

    if (!this.state.horarioInicio) {
      msgs.push('O campo Horário de abertura é obrigatório.')
    }
    else if (!this.state.horarioFim) {
      msgs.push('O campo Horário de fechamento é obrigatório.')
    }
  }

  alterar = () => {

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    const id = 1;
    const { horarioInicio, horarioFim } = this.state

    const config = { id, horarioInicio, horarioFim }

    this.service.alterar(config).then(response => {
      mensagemSucesso(response)
      console.log(response)
      this.props.reset();


    }).catch(error => {
      if (error.response.data) {
        mensagemErro(error.response.data)
        return false;
      }
    })
  }


  componentDidMount() {
    this.getHorario();
  }


  render() {
    return (
      <> <div className="row mb-3">
        <div className="row d-flex justify-content-center mb-3">
          <h1 className="d-flex justify-content-center mb-3">
            HORÁRIO DE FUNCIONAMENTO
          </h1>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6">
            <FormGroup id="inputNome" label="Horário de abertura *">
              <input type="time" className="form-control"
                max={"23:30"}
                value={this.state.horarioInicio}
                name="horarioInicio"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6">
            <FormGroup id="inputNome" label="Horário de fechamento *">
              <input type="time" className="form-control"
                max={"00:30"}
                value={this.state.horarioFim}
                name="horarioFim"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end mt-4">
            <button onClick={this.alterar} type="button" className="btn btn-success">Salvar</button>
          </div>
        </div>
      </div>

      </>
    )
  }
}





export default AlterarHorario