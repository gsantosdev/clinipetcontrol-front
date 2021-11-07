import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import FormGroup from "../../components/form-group";
import { withRouter } from "react-router";
import VendaService from "../../app/service/vendaService";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"
import OrdemServicoTable from "./ordemServicoTable";

class ProntuarioOrdemServico extends React.Component {

  constructor(props) {
    super(props);
    this.vendaService = new VendaService();
    this.lancamentoService = new LancamentoService();
  }

  state = {
    buscaCliente: '',
    ordens: [],
  }

  buscarOrdens = () => {
    this.vendaService.listarOrdensPorCliente(this.state.buscaCliente)
      .then(response => {
        if (response.status == 204) {
          if (this.state.ordens.length === 1) {
            this.setState({ ordens: [] })

          } else {
            messages.mensagemAlerta("Nenhuma ordem em aberto foi encontrada!")
            this.setState({ ordens: [] })
          }

        }
        else {
          this.setState({ ordens: response.data })

        }
      }).catch(error => {
        console.log(error.response)
        if (error.response.status == 400) {
          messages.mensagemErro(error.response.data)
        }
      })
  }

  atualizaStatusAction = (status, id) => {

    const statusBody = { status: status }

    this.lancamentoService.atualizar(statusBody, id).then(response => {
      messages.mensagemSucesso("Status atualizado com sucesso!")
      this.buscarOrdens();
    }).catch(error => {
      messages.mensagemErro(error.response.data)
    })

  }


  render() {
    return (
      <div className="row">
        <div style={{ backgroundColor: '' }} className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
          <div className="mb-3">
            <FormGroup label="Pesquisar Cliente">
              <div className="input-group">
                <div style={{ marginLeft: "-1rem" }} className="form-outline col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-8">
                  <input id="search-input" maxLength="80" placeholder="Nome/CPF" onChange={e => this.setState({ buscaCliente: e.target.value })} type="search" id="form1" className="form-control" />
                </div>
                <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscarOrdens}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </FormGroup>
          </div>
        </div>

        <div>
          <OrdemServicoTable atualizaStatusAction={this.atualizaStatusAction} ordens={this.state.ordens} />
        </div>
      </div>
    )

  }
}


export default withRouter(ProntuarioOrdemServico)