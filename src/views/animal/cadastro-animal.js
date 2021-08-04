import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import SelectMenu from '../../components/selectMenu'
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import AnimalService from '../../app/service/animalService'
import ClienteTable from '../cliente/clienteTable';
import ClienteService from '../../app/service/clienteService';
import EspecieService from '../../app/service/especieService';
import moment from 'moment'



class CadastroAnimal extends React.Component {


  state = {
    id: null,
    nome: '',
    sexo: '',
    dataNascimento: '',
    raca: '',
    especie: '',
    porte: '',
    cor: '',
    alergias: '',
    patologias: '',
    medicamentos: '',
    idCliente: null,
    clientes: [],
    busca: '',
    especies: [],
    clienteProprietario: '',
    idClienteSelecionado: null,
    selecionado: false
  }




  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      if (key === "clientes" || key === "especies") {
        this.setState({ [key]: [] })
      }
      else {
        this.setState({ [key]: '' })
      }
    })
    this.listarEspecies()

  }
  getTodayDate() {
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    console.log(today)
    return today;
  }

  constructor(props) {
    super(props);
    this.service = new AnimalService();
    this.clienteService = new ClienteService();
    this.especieService = new EspecieService();
  }

  async listarEspecies() {
    const x = await this.especieService.getNomes()
    this.setState({ especies: x })
  }


  async componentDidMount() {
    if (this.props.editar) {
      console.log(this.props.state.cliente.id)
      this.buscarProprietario(this.props.state.cliente.id);
      await this.setState({ idClienteSelecionado: this.props.state.cliente.id })
      await this.setState({ idCliente: this.props.state.cliente.id })
    }


    this.listarEspecies()

    console.log(this.props.state);
    await this.setState(this.props.state);
    console.log(this.state);


  }

  validar() {
    const msgs = []

    if (!this.state.nome) {
      msgs.push('O campo Nome é obrigatório.')
    }

    else if (!this.state.sexo) {
      msgs.push('O campo Sexo é obrigatório.')
    }
    else if (this.state.sexo == "Selecione...") {
      msgs.push('O campo Sexo é obrigatório.')
    }
    else if (!this.state.dataNascimento) {
      msgs.push('O campo Data de Nascimento é obrigatório.')
    }

    else if (!this.state.raca) {
      msgs.push('O campo Raça é obrigatório.')
    }

    else if (!this.state.especie) {
      msgs.push('O campo Espécie é obrigatório.')
    }
    else if (this.state.especie == "Selecione...") {
      msgs.push('O campo Espécie é obrigatório.')
    }

    else if (!this.state.porte) {
      msgs.push('O campo Porte é obrigatório.')
    }
    else if (this.state.porte == "Selecione...") {
      msgs.push('O campo Porte é obrigatório.')
    }

    else if (!this.state.cor) {
      msgs.push('O campo Cor é obrigatório.')
    }

    else if (!this.state.idCliente) {
      msgs.push('Um cliente deve ser selecionado.')
    }

    return msgs
  }

  selectAction = async (cliente) => {
    await this.setState({ idCliente: cliente.id })
    console.log(this.state.idCliente)

  }

  buscarCliente = () => {
    this.clienteService.obterPorNomeCpfTelefone(this.state.busca)
      .then(resposta => {
        this.setState({ clientes: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  buscarProprietario = () => {
    this.clienteService.obterPorId(this.props.state.cliente.id)
      .then(resposta => {
        this.setState({ clientes: [resposta.data] })
      }).catch(error => {
        console.log(error)
      })
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return false;
    }

    const { nome, sexo, dataNascimento, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente } = this.state;
    const animal = { nome, sexo, dataNascimento, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente };

    this.service.salvar(animal)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
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



    const { id, nome, sexo, dataNascimento, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente } = this.state;
    const animal = { id, nome, sexo, dataNascimento, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente };
    console.log(animal.idCliente)


    this.service.editar(this.state.id, animal)
      .then(response => {
        mensagemSucesso(response)
        //this.props.history.push('/login')
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }

  render() {


    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 col-xxl-5">
            <FormGroup id="inputNome" label="Nome do animal: *">
              <input type="text" className="form-control"
                value={this.state.nome}
                name="nome"
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 col-xxl-3">
            <FormGroup id="inputSexo" label="Sexo: *">
              <SelectMenu className="form-control" lista={this.service.obterSexos()}
                value={this.state.sexo}
                name="sexo"
                onChange={this.handleChange}
                style={{ minWidth: '5rem' }} />
            </FormGroup>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
            <FormGroup id="inputDataNascimento" label="Data de nascimento: *">
              <input id="dataNascimento" max={this.getTodayDate()} type="date" className="form-control"
                value={moment(this.state.dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD")}
                onChange={async e => {
                  await this.setState({
                    dataNascimento: moment(e.target.value, "YYYY-MM-DD").format("DD/MM/YYYY")
                  })
                  console.log(this.state.dataNascimento)
                }}

                             /* TODO pattern=""*/ required />
            </FormGroup>

          </div>

          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 col-xxl-3">
            <FormGroup id="inputRaca" label="Raça: *">
              <input type="text" className="form-control"
                value={this.state.raca}
                name="raca"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6  col-xxl-3">
            <FormGroup id="inputEspecie" label="Espécie: *">
              <SelectMenu className="form-control" lista={this.state.especies}
                value={this.state.especie}
                name="especie"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 col-xxl-3">
            <FormGroup id="inputPorte" label="Porte: *">
              <SelectMenu className="form-control" lista={this.service.obterPortes()}
                value={this.state.porte}
                name="porte"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 col-xxl-3">
            <FormGroup id="inputCor" label="Cor: *">
              <input type="text" className="form-control"
                value={this.state.cor}
                name="cor"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <FormGroup id="inputAlergia" label="Alergias: ">
              <textarea value={this.state.alergias} class="form-control" name="alergias" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-12 col-lg-4">
            <FormGroup id="inputPatologias" label="Patologias: ">
              <textarea value={this.state.patologias} class="form-control" name="patologias" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-12 col-lg-4">
            <FormGroup id="inputMedicamentos" label="Medicamentos: ">
              <textarea value={this.state.medicamentos} class="form-control" name="medicamentos" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <FormGroup id="inputCliente" label="Pesquise o cliente: *">
              <div className="input-group mb-4">
                <div className="form-outline col-sm-9 col-lg-4">
                  <input id="search-input" placeholder="Nome/Telefone/CPF" name="busca" onChange={this.handleChange} type="search" className="form-control" />
                </div>
                <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscarCliente}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className=" col-12">
            <ClienteTable telaAnimal={true} selecionado={this.state.idClienteSelecionado} selectAction={this.selectAction} clientes={this.state.clientes} />
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="p-1">
              <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
            </div>
          </div>
        </div>
      </div >


    )
  }
}

export default withRouter(CadastroAnimal)