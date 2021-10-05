import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import UsuarioService from '../../app/service/usuarioService';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import * as messages from '../../components/toastr';
import UsuarioTable from './usuario-table';
import CadastroUsuario from './cadastro-usuario';


class ProntuarioUsuario extends React.Component {


  state = {
    busca: '',
    usuarios: [],
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    usuarioADeletar: {},
    usuarioAEditar: {},
    message: ''
  }

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  abrirConfirmacaoEditar = (usuario) => {
    this.setState({ showConfirmDialogEditar: true, usuarioAEditar: usuario })
  }

  abrirConfirmacaoDeletar = (usuario) => {
    this.setState({ showConfirmDialogDeletar: true, usuarioADeletar: usuario })
  }

  cancelarDelecao = (usuario) => {
    this.setState({ showConfirmDialogDeletar: false, usuarioADeletar: usuario })
  }
  cancelarEdicao = async (usuario) => {
    await this.buscar()
    this.setState({ showConfirmDialogEditar: false, usuarioAEditar: usuario })
  }


  buscar = () => {
    this.service.obterPorNome(this.state.busca)
      .then(resposta => {
        this.setState({ usuarios: resposta.data })
      }).catch(error => {
        this.setState({ usuarios: [] })

        console.log(error)
      })
  }

  voltar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  deletar = () => {
    this.service.deletar(this.state.usuarioADeletar.id)
      .then(response => {
        const usuarios = this.state.usuarios;
        const index = usuarios.indexOf(this.state.usuarioADeletar)
        usuarios.splice(index, 1);
        this.setState({ usuarios: usuarios, showConfirmDialogDeletar: false });
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
          <div className="row mb-3">
            <div>
              <FormGroup label="Pesquisar Usuario">
                <div className="input-group">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-sm-10 col-md-8 col-lg-5 col-xl-4 col-xxl-3">
                    <input id="search-input" placeholder="Nome" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

              <div>
                <UsuarioTable usuarios={this.state.usuarios} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
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
            Deseja excluir o usuario?
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
            <Card title="Atualize os dados do usuario">
              <CadastroUsuario editar={true} state={this.state.usuarioAEditar} />
            </Card>
          </Dialog>
        </div>



      </>
    )
  }
}

export default ProntuarioUsuario