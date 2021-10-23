import { render } from "@testing-library/react";
import React from "react";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"

class VisualizarCaixa extends React.Component {

  state = {
    valorCaixa: null
  }

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
  }

  getValorCaixa() {
    this.lancamentoService.getSaldoCaixa()
      .then(response => {
        this.setState({ valorCaixa: response.data })
        console.log("Caixa: ", response.data)
      }).catch(error => {
        messages.mensagemErro(error.data)
      })
  }

  componentDidMount() {
    this.getValorCaixa();
  }

  render() {
    return (
      <div>R$ {this.state.valorCaixa}</div>
    )
  }

}


export default VisualizarCaixa