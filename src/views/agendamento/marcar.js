import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormGroup from '../../components/form-group';
import AgendamentoService from '../../app/service/agendamentoService';
import ServicoService from '../../app/service/servicoService';
import ServicoTable from '../servico/servicoTable';
import AnimalTable from '../animal/animalTable';
import FuncionarioTable from '../funcionario/funcionarioTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AnimalService from '../../app/service/animalService';
import FuncionarioService from '../../app/service/funcionarioService';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/selectMenu';

class MarcarAgendamento extends React.Component {


  state = {
    dataHorario: '',
    duracaoAprox: null,
    observacoes: '',
    idServico: null,
    idAnimal: null,
    idFuncionario: null,
    servicos: [],
    animais: [],
    funcionarios: [],
    buscaAnimal: '',
    buscaFuncionario: '',

  }

  constructor() {
    super();
    this.service = new AgendamentoService();
    this.servicoService = new ServicoService();
    this.animalService = new AnimalService();
    this.funcionarioService = new FuncionarioService();
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })

    console.log(value)
  }

  validar() {

  }

  async componentDidMount() {
    this.listarServicos();
    console.log(this.props.state);
    await this.setState(this.props.state);
    console.log(this.state);
  }

  limpaCampos() {

  }



  listarServicos = () => {
    this.servicoService.listar()
      .then(resposta => {
        this.setState({ servicos: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  buscarAnimal = () => {
    this.animalService.obterPorNome(this.state.buscaAnimal)
      .then(resposta => {
        this.setState({ animais: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }


  buscaFuncionario = () => {
    this.funcionarioService.obterPorNomeTelefone(this.state.buscaFuncionario)
      .then(resposta => {
        this.setState({ funcionarios: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }


  agendar = () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }
    console.log(this.state.dataHorario)
    const { dataHorario, duracaoAprox, observacoes, idServico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, duracaoAprox, observacoes, idServico, idAnimal, idFuncionario }

    this.service.salvar(agendamento)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        //this.props.history.push('/login')
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }

  selectActionServico = async (servico) => {
    await this.setState({ idServico: servico.id })
    console.log(this.state.idServico)
  }

  selectActionFuncionario = async (funcionario) => {
    await this.setState({ idFuncionario: funcionario.id })
    console.log(this.state.idFuncionario)

  }

  selectActionAnimal = async (animal) => {
    await this.setState({ idAnimal: animal.id })
    console.log(this.state.idAnimal)

  }



  render() {

    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-6">
            <div className="col-12">
              <FormGroup id="inputDataHorario" label="Data e hora do agendamento *">
                <input type="datetime-local" className="form-control"
                  value={this.state.dataHorario}
                  name="dataHorario"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-12">
              <FormGroup id="inputDuracao" label="Duração Aproximada*">
                <SelectMenu lista={this.service.obterDuracoes()} className="form-control"
                  value={this.state.duracaoAprox}
                  name="duracaoAprox"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 col-lg-6 col-xl-6 col-xxl-6">
            <FormGroup id="tableServico" fontSize="1.2rem" label="Selecione o serviço*">
              <ServicoTable selectAction={this.selectActionServico} telaAgendamento servicos={this.state.servicos} />
            </FormGroup>
          </div>

        </div>
        <div className="row">
          <div className="col-12">
            <FormGroup fontSize="1.2rem" label="Selecione o animal*">
              <div className="input-group">
                <div className="form-outline  col-xl-4 col-xxl-4">
                  <input id="search-input" value={this.state.buscaAnimal} placeholder="Nome do animal" name="buscaAnimal" onChange={this.handleChange} type="search" id="form1" className="form-control" />
                </div>
                <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscarAnimal}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </FormGroup>
            <div>
              <AnimalTable selectAction={this.selectActionAnimal} animais={this.state.animais} telaAgendamento />
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '4rem' }}>
          <div className="col-12">
            <FormGroup fontSize="1.2rem" label="Selecione o funcionário*">
              <div className="input-group">
                <div className="form-outline  col-xl-4 col-xxl-4">
                  <input id="search-input" value={this.state.buscaFuncionario} placeholder="Nome/Telefone" name="buscaFuncionario" onChange={this.handleChange} type="search" id="form1" className="form-control" />
                </div>
                <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscaFuncionario}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </FormGroup>
            <div>
              <FuncionarioTable selectAction={this.selectActionFuncionario} funcionarios={this.state.funcionarios} telaAgendamento />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="mt-5">
              <button style={{ minWidth: '17rem' }} onClick={this.props.editar ? this.editar : this.agendar} type="button" className="btn btn-success">Realizar Agendamento</button>
            </div>
          </div>
        </div>

      </div>
    )
  }

}



export default withRouter(MarcarAgendamento);