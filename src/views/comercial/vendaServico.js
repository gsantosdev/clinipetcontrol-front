import { faCheck, faPlus, faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
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
import VendaService from "../../app/service/vendaService";

import * as messages from "../../components/toastr"
import { AuthContext } from "../../main/provedorAutenticacao";



class VendaServico extends React.Component {


  state = {
    clienteSelecionado: {},
    clientes: [],
    buscaCliente: '',
    totalVenda: null,
    itensVenda: [],
    showTelaAgendamento: false,
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    agendamentoAEditar: null,
    agendamentoADeletar: null
  }

  constructor(props) {
    super(props);
    this.clienteService = new ClienteService();
    this.servicoService = new ServicoService();
    this.vendaService = new VendaService();

  }

  componentDidMount() {
    console.log(this.context.usuarioAutenticado)
  }


  obterValorTotalVenda() {

    this.setState({ totalVenda: 0 })//Seta pra 0 pra passar por toda a lista novamente

    this.state.itensVenda.forEach(item => {
      if (item.agendamento.idServico !== null || item.venda.idProduto !== null) {

        var idItem;
        if (item.agendamento.idServico === null) {
          idItem = item.venda.idProduto;
        }
        else {
          idItem = item.agendamento.idServico;
        }

        this.servicoService.obterValorVenda(idItem).then(response => {
          console.log("Valor Serviço: ", response.data)

          this.setState({ totalVenda: this.state.totalVenda + response.data });
          console.log("Valor Total: ", this.state.totalVenda)

        });

      }
    })

  }



  abrirTelaAgendamento = () => {
    this.clienteService.obterAnimais(this.state.clienteSelecionado.id).then(() => {
      this.setState({ showTelaAgendamento: true })
    }).catch(error => {
      messages.mensagemErro("O Cliente não possui nenhum animal vinculado.")
      console.log("ERROR", error)
    })
  }

  abrirConfirmacaoEditar = (agendamento, index) => {
    this.setState({ showConfirmDialogEditar: true, agendamentoAEditar: agendamento, indexAgendamento: index })
  }

  abrirConfirmacaoDeletar = (agendamento) => {
    this.setState({ showConfirmDialogDeletar: true, agendamentoADeletar: agendamento })
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialogDeletar: false })
  }

  cancelarEdicao = () => {

    this.setState({ showConfirmDialogEditar: false })
  }

  adicionarItemAgendamento = (agendamento) => {
    this.state.itensVenda.push({ agendamento: agendamento, quantidade: 1 })
    this.setState({ showTelaAgendamento: false, itensVenda: this.state.itensVenda })
    this.obterValorTotalVenda();

    console.log("itensVenda:", this.state.itensVenda)
  }

  editarItemAgendamento = (agendamento) => {
    const itensVenda = this.state.itensVenda;

    const index = itensVenda.indexOf(agendamento)
    console.log("Itens Venda Antes: ", itensVenda);

    itensVenda.splice(index, 1)

    itensVenda.push({ agendamento: agendamento, quantidade: 1 });

    console.log("Itens Venda Atualizado: ", itensVenda);

    this.setState({ itensVenda: itensVenda, showConfirmDialogEditar: false })

    this.obterValorTotalVenda();


  }

  deletarItemAgendamento = (agendamento) => {
    const itensVenda = this.state.itensVenda;

    const index = itensVenda.indexOf(agendamento)
    itensVenda.splice(index, 1)
    this.setState({ itensVenda: itensVenda, showConfirmDialogDeletar: false })
    this.obterValorTotalVenda();

  }

  selecionarCliente = async (cliente) => {
    await this.setState({ clienteSelecionado: cliente })
  }

  deselecionarCliente = async () => {

    await this.setState({ clienteSelecionado: {}, clientes: [], itensVenda: [], totalVenda: null })
    console.log("Cliente selecionado depois: ", this.state.clienteSelecionado);
    console.log("Itens venda: ", this.state.itensVenda);
  }


  buscar = () => {
    this.clienteService.obterPorNomeCpfTelefone(this.state.buscaCliente)
      .then(response => {
        this.setState({ clientes: response.data })
      }).catch(error => {
        console.log(error)
      })
  }

  efetuarVenda = () => {
    const { itensVenda, clienteSelecionado } = this.state
    const venda = { itensVenda, status: "PENDENTE", idCliente: clienteSelecionado.id, idUsuario: this.context.usuarioAutenticado.id }
    console.log(venda);

    this.vendaService.efetuarVendaServico(venda)
      .then(response => {
        messages.mensagemSucesso(response.data)
        this.deselecionarCliente()

      }).catch(error => {

        if (error.response.status === 406) {
          messages.mensagemErro("Não é possível efetuar 2 ou mais agendamentos contendo o mesmo animal ou veterinário no mesmo intervalo")
        }
        else {
          messages.mensagemErro(error.response.data)
        }

      })

  }


  render() {

    const footerDialogDeletar = (
      <div>
        <PrimeButton label="Confirmar" icon="pi pi-check" onClick={this.deletarItemAgendamento} />
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
                      <input id="search-input" maxLength="80" placeholder="Nome/CPF" onChange={e => this.setState({ buscaCliente: e.target.value })} type="search" id="form1" className="form-control" />
                    </div>
                    <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </FormGroup>
              </div>
            </div>
            : false}
          {this.state.clientes.length !== 0 ? <div style={{ backgroundColor: '' }} className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
          {Object.keys(this.state.clienteSelecionado).length !== 0 ? <div className="col-12">
            <div style={{ backgroundColor: '' }}>
              <Card subtitulo title="Itens">
                {Object.keys(this.state.itensVenda).length !== 0 ?
                  <div>
                    <ItemTable editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} itensVenda={this.state.itensVenda} />
                  </div>
                  : false}
                <div className="d-flex justify-content-center">
                  <BootstrapButton onClick={this.abrirTelaAgendamento}> Adicionar Agendamento <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></BootstrapButton>
                </div>
              </Card>
            </div>

            {Object.keys(this.state.itensVenda).length !== 0 ?
              <div style={{ backgroundColor: '' }}>
                <div className="d-flex justify-content-end mt-5">
                  <h4>Total estimado:  {parseFloat(this.state.totalVenda).toFixed(2) + " R$"} </h4>

                </div>
              </div> : false}
          </div> : false}

        </div>

        {Object.keys(this.state.itensVenda).length !== 0 ?
          <div className="d-flex justify-content-end mt-5">
            <PrimeButton onClick={this.efetuarVenda}> Cadastrar ordem de serviço <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faCheck} /></PrimeButton>

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
            <MarcarAgendamento idCliente={this.state.clienteSelecionado.id} adicionarAgendamento={this.adicionarItemAgendamento} />
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
          onHide={() => {
            this.cancelarEdicao();
            this.obterValorTotalVenda();
          }}>
          <Card title="Atualizar agendamento">
            <MarcarAgendamento editar idCliente={this.state.clienteSelecionado.id} editarAgendamento={this.editarItemAgendamento} agendamentoAEditar={this.state.agendamentoAEditar} />
          </Card>
        </Dialog>
      </div>
    )
  }



}

VendaServico.contextType = AuthContext



export default withRouter(VendaServico)
