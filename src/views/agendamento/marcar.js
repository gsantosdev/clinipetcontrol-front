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
import Config from "../../config.json"

class MarcarAgendamento extends React.Component {

  state = {
    id: null,
    idLancamento: null,
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
    const dataInicio = new Date(this.state.dataHorario);

    console.log(dataInicio)
  }

  validar() {

    const msgs = []

    const dataInicio = new Date(this.state.dataHorario);

    if (!this.state.dataHorario) {
      msgs.push('O campo de data e hora é obrigatório.')
    }
    else if (!this.state.idServico) {
      msgs.push('Selecione um serviço.')
    }
    else if (this.state.idAnimal == "Selecione...") {
      msgs.push('Selecione um animal.')
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
    else if (!this.state.idServico) {
      msgs.push('Selecione um serviço.')
    }
    return msgs
  }


  buscarPorIdFuncionario = (id) => {
    this.funcionarioService.obterPorId(id)
      .then(resposta => {
        this.setState({ funcionarios: [resposta.data] })
      }).catch(error => {
        console.log(error)
      })
  }



  async componentDidMount() {
    this.listarServicos();
    await this.listarAnimais(this.props.idCliente);
    await this.listarServicos();
    if (this.props.agendamentoAEditar && this.props.editarItem) {
      await this.setState(this.props.agendamentoAEditar.agendamento)
      console.log(this.props.agendamentoAEditar.agendamento.idFuncionario)
      console.log(this.state)

      console.log(this.props.agendamentoAEditar.agendamento.idServico)
      this.buscarPorIdFuncionario(this.props.agendamentoAEditar.agendamento.idFuncionario);
      this.listarServicos();
      await this.setState({ idFuncionarioSelecionado: this.props.agendamentoAEditar.agendamento.idFuncionario })
      await this.setState({ idServicoSelecionado: this.props.agendamentoAEditar.agendamento.idServico })
      console.log("idServicoSelecionado:", this.state.idServicoSelecionado)

    }
    else if (this.props.agendamentoAEditar && this.props.remarcar) {
      await this.setState(this.props.agendamentoAEditar)

      this.setState({ idLancamento: this.props.idLancamento })

      this.setState({ dataHorario: new Date(this.props.agendamentoAEditar.dataHorario).toISOString().substr(0, 16) })
      console.log(this.props.agendamentoAEditar.dataHorario)
      console.log("Remarcar: ", this.props.agendamentoAEditar)
      console.log(this.state)
      this.buscarPorIdFuncionario(this.props.agendamentoAEditar.idFuncionario);
      this.listarServicos();
      await this.setState({ idFuncionarioSelecionado: this.props.agendamentoAEditar.idFuncionario })
      await this.setState({ idServicoSelecionado: this.props.agendamentoAEditar.idServico })
      console.log("idServicoSelecionado:", this.state.idServicoSelecionado)
    }
    
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

  async listarServicos() {
    const servicos = await this.servicoService.getNomesServicos()
    this.setState({ servicos: servicos })
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

    const { dataHorario, observacoes, idServico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, observacoes, idServico, idAnimal, idFuncionario }

    this.service.salvar(agendamento)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        this.listarServicos()
      }).catch(error => {
        mensagemErro(error.response)
      })
  }


  adicionarAgendamento = async () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    await this.servicoService.obterPorId(this.state.idServico).then(response => {
      this.setState({ servico: response.data })
    }).catch(error => {
      mensagemErro(error);
    })


    const { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario }

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

  remarcar = async () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    await this.servicoService.obterPorId(this.state.idServico).then(response => {
      this.setState({ servico: response.data })
    }).catch(error => {
      mensagemErro(error);
    })


    const { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario, idLancamento } = this.state
    const agendamento = { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario, idLancamento }


    await this.service.validarRemarcar(agendamento).then(response => {
      console.log(response)
      this.setState({ agendamentoValido: true })
    }).catch(error => {
      mensagemErro(error.response.data)
      this.setState({ agendamentoValido: false })
    })

    if (this.state.agendamentoValido) {
      this.service.remarcar(this.state.id, agendamento).then(response => {
        mensagemSucesso(response.data)
      }).catch(error => {
        mensagemErro(error.response.data)
      })
    }
    else {
      return false;
    }


  }

  editarItemAgendamento = async () => {

    console.log("Entrou")

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    await this.servicoService.obterPorId(this.state.idServico).then(response => {
      this.setState({ servico: response.data })
    }).catch(error => {
      mensagemErro(error);
    })


    const { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario } = this.state
    const agendamento = { dataHorario, observacoes, idServico, servico, idAnimal, idFuncionario }

    await this.service.validar(agendamento).then(response => {
      console.log(response)
      this.setState({ agendamentoValido: true })
    }).catch(error => {
      mensagemErro(error.response.data)
      this.setState({ agendamentoValido: false })
    })

    if (this.state.agendamentoValido) {
      this.props.editarItemAgendamento(agendamento, this.props.indexAgendamento)
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
      <div className="row mb-3 ">

        <div className="row d-flex justify-content-center">

          <div className="col-sm-12 col-md-12  col-lg-12 col-xl-6 col-xxl-6">
            <FormGroup id="inputAnimal" fontSize="1.2rem" label="Selecione o animal: *">
              <SelectMenu className="form-control" lista={this.state.animais}
                value={this.state.idAnimal}
                name="idAnimal"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-12  col-lg-12 col-xl-6 col-xxl-6">
            <FormGroup id="tableServico" fontSize="1.2rem" label="Selecione o serviço*">
              <SelectMenu className="form-control" lista={this.state.servicos}
                value={this.state.idServico}
                name="idServico"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-12  col-lg-12 col-xl-6 col-xxl-6">
            <FormGroup id="inputDataHorario" fontSize="1.2rem" label="Data e hora do agendamento *">
              <input type="datetime-local" className="form-control"
                value={this.state.dataHorario}
                min={this.getTodayDate()}
                name="dataHorario"
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row" style={{ marginTop: '4rem' }}>
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
            <FuncionarioTable selecionado={this.state.idFuncionarioSelecionado} selectAction={this.selectActionFuncionario} funcionarios={this.state.funcionarios} telaAgendamento />
          </div>
        </div>


        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="mt-5">
              <button style={{ minWidth: '17rem' }} onClick={() => {
                if (this.props.agendar) {
                  return this.agendar()
                }
                else if (this.props.editarItem) {
                  return this.editarItemAgendamento()
                }
                else if (this.props.remarcar) {
                  return this.remarcar()
                }
                else {
                  return this.adicionarAgendamento()
                }
              }}/*onClick={this.props.editar ? this.editar : this.agendar}*/ type="button" className="btn btn-success">
                {this.props.editarItem ? "Atualizar agendamento" : (this.props.remarcar ? "Remarcar agendamento" : "Adicionar agendamento")}

              </button>
            </div>
          </div>
        </div>

      </div>
    )
  }

}



export default withRouter(MarcarAgendamento);