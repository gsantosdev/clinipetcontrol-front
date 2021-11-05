import { faEye, faEyeSlash, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "@testing-library/react";
import React from "react";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"
import LancamentosPaymentTable from "./lancamentos-payment-table";

class VisualizarCaixa extends React.Component {

  state = {
    valorCaixa: null,
    eye: faEyeSlash,
    lancamentosOrdenados: []
  }

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
  }
  componentDidMount() {
    this.setState({ eye: faEyeSlash })
    console.log(this.state.eye)
  }

  buscarLancamentosOrdenados = () => {
    this.lancamentoService.getLancamentosOrdenados().then(response => {
      this.setState({ lancamentosOrdenados: response.data })
    }).catch(error => {
      if (error.response.status == 404) {
        this.setState({ lancamentosOrdenados: [] })
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

  getValorCaixa() {
    this.lancamentoService.getSaldoCaixa()
      .then(response => {
        this.setState({ valorCaixa: response.data })
        console.log("Caixa: ", response.data)
      }).catch(error => {
        messages.mensagemErro(error.response)
      })
  }

  componentDidMount() {
    this.getValorCaixa();
    this.buscarLancamentosOrdenados();
  }

  atualizaStatusAction = (status, id) => {

    const statusBody = { status: status }

    this.lancamentoService.atualizar(statusBody, id).then(response => {
      messages.mensagemSucesso("Status atualizado com sucesso!")
      this.buscarLancamentosOrdenados()
      this.getValorCaixa()
    }).catch(error => {
      messages.mensagemErro(error.response)
    })

  }


  render() {
    return (

      <>
        <div className="d-flex justify-content-center"><h1>R$ {this.state.eye === faEyeSlash ? "**" : this.state.valorCaixa} <FontAwesomeIcon className="ml-2" onClick={this.changeEye} icon={this.state.eye} /></h1></div>
        <div className="mt-5">
          <LancamentosPaymentTable atualizaStatusAction={this.atualizaStatusAction} lancamentos={this.state.lancamentosOrdenados} />
        </div>
      </>
    )
  }

}


export default VisualizarCaixa