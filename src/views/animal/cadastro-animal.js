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



class CadastroAnimal extends React.Component {


  state = {
    id: null,
    nome: '',
    sexo: '',
    idade: '',
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
    clienteProprietario: '',
    selecionado: false
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      if (key === "clientes") {
        this.setState({ [key]: [] })

      }
      else {
        this.setState({ [key]: '' })
      }


    })

  }

  constructor(props) {
    super(props);
    this.service = new AnimalService();
    this.clienteService = new ClienteService();
  }

  async componentDidMount() {
    if (this.props.editar) {
      console.log(this.props.state.cliente.id)
      this.buscarProprietario(this.props.state.cliente.id);
      this.setState({ selecionado: true })
      await this.setState({ idCliente: this.props.state.cliente.id })
    }
    console.log(this.props.state);
    await this.setState(this.props.state);
    console.log(this.state);

  }

  validar() {
    const msgs = []

    //Definir validacoes
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


    const { nome, sexo, idade, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente } = this.state;
    const animal = { nome, sexo, idade, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente };


    this.service.salvar(animal)
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



    const { id, nome, sexo, idade, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente } = this.state;
    const animal = { id, nome, sexo, idade, raca, especie, porte, cor, alergias, patologias, medicamentos, idCliente };
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
          <div className="col-md-3">
            <FormGroup id="inputNome" label="Nome do animal: *">
              <input type="text" className="form-control"
                value={this.state.nome}
                name="nome"
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
            <FormGroup id="inputIdade" label="Idade: *">
              <input type="number" min="0" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} className="form-control"
                value={this.state.idade}
                name="idade"
                onChange={this.handleChange} />
            </FormGroup>
          </div>

          <div className="col-md-2">
            <FormGroup id="inputRaca" label="Raça: *">
              <input type="text" className="form-control"
                value={this.state.raca}
                name="raca"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-2">
            <FormGroup id="inputEspecie" label="Espécie: *">
              <input type="text" className="form-control"
                value={this.state.especie}
                name="especie"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-1">
            <FormGroup id="inputPorte" label="Porte: *">
              <SelectMenu className="form-control" lista={this.service.obterPortes()}
                value={this.state.porte}
                name="porte"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-2">
            <FormGroup id="inputCor" label="Cor: *">
              <input type="text" className="form-control"
                value={this.state.cor}
                name="cor"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputAlergia" label="Alergias: *">
              <textarea value={this.state.alergias} class="form-control" name="alergias" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-4">
            <FormGroup id="inputPatologias" label="Patologias: *">
              <textarea value={this.state.patologias} class="form-control" name="patologias" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-4">
            <FormGroup id="inputMedicamentos" label="Medicamentos: *">
              <textarea value={this.state.medicamentos} class="form-control" name="medicamentos" onChange={this.handleChange} rows="4"></textarea>
            </FormGroup>

          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputCliente" label="Pesquise o cliente: *">
              <div className="input-group mb-4">
                <div className="form-outline">
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
          <div className="col-md-5">
            <ClienteTable telaAnimal={true} selecionado={this.state.selecionado} selectAction={this.selectAction} clientes={this.state.clientes} />
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="p-1">
              <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
            </div>
            <div className="p-1">
              <button hidden={!this.props.editar} onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div >


    )
  }
}

export default withRouter(CadastroAnimal)