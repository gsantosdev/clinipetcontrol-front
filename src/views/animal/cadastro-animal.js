import React from 'react'


import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import CpfCnpj from '../../components/inputs/cpfInput'
import SelectMenu from '../../components/selectMenu'
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import AnimalService from '../../app/service/animalService'



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
    idCliente: null
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      this.setState({ [key]: '' })
    })

  }

  constructor(props) {
    super(props);
    this.service = new AnimalService();
  }

  componentDidMount() {
    console.log(this.props.state)
    this.setState(this.props.state)
  }

  validar() {
    const msgs = []

    //Definir validacoes
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


    const animal = {

    }


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
                name="nome"
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
                value={this.state.sexo}
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
              <textarea class="form-control" name="alergias" rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-4">
            <FormGroup id="inputPatologias" label="Patologias: *">
              <textarea class="form-control" name="patologias" rows="4"></textarea>
            </FormGroup>

          </div>
          <div className="col-md-4">
            <FormGroup id="inputMedicamentos" label="Medicamentos: *">
              <textarea class="form-control" name="medicamentos" rows="4"></textarea>
            </FormGroup>

          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <FormGroup id="inputSexo" label="Selecione o cliente: *">
              <SelectMenu className="form-control" lista={[{ label: "Selecione..." }]} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="p-1">
              <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
            </div>
            <div className="p-1">
              <button hidden={this.props.editar} onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div >


    )
  }
}

export default withRouter(CadastroAnimal)