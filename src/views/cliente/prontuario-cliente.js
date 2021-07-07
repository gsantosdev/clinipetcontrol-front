import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ClienteService from '../../app/service/clienteService';
import FormGroup from '../../components/form-group';
import ClienteTable from './clienteTable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Card from '../../components/card'

import * as messages from '../../components/toastr'
import CadastroCliente from './cadastro-cliente';




class ProntuarioCliente extends React.Component {


  state = {
    busca: '',
    clientes: [],
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    clienteADeletar: {},
    clienteAEditar: {},
    message: ''
  }

  constructor() {
    super();
    this.service = new ClienteService();
  }

  abrirConfirmacaoEditar = (cliente) => {
    this.setState({ showConfirmDialogEditar: true, clienteAEditar: cliente })
  }

  abrirConfirmacaoDeletar = (cliente) => {
    this.setState({ showConfirmDialogDeletar: true, clienteADeletar: cliente })
  }

  cancelarDelecao = (cliente) => {
    this.setState({ showConfirmDialogDeletar: false, clienteADeletar: cliente })
  }
  cancelarEdicao = (cliente) => {
    this.setState({ showConfirmDialogEditar: false, clienteAEditar: cliente })
  }


  buscar = () => {
    this.service.obterPorNomeCpfTelefone(this.state.busca)
      .then(resposta => {
        this.setState({ clientes: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  voltar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  deletar = () => {
    this.service.deletar(this.state.clienteADeletar.id)
      .then(response => {
        const clientes = this.state.clientes;
        const index = clientes.indexOf(this.state.clienteADeletar)
        clientes.splice(index, 1);
        this.setState({ clientes: clientes, showConfirmDialogDeletar: false });
        messages.mensagemSucesso("Cliente deletado com sucesso!")
      }).catch(erro => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o Cliente")
      })
  }



  render() {

    const footerDialogDeletar = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
        <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    );

    const footerDialogEditar = (
      <div>
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={e => this.setState({ showConfirmDialogEditar: false })} />
      </div>
    );


    return (
      <>
        <div className="p-3">
          <div className="d-flex flex-row p-3">
            <div className="col-md-12">
              <FormGroup label="Pesquisar Cliente">
                <div className="input-group">
                  <div className="form-outline">
                    <input id="search-input" placeholder="Nome/Telefone/CPF" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

              <div className="row">
                <div className="col-md-12">
                  <div className="bs-component">
                    <ClienteTable clientes={this.state.clientes} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div>
          <Dialog
            visible={this.state.showConfirmDialogDeletar}
            style={{ width: '50vw' }}
            footer={footerDialogDeletar}
            modal={true}
            onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
            Deseja excluir o cliente?
          </Dialog>

          <Dialog

            onChange={e => this.setState({ showConfirmDialogEditar: false })}
            visible={this.state.showConfirmDialogEditar}
            style={{ width: '60vw' }}
            footer={footerDialogEditar}
            modal={true}
            onHide={() => this.setState({ showConfirmDialogEditar: false })}>
            <Card title="Atualize os dados do cliente">
              <CadastroCliente editar={true} state={this.state.clienteAEditar} />
            </Card>
          </Dialog>
        </div>



      </>
    )
  }
}

export default ProntuarioCliente