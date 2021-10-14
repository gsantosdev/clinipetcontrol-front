import React from 'react';
import { withRouter } from 'react-router-dom';
import FuncionarioService from '../../app/service/funcionarioService';
import FormGroup from '../../components/form-group';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/selectMenu';
import InputMask from "react-input-mask";



class CadastroFuncionario extends React.Component {

  state = {
    id: null,
    nome: '',
    telefone: '',
    email: '',
    sexo: '',
    veterinario: null,
    simChecked: false,
    naoChecked: false
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }


  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      if (key === "veterinario") {
        this.setState({ [key]: null })
      }
      else if (key === "simChecked") {
        this.setState({ [key]: null })
      }
      else if (key === "naoChecked") {
        this.setState({ [key]: null })
      }
      else {
        this.setState({ [key]: '' })
      }
    })

  }


  validar() {
    const msgs = []
    if (!this.state.nome) {
      msgs.push('O campo Nome é obrigatório.')
    }
    else if (!this.state.telefone) {
      msgs.push('O campo Telefone é obrigatório.')
    }
    else if (!this.state.email) {
      msgs.push('O campo Email é obrigatório.')
    }
    else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) {
      msgs.push('Informe um email válido.')
    }
    else if (!this.state.sexo) {
      msgs.push('O campo Sexo é obrigatório.')
    }
    else if (this.state.sexo == "Selecione...") {
      msgs.push('O campo Sexo é obrigatório.')
    }
    else if (this.state.veterinario == null) {
      msgs.push('Deve ser informado se é veterinário')
    }

    return msgs
  }

  cadastrar = () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    const veterinario = {
      nome: this.state.nome,
      telefone: this.state.telefone,
      email: this.state.email,
      sexo: this.state.sexo,
      veterinario: this.state.veterinario
    }

    this.service.salvar(veterinario)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        //this.props.history.push('/login')
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }

  editar = () => {

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }


    const funcionario = {
      id: this.state.id,
      nome: this.state.nome,
      telefone: this.state.telefone,
      email: this.state.email,
      sexo: this.state.sexo,
      veterinario: this.state.veterinario
    }

    this.service.editar(this.state.id, funcionario)
      .then(response => {
        mensagemSucesso(response)
        //this.props.history.push('/login')
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }

  componentDidMount() {
    console.log(this.props.state)
    this.setState(this.props.state)
  }

  constructor(props) {
    super(props);
    this.service = new FuncionarioService();

  }


  render() {
    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-xl-6 col-xxl-3">
            <FormGroup id="inputNome" label="Nome completo: *">
              <input type="text" className="form-control"
                value={this.state.nome}
                name="nome"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-xl-6 col-xxl-3">
            <FormGroup id="inputEmail" label="Email: *">
              <input type="email" className="form-control"
                value={this.state.email}
                name="email"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-xl-6 col-xxl-2">
            <FormGroup id="inputTelefone" label="Telefone: *">
              <InputMask mask="(99) 9 9999-9999" className="form-control" placeholder="(00) 0 000-0000"
                value={this.state.telefone}
                name="telefone"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6 col-xl-3 col-xxl-2">
            <FormGroup id="inputSexo" label="Sexo: *">
              <SelectMenu className="form-control" lista={this.service.obterSexos()}
                value={this.state.sexo}
                name="sexo"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6 col-xl-3 col-xxl-2">
            <FormGroup id="inputVeterinario" label="É Veterinário? *">


              <div className="form-check">
                <input className="form-check-input" type="radio" name="veterinario" id="flexRadioSim"
                  checked={this.props.editar ? this.state.veterinario : this.state.simChecked}
                  defaultChecked={this.state.veterinario}
                  name="veterinario"
                  onChange={e => {

                  }}
                  onClick={e => {
                    this.setState({ naoChecked: false, simChecked: true, veterinario: true })
                  }} />
                <label className="form-check-label" for="flexRadioSim">
                  Sim
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="veterinario" id="flexRadioNao"
                  checked={this.props.editar ? !this.state.veterinario : this.state.naoChecked}
                  defaultChecked={!this.state.veterinario}
                  onChange={e => {
                  }}
                  onClick={e => {
                    this.setState({ simChecked: false, naoChecked: true, veterinario: false })
                  }}
                />
                <label className="form-check-label" for="flexRadioNao">
                  Não
                </label>
              </div>

            </FormGroup>
          </div>
          <div className="col-sm-12 d-flex justify-content-end">
            <FormGroup>
              <div className="pt-2">
                <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
              </div>
            </FormGroup>

          </div>

        </div>

      </div>
    )
  }
}

export default withRouter(CadastroFuncionario)