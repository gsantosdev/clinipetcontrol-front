import { faEye, faEyeSlash, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "@testing-library/react";
import React from "react";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"

class VisualizarCaixa extends React.Component {

  state = {
    valorCaixa: null,
    eye: faEyeSlash
  }

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
  }
  componentDidMount() {
    this.setState({ eye: faEyeSlash })
    console.log(this.state.eye)
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
        messages.mensagemErro(error.data)
      })
  }

  componentDidMount() {
    this.getValorCaixa();
  }

  render() {
    return (

      <div className="d-flex justify-content-center"><h1>R$ {this.state.eye === faEyeSlash ? "**" : this.state.valorCaixa} <FontAwesomeIcon className="ml-2" onClick={this.changeEye} icon={this.state.eye} /></h1></div>
    )
  }

}


export default VisualizarCaixa