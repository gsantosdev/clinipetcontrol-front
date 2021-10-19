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
import ClienteService from '../../app/service/clienteService';

class MarcarAgendamento extends React.Component {

  state = {
    agendamentoValido: true,
    dataHorario: '',
    duracaoAprox: null,
    observacoes: '',
    idServico: null,
    servico: {},
    idAnimal: null,
    idFuncionario: null,
    servicos: [],
    animais: [],
    funcionarios: [],
    buscaAnimal: '',
    buscaFuncionario: '',
    todayDate: ''
  }

  constructor(props) {
    super(props);
    this.service = new AgendamentoService();
    this.servicoService = new ServicoService();
    this.animalService = new AnimalService();
    this.funcionarioService = new FuncionarioService();
    this.clienteService = new ClienteService();

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

    const msgs = []

    if (!this.state.dataHorario) {
      msgs.push('O campo de data e hora é obrigatório.')
    }
    else if (!this.state.duracaoAprox) {
      msgs.push('O campo de duração aproximada é obrigatório.')
    }
    else if (this.state.duracaoAprox === "Selecione...") {
      msgs.push('Selecione uma duração aproximada válida.')
    }
    else if (!this.state.idServico) {
      msgs.push('Selecione um serviço.')
    }
    else if (!this.state.idAnimal) {
      msgs.push('Selecione um animal.')
    }
    else if (this.state.idAnimal == "Selecione...") {
      msgs.push('Selecione um animal.')
    }
    else if (!this.state.idFuncionario) {
      msgs.push('Selecione um funcionário.')
    }
    return msgs
  }

  async componentDidMount() {
    this.listarServicos();
    await this.listarAnimais(this.props.idCliente);
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

  async listarAnimais(id) {
    const animais = await this.clienteService.getAnimais(id)
    this.setState({ animais: animais })
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
    const { dataHorario, duracaoAprox, observacoes, idServico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, duracaoAprox, observacoes, idServico, idAnimal, idFuncionario }

    this.service.salvar(agendamento)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        this.listarServicos()
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }


  adicionarAgendamento = async () => {
    const msgs = this.validar()


    await this.servicoService.obterPorId(this.state.idServico).then(response => {
      this.setState({ servico: response.data })
    }).catch(error => {
      mensagemErro(error);
    })

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    const { dataHorario, duracaoAprox, observacoes, idServico, servico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, duracaoAprox, observacoes, idServico, servico, idAnimal, idFuncionario }

    await this.service.validar(agendamento).then(response => {
      console.log(response)
      this.setState({ agendamentoValido: true })
    }).catch(error => {
      mensagemErro(error.response.data)
      this.setState({ agendamentoValido: false })
    })


    if (this.state.agendamentoValido) {
      this.props.adicionarAgendamento(agendamento)
    }
    else {
      return false;
    }
  }


  selectActionServico = async (servico) => {
    await this.setState({ idServico: servico.id })
  }

  selectActionFuncionario = async (funcionario) => {
    await this.setState({ idFuncionario: funcionario.id })
  }

  selectActionAnimal = async (animal) => {
    await this.setState({ idAnimal: animal.id })
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

          <div className="pt-2 col-sm-12 col-md-12  col-lg-12 col-xl-6 col-xxl-6">
            <FormGroup id="tableServico" fontSize="1.2rem" label="Selecione o serviço*">
              <ServicoTable selectAction={this.selectActionServico} telaAgendamento servicos={this.state.servicos} />
            </FormGroup>
          </div>

        </div>


        <div className="row">

          <div className="col-12">
            <FormGroup id="inputEspecie" label="Selecione o animal: *">
              <SelectMenu className="form-control" lista={this.state.animais}
                value={this.state.idAnimal}
                name="idAnimal"
                onChange={this.handleChange} />
            </FormGroup>
          </div>

        </div>
        <div className="row pt-4" style={{ marginTop: '4rem' }}>
          <div className="col-12">
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
              <button style={{ minWidth: '17rem' }} onClick={() => {
                if (this.props.editar) {
                  return this.editar
                }
                else if (this.props.agendar) {
                  return this.agendar()
                }
                else {
                  return this.adicionarAgendamento()
                }
              }}/*onClick={this.props.editar ? this.editar : this.agendar}*/ type="button" className="btn btn-success">Adicionar agendamento</button>
            </div>
          </div>
        </div>

      </div>
    )
  }

}



export default withRouter(MarcarAgendamento);