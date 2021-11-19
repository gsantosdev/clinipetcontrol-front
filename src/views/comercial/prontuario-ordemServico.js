import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import FormGroup from "../../components/form-group";
import { withRouter } from "react-router";
import VendaService from "../../app/service/vendaService";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"
import OrdemServicoTable from "./ordemServicoTable";
import MarcarAgendamento from "../agendamento/marcar";
import { Dialog } from "primereact/dialog";
import Card from "../../components/card";
import { Button } from "primereact/button";

class ProntuarioOrdemServico extends React.Component {

  constructor(props) {
    super(props);
    this.vendaService = new VendaService();
    this.lancamentoService = new LancamentoService();
  }

  state = {
    buscaCliente: '',
    ordens: [],
    showConfirmDialogRemarcar: false,
    agendamentoAEditar: {},
    idClienteAgendamento: null
  }

  cancelarDesmarcar = () => {
    this.setState({ showConfirmDialogRemarcar: false })
    this.buscarOrdens();
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

  showConfirmDialogRemarcar = async (agendamento, idLancamento) => {
    console.log("AG", agendamento, "idLancamento", idLancamento)
    await this.setState({ idClienteAgendamento: agendamento.idCliente, idLancamento: idLancamento })

    this.setState({ showConfirmDialogRemarcar: true, agendamentoAEditar: agendamento })
  }


  render() {

    const footerDialogEditar = (
      <div>
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarDesmarcar} />
      </div>
    );

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
          <OrdemServicoTable remarcaAgendamentoAction={this.showConfirmDialogRemarcar} atualizaStatusAction={this.atualizaStatusAction} ordens={this.state.ordens} />
        </div>


        <Dialog
          onChange={e => this.setState({ showConfirmDialogRemarcar: false })}
          visible={this.state.showConfirmDialogRemarcar}
          footer={footerDialogEditar}
          style={{ width: '90vw' }}
          modal={true}
          onHide={() => {
            this.cancelarDesmarcar()

          }}>
          <Card title="Remarcar agendamento">
            <MarcarAgendamento idCliente={this.state.idClienteAgendamento} remarcar agendamentoAEditar={this.state.agendamentoAEditar} idLancamento={this.state.idLancamento} />
          </Card>
        </Dialog>
      </div >

    )

  }
}


export default withRouter(ProntuarioOrdemServico)