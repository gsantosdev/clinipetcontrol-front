import { faEye, faEyeSlash, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "@testing-library/react";
import React from "react";
import Card from "../../components/card";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"
import LancamentosAReceberTable from "./lancamentos-receitas-table";
import LancamentosAPagarTable from "./lancamentos-despesas-table";

class VisualizarCaixa extends React.Component {

  state = {
    valorCaixa: null,
    eye: faEyeSlash,
    lancamentosReceitaOrdenados: [],
    lancamentosDespesaOrdenados: []

  }

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
  }
  componentDidMount() {
    this.setState({ eye: faEyeSlash })
    console.log(this.state.eye)
  }

  buscarLancamentosReceitaOrdenados = () => {
    this.lancamentoService.getLancamentosReceitaOrdenados().then(response => {
      this.setState({ lancamentosReceitaOrdenados: response.data })
    }).catch(error => {
      if (error.response.status == 404) {
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
      if (error.response.status == 404) {
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
    this.buscarLancamentosReceitaOrdenados();
    this.buscarLancamentosDespesaOrdenados();
  }

  atualizaStatusAction = (status, id) => {

    const statusBody = { status: status }

    this.lancamentoService.atualizar(statusBody, id).then(response => {
      messages.mensagemSucesso("Status atualizado com sucesso!")
      this.buscarLancamentosReceitaOrdenados()
      this.buscarLancamentosDespesaOrdenados()
      this.getValorCaixa()
    }).catch(error => {
      messages.mensagemErro(error.response)
    })

  }


  render() {
    return (
      <>
        <div className="d-flex justify-content-center"><h1>R$ {this.state.eye === faEyeSlash ? "**" : parseFloat(this.state.valorCaixa).toFixed(2)} <FontAwesomeIcon className="ml-2" onClick={this.changeEye} icon={this.state.eye} /></h1></div>
        <div className="col-12 mt-5">
          <Card title="Contas a receber">
            <LancamentosAReceberTable atualizaStatusAction={this.atualizaStatusAction} lancamentos={this.state.lancamentosReceitaOrdenados} />
          </Card>
        </div>
        <div className="col-12 mt-5">
          <Card title="Contas a pagar">
            <LancamentosAPagarTable atualizaStatusAction={this.atualizaStatusAction} lancamentos={this.state.lancamentosDespesaOrdenados} />
          </Card>
        </div>
      </>
    )
  }

}


export default VisualizarCaixa