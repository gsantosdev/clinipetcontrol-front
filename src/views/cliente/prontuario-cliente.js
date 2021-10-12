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
  cancelarEdicao = async (cliente) => {
    await this.buscar()
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
        messages.mensagemErro(erro.response.data)
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
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarEdicao} />
      </div>
    );


    return (
      <>
        <div className="p-3">
          <div className="row">
            <div className="col-12 mb-3">
              <FormGroup label="Pesquisar Cliente">
                <div className="input-group">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-11 col-sm-11 col-md-11 col-lg-8 col-xl-8 col-xxl-5">
                    <input id="search-input" placeholder="Nome/CPF" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

            </div>
            <div>
              <ClienteTable clientes={this.state.clientes} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
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
            onHide={async () => {
              await this.buscar()
              this.setState({ showConfirmDialogEditar: false })


            }}
          >
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