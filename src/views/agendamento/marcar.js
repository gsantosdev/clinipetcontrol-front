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
    todayDate: ''

  }

  constructor() {
    super();
    this.service = new AgendamentoService();
    this.servicoService = new ServicoService();
    this.animalService = new AnimalService();
    this.funcionarioService = new FuncionarioService();

  }

  getTodayDate() {
    var today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    today.setUTCSeconds(0)
    today = today.toISOString().split(".")[0];
    console.log(today)
    return today;
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


  }

  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      if (key === 'animais' || key === 'funcionarios' || key === 'servicos') {
        this.setState({ [key]: [] })
      }
      else {
        this.setState({ [key]: '' })
      }
    })
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
        this.listarServicos()
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
          <div className="col-md-10 col-xl-6 col-xxl-6">
            <div className="col-md-12 col-xxl-8">
              <FormGroup id="inputDataHorario" label="Data e hora do agendamento *">
                <input type="datetime-local" className="form-control"
                  value={this.state.dataHorario}
                  min={this.getTodayDate()}
                  name="dataHorario"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-md-12 col-xl-12 col-xxl-8">
              <FormGroup id="inputDuracao" label="Duração Aproximada*">
                <SelectMenu lista={this.service.obterDuracoes()} className="form-control"
                  value={this.state.duracaoAprox}
                  name="duracaoAprox"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
          </div>

          <div className="col-sm-12 col-md-12  col-lg-12 col-xl-6 col-xxl-6">
            <FormGroup id="tableServico" fontSize="1.2rem" label="Selecione o serviço*">
              <ServicoTable selectAction={this.selectActionServico} telaAgendamento servicos={this.state.servicos} />
            </FormGroup>
          </div>

        </div>
        <div className="row">
          <div className="col-10">
            <FormGroup fontSize="1.2rem" label="Selecione o animal*">
              <div className="input-group">
                <div className="form-outline col-sm-10 col-md-9 col-lg-9 col-xl-6 col-xxl-4">
                  <input id="search-input" value={this.state.buscaAnimal} placeholder="Nome do animal" name="buscaAnimal" onChange={this.handleChange} type="search" id="form1" className="form-control" />
                </div>
                <div className="col-sm-2 col-md-3 col-lg-3 col-xl-6">
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscarAnimal}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </FormGroup>
            <div>
              <AnimalTable selectAction={this.selectActionAnimal} animais={this.state.animais} telaAgendamento />
            </div>
          </div>
        </div>
        <div className="row pt-4" style={{ marginTop: '4rem' }}>
          <div className="col-10">
            <FormGroup fontSize="1.2rem" label="Selecione o funcionário*">
              <div className="input-group">
                <div className="form-outline col-sm-10 col-md-9 col-lg-9 col-xl-6 col-xxl-4">
                  <input id="search-input" value={this.state.buscaFuncionario} placeholder="Nome/Telefone" name="buscaFuncionario" onChange={this.handleChange} type="search" id="form1" className="form-control" />
                </div>
                <div className="col-sm-2 col-md-3 col-lg-3 col-xl-6">

                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscaFuncionario}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
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