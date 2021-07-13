import React from 'react';
import { withRouter } from 'react-router-dom';
import FuncionarioService from '../../app/service/funcionarioService';
import FormGroup from '../../components/form-group';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/selectMenu';



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

  constructor(props) {
    super(props);
    this.service = new FuncionarioService();

  }


  render() {
    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-md-3">
            <FormGroup id="inputNome" label="Nome completo: *">
              <input type="text" className="form-control"
                value={this.state.nome}
                name="nome"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputEmail" label="Email: *">
              <input type="email" className="form-control"
                value={this.state.email}
                name="email"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-2">
            <FormGroup id="inputTelefone" label="Telefone: *">
              <input type="tel" className="form-control" id="tel" placeholder="(00) 0000-0000"
                name="tel" maxLength="15" /*pattern="\(\d{2}\)\s*\d{5}-\d{4}"*/
                value={this.state.telefone}
                name="telefone"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-1">
            <FormGroup id="inputSexo" label="Sexo: *">
              <SelectMenu className="form-control" lista={this.service.obterSexos()}
                value={this.state.sexo}
                name="sexo"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-1">
            <FormGroup id="inputVeterinario" label="É Veterinário? *">
              <input aria-label="Sim" type="radio"
                id="veterinario-sim"
                checked={this.state.simChecked}
                name="veterinario"
                onClick={e => {
                  this.setState({ simChecked: true, veterinario: true })
                }}
              />
              <label className="p-1" for="veterinario-sim">Sim</label>
              <input type="radio"
                id="veterinario-nao"
                checked={this.state.naoChecked}
                onClick={e => {
                  this.setState({ naoChecked: true, veterinario: false })
                }}
                name="veterinario"
              />
              <label className="p-1" for="veterinario-sim">Não</label>
            </FormGroup>
          </div>
          <div className="col-md-1">
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