import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ClienteService from '../../app/service/clienteService';
import FormGroup from '../../components/form-group';
import ClienteTable from './clienteTable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import  * as messages from '../../components/toastr'




class ProntuarioCliente extends React.Component {


  state = {
    busca: '',
    clientes: [],
    showConfirmDialog: false,
    clienteADeletar: {}
  }

  constructor() {
    super();
    this.service = new ClienteService();
  }

  abrirConfirmacao = (cliente) => {
    this.setState({ showConfirmDialog: true, clienteADeletar: cliente })
  }

  cancelarDelecao = (cliente) => {
    this.setState({ showConfirmDialog: false, clienteADeletar: cliente })
  }


  buscar = () => {
    this.service.obterPorNomeCpfTelefone(this.state.busca)
      .then(resposta => {
        this.setState({ clientes: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  deletar = () => {
    this.service.deletar(this.state.clienteADeletar.id)
      .then(response => {
        const clientes = this.state.clientes;
        const index = clientes.indexOf(this.state.clienteADeletar)
        clientes.splice(index, 1);
        this.setState({ clientes: clientes, showConfirmDialog: false });
        messages.mensagemSucesso("Cliente deletado com sucesso!")
      }).catch(erro => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o Cliente")
      })
  }



  render() {

    const footerDialog = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
        <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
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
                    <ClienteTable clientes={this.state.clientes} deleteAction={this.abrirConfirmacao} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div>
          <Dialog header=""
            visible={this.state.showConfirmDialog}
            style={{ width: '50vw' }}
            footer={footerDialog}
            modal={true}
            onHide={() => this.setState({ showConfirmDialog: false })}
          > Confirma a exclusão deste Cliente?</Dialog>
        </div>



      </>
    )
  }
}

export default ProntuarioCliente