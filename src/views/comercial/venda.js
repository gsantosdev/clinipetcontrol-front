import React from "react";

import Card from "../../components/card"
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import FormGroup from "../../components/form-group"
import { faPlus, faRemoveFormat, faSearch, faUserTimes, faWindowClose, faXRay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DadosClienteTable from "./dados-cliente-table";
import ClienteTable from "../cliente/clienteTable";
import ClienteService from "../../app/service/clienteService";
import SelectClienteTable from "./selectClienteTable";
import { Dialog } from "primereact/dialog";


class Venda extends React.Component {


  state = {
    clienteSelecionado: {},
    clientes: [],
    buscaCliente: '',
    venda: {},
    itensVenda: {},
    showTelaAgendamento: false,
    showTelaProduto: false
  }

  constructor() {
    super();
    this.clienteService = new ClienteService();
  }

  abrirTelaAgendamento = () => {
    this.setState({ showTelaAgendamento: true })
  }


  abrirTelaProduto = () => {
    this.setState({ showTelaProduto: true })
  }

  selecionarCliente = (cliente) => {
    this.setState({ clienteSelecionado: cliente })
  }

  deselecionarCliente = async () => {
    await this.setState({ clienteSelecionado: {}, clientes: [] })
    console.log(this.state.clienteSelecionado)
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
          {this.state.clientes.length !== 0 ? <div style={{ backgroundColor: '' }} className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            {Object.keys(this.state.clienteSelecionado).length !== 0 ?
              <Card subtitulo title="Dados do cliente">
                <div>
                  <DadosClienteTable cliente={this.state.clienteSelecionado} />
                  <div className="d-flex justify-content-center">

                    <Button className="btn btn-warning" onClick={this.deselecionarCliente}>Alterar cliente<FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faWindowClose} /></Button>
                  </div>
                </div>
              </Card> : <><h6>Selecione o cliente:</h6><SelectClienteTable clientes={this.state.clientes} selectAction={this.selecionarCliente} /></>}

          </div> : false}

        </div>

        {Object.keys(this.state.clienteSelecionado).length !== 0 ? <div className="row mt-3">
          <div style={{ backgroundColor: '' }}>
            <Card subtitulo title="Itens">
              <div className="d-flex justify-content-center">
                <Button onClick={this.abrirTelaAgendamento}> Adicionar Agendamento <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></Button>
                <div className="d-flex flex-column justify-content-center m-2">OU</div>
                <Button onClick={this.abrirTelaProduto} className="btn btn-success"> Adicionar Produto <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></Button>

              </div>
            </Card>
          </div>


          <div style={{ backgroundColor: '' }}>
            <div className="d-flex justify-content-end mt-5">
              <h4>Total da venda</h4>

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
      </div>
    )
  }



}



export default withRouter(Venda)
