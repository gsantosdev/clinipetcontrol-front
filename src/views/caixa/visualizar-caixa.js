import { faEye, faEyeSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import LancamentoService from "../../app/service/lancamentoService";
import Card from "../../components/card";
import FormGroup from '../../components/form-group';
import * as messages from "../../components/toastr";
import { AuthContext } from "../../main/provedorAutenticacao";
import LancamentosAPagarTable from "./lancamentos-despesas-table";
import LancamentosAReceberTable from "./lancamentos-receitas-table";
import LocalStorageService from "../../app/service/localstorageService"
import { gerarPDFCaixa } from '../relatorios/impressao';
import moment from "moment";
import { Dialog } from "primereact/dialog";
import Deposito from "./deposito";
import Sangria from "./sangria";



class VisualizarCaixa extends React.Component {

  state = {
    valorCaixa: null,
    eye: faEyeSlash,
    lancamentosReceitaOrdenados: [],
    lancamentosDespesaOrdenados: [],
    buscaReceita: '',
    showDeposito: false,
    showSangria: false

  }

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  buscarTodosLancamentosReceitaOrdenados = () => {
    this.lancamentoService.getLancamentosReceitaOrdenados().then(response => {
      this.setState({ lancamentosReceitaOrdenados: response.data })
    }).catch(error => {
      if (error.response != null && error.response.status == 404) {
        this.setState({ lancamentosReceitaOrdenados: [] })
      }
      else {
        messages.mensagemErro(error.response)
      }
    })
  }

  buscarLancamentosReceita = () => {
    if (this.state.buscaReceita == '') {
      this.buscarTodosLancamentosReceitaOrdenados()
      return;
    }
    this.lancamentoService.findReceita(this.state.buscaReceita).then(response => {
      this.setState({ lancamentosReceitaOrdenados: response.data })
    }).catch(error => {
      if (error.response != null && error.response.status == 404) {
        this.setState({ lancamentosReceitaOrdenados: [] })
      }
      else {
        messages.mensagemErro(error.response)
      }
    })
  }

  buscarLancamentosDespesaOrdenados = () => {
    this.lancamentoService.getLancamentosDespesaOrdenados().then(response => {
      this.setState({ lancamentosDespesaOrdenados: response.data })
    }).catch(error => {
      if (error.response != null && error.response.status == 404) {
        this.setState({ lancamentosDespesaOrdenados: [] })
      }
      else {
        messages.mensagemErro(error.response)
      }
    })
  }

  changeEye = () => {
    if (this.state.eye == faEyeSlash) {
      this.setState({ eye: faEye })
      console.log(this.state.eye)
    }
    else {
      this.setState({ eye: faEyeSlash })
    }

  }

  getValorCaixa = () => {
    this.lancamentoService.getSaldoCaixa()
      .then(response => {
        this.setState({ valorCaixa: response.data })
        console.log("Caixa: ", response.data)
      }).catch(error => {
        messages.mensagemErro(error.response)
      })
  }

  relatorioFechamentoDeCaixa = () => {

    const idsLancamento = JSON.parse(localStorage.getItem('_lancamento_ids') || '[]');
    const inicioCaixa = LocalStorageService.obterItem('_inicio_caixa');
    const lancamentos = { idsLancamento: idsLancamento, dataInicio: inicioCaixa }

    const saldoInicialCaixa = JSON.parse(localStorage.getItem('_saldo_inicio_caixa') || 0);


    console.log(lancamentos)

    this.lancamentoService.relatorioFechamento(lancamentos).then(response => {

      console.log(response)
      gerarPDFCaixa(saldoInicialCaixa, response.data);


    }).catch(error => {
      console.log(error)

    })

  }

  componentDidMount() {
    this.getValorCaixa();
    this.buscarTodosLancamentosReceitaOrdenados();
    this.buscarLancamentosDespesaOrdenados();
    console.log(this.context.isCaixaOpen)


  }

  atualizaStatusAction = (status, id) => {

    const statusBody = { status: status }

    this.lancamentoService.atualizar(statusBody, id).then(response => {
      messages.mensagemSucesso("Status atualizado com sucesso!")
      this.buscarTodosLancamentosReceitaOrdenados()
      this.buscarLancamentosDespesaOrdenados()
      this.getValorCaixa()
      if (status !== "CANCELADO") {
        const lancamentosIds = JSON.parse(localStorage.getItem('_lancamento_ids') || '[]');
        console.log("lancamentosIds: ", lancamentosIds);
        lancamentosIds.push(id)
        console.log("lancamentosIds: ", lancamentosIds);
        localStorage.setItem("_lancamento_ids", JSON.stringify(lancamentosIds));

      }
    }).catch(error => {
      if (error.response.data != null) {
        messages.mensagemErro(error.response.data)

      }
      else {
        messages.mensagemErro(error.response)
      }
      console.log(error)
    })

  }

  openDeposito = () => {
    this.setState({ showDeposito: true })
  }


  openSangria = () => {
    this.setState({ showSangria: true })
  }

  closeDeposito = () => {
    this.setState({ showDeposito: false })
  }
  closeSangria = () => {
    this.setState({ showSangria: false })
  }


  render() {
    return (
      <>
        {this.context.isCaixaOpen ? <>
          <div className="d-flex justify-content-end mb-3 mt-3">
            <button className="btn btn-info" onClick={this.openDeposito}> Realizar depósito</button>
            <button className="btn btn-warning" onClick={this.openSangria}> Realizar sangria</button>
            <button className="btn btn-danger" onClick={() => {

              this.relatorioFechamentoDeCaixa()
              this.context.fecharCaixa()
              localStorage.removeItem('_inicio_caixa');
              localStorage.removeItem('_saldo_inicio_caixa');



            }}> Fechar Caixa</button>

          </div>
          <div className="d-flex justify-content-center"><h1>R$ {this.state.eye === faEyeSlash ? "**" : parseFloat(this.state.valorCaixa).toFixed(2)} <FontAwesomeIcon className="ml-2" onClick={this.changeEye} icon={this.state.eye} /></h1></div>

          <div className="col-12 mt-5">
            <Card title="Contas a receber">
              <FormGroup id="inputCliente" label="Pesquise a receita: *">
                <div className="input-group mb-4">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-10 col-sm-11 col-md-11 col-lg-8 col-xl-8 col-xxl-5">
                    <input maxLength="80" id="search-input" placeholder="Nº Venda/CPF/CNPJ" name="buscaReceita" onChange={this.handleChange} type="search" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscarLancamentosReceita}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>
              <LancamentosAReceberTable atualizaStatusAction={this.atualizaStatusAction} lancamentos={this.state.lancamentosReceitaOrdenados} />
            </Card>
          </div>
          <div className="col-12 mt-5">
            <Card title="Contas a pagar">
              <LancamentosAPagarTable atualizaStatusAction={this.atualizaStatusAction} lancamentos={this.state.lancamentosDespesaOrdenados} />
            </Card>
          </div>
        </> :
          <>
            <div className="d-flex justify-content-center mb-3">
              <div className="d-flex justify-content-center"><h1>R$ {this.state.eye === faEyeSlash ? "**" : parseFloat(this.state.valorCaixa).toFixed(2)} <FontAwesomeIcon className="ml-2" onClick={this.changeEye} icon={this.state.eye} /></h1></div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success" onClick={e => {
                this.context.abrirCaixa()
                LocalStorageService.adicionarItem('_inicio_caixa', moment().local());
                LocalStorageService.adicionarItem('_saldo_inicio_caixa', this.state.valorCaixa);




              }}>Abrir Caixa</button></div>
          </>}

        <Dialog
          visible={this.state.showDeposito}
          style={{ width: '50vw' }}
          modal={true}
          onHide={() => {
            this.setState({ showDeposito: false })
            this.getValorCaixa();
          }
          }>
          <Deposito closeDeposito={this.closeDeposito} getValorCaixa={this.getValorCaixa} />
        </Dialog>

        <Dialog
          visible={this.state.showSangria}
          style={{ width: '50vw' }}
          modal={true}
          onHide={() => {
            this.setState({ showSangria: false })
            this.getValorCaixa();
          }}>
          <Sangria closeSangria={this.closeSangria} getValorCaixa={this.getValorCaixa} />
        </Dialog>

      </>
    )
  }

}



VisualizarCaixa.contextType = AuthContext

export default VisualizarCaixa