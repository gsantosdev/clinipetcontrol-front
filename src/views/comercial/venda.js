import { faPlus, faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { Button as PrimeButton } from "primereact/button";

import { withRouter } from "react-router";
import ClienteService from "../../app/service/clienteService";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import DadosClienteTable from "./dados-cliente-table";
import SelectClienteTable from "./selectClienteTable";
import MarcarAgendamento from "../agendamento/marcar";
import ItemTable from "./item-table";
import ServicoService from "../../app/service/servicoService";



class Venda extends React.Component {


  state = {
    clienteSelecionado: {},
    clientes: [],
    buscaCliente: '',
    venda: {},
    totalVenda: null,
    itensVenda: [],
    showTelaAgendamento: false,
    showTelaProduto: false,
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
  }

  constructor() {
    super();
    this.clienteService = new ClienteService();
    this.servicoService = new ServicoService();
  }


  obterValorTotalVenda() {

    this.setState({ totalVenda: 0 })//Seta pra 0 pra passar por toda a lista novamente

    this.state.itensVenda.forEach(item => {
      if (item.agendamento.idServico !== null) {
        this.servicoService.obterValorVenda(item.agendamento.idServico).then(response => {
          console.log("Valor Serviço: ", response.data)

          this.setState({ totalVenda: this.state.totalVenda + response.data });
          console.log("Valor Total: ", this.state.totalVenda)

        });

      }
    })

  }



  abrirTelaAgendamento = () => {
    this.setState({ showTelaAgendamento: true })
  }

  abrirConfirmacaoEditar = () => {
    this.setState({ showConfirmDialogEditar: true })
  }

  abrirConfirmacaoDeletar = () => {
    this.setState({ showConfirmDialogDeletar: true })
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialogDeletar: false })
  }

  cancelarEdicao = () => {

    this.setState({ showConfirmDialogEditar: false })
  }

  adicionarAgendamento = (agendamento) => {

    this.state.itensVenda.push({ agendamento: agendamento, quantidade: 1 })
    this.setState({ showTelaAgendamento: false, itensVenda: this.state.itensVenda })

    this.obterValorTotalVenda()

    console.log("itensVenda:", this.state.itensVenda)
  }


  abrirTelaProduto = () => {
    this.setState({ showTelaProduto: true })
  }

  selecionarCliente = (cliente) => {
    this.setState({ clienteSelecionado: cliente })
  }

  deselecionarCliente = async () => {
    await this.setState({ clienteSelecionado: {}, clientes: [], itensVenda: [], venda: {} })
    console.log("Cliente selecionado: ", this.state.clienteSelecionado);
    console.log("Itens venda: ", this.state.itensVenda);
  }


  buscar = () => {
    this.clienteService.obterPorNomeCpfTelefone(this.state.buscaCliente)
      .then(resposta => {
        this.setState({ clientes: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  criaItemVenda() {

  }


  render() {

    const footerDialogDeletar = (
      <div>
        <PrimeButton label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
        <PrimeButton label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    );

    const footerDialogEditar = (
      <div>
        <PrimeButton style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarEdicao} />
      </div>
    );


    return (
      <div className="row">
        <div className="row">
          {Object.keys(this.state.clienteSelecionado).length === 0 ?
            <div style={{ backgroundColor: '' }} className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
              <div className="mb-3">
                <FormGroup label="Pesquisar Cliente">
                  <div className="input-group">
                    <div style={{ marginLeft: "-1rem" }} className="form-outline col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-8">
                      <input id="search-input" placeholder="Nome/CPF" onChange={e => this.setState({ buscaCliente: e.target.value })} type="search" id="form1" className="form-control" />
                    </div>
                    <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </FormGroup>
              </div>
            </div>
            : false}
          {this.state.clientes.length !== 0 ? <div style={{ backgroundColor: '' }} className="col-12">
            {Object.keys(this.state.clienteSelecionado).length !== 0 ?
              <Card subtitulo title="Dados do cliente">
                <div>
                  <DadosClienteTable cliente={this.state.clienteSelecionado} />
                  <div className="d-flex justify-content-center">

                    <BootstrapButton className="btn btn-warning" onClick={this.deselecionarCliente}>Alterar cliente<FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faWindowClose} /></BootstrapButton>
                  </div>
                </div>
              </Card> : <><h6>Selecione o cliente:</h6><SelectClienteTable clientes={this.state.clientes} selectAction={this.selecionarCliente} /></>}

          </div> : false}

        </div>

        {Object.keys(this.state.clienteSelecionado).length !== 0 ? <div className="row mt-3">
          <div style={{ backgroundColor: '' }}>
            <Card subtitulo title="Itens">
              {Object.keys(this.state.itensVenda).length !== 0 ?
                <div>
                  <ItemTable editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} itensVenda={this.state.itensVenda} />
                </div>
                : false}
              <div className="d-flex justify-content-center">
                <BootstrapButton onClick={this.abrirTelaAgendamento}> Adicionar Agendamento <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></BootstrapButton>
                <div className="d-flex flex-column justify-content-center m-2">OU</div>
                <BootstrapButton onClick={this.abrirTelaProduto} className="btn btn-success"> Adicionar Produto <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></BootstrapButton>

              </div>
            </Card>
          </div>


          <div style={{ backgroundColor: '' }}>
            <div className="d-flex justify-content-end mt-5">
              <h4>Total da venda: {this.state.totalVenda !== null ? this.state.totalVenda + " R$" : false} </h4>

            </div>
          </div>
        </div> : false}

        <Dialog

          onChange={e => this.setState({ showTelaAgendamento: false })}
          visible={this.state.showTelaAgendamento}
          style={{ width: '60vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showTelaAgendamento: false })
          }}
        >
          <Card title="Agendamento">
            <MarcarAgendamento adicionarAgendamento={this.adicionarAgendamento} />
          </Card>
        </Dialog>

        <Dialog

          onChange={e => this.setState({ showTelaProduto: false })}
          visible={this.state.showTelaProduto}
          style={{ width: '60vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showTelaProduto: false })
          }}
        >
          <Card title="Produto">
          </Card>

        </Dialog>
        <Dialog
          visible={this.state.showConfirmDialogDeletar}
          style={{ width: '50vw' }}
          footer={footerDialogDeletar}
          modal={true}
          onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
          Deseja remover o item?
        </Dialog>

        <Dialog
          onChange={e => this.setState({ showConfirmDialogEditar: false })}
          visible={this.state.showConfirmDialogEditar}
          footer={footerDialogEditar}
          style={{ width: '90vw' }}
          modal={true}
          onHide={() => this.cancelarEdicao()}>
          <Card title="Atualize os dados do agendamento">
          </Card>
        </Dialog>
      </div>
    )
  }



}



export default withRouter(Venda)
