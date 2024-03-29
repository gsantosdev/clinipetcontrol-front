import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FuncionarioService from '../../app/service/funcionarioService';
import FormGroup from '../../components/form-group';
import FuncionarioTable from './funcionarioTable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Card from '../../components/card'

import * as messages from '../../components/toastr'
import CadastroFuncionario from './cadastro-funcionario';




class ProntuarioFuncionario extends React.Component {


  state = {
    busca: '',
    funcionarios: [],
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    funcionarioADeletar: {},
    funcionarioAEditar: {},
    message: ''
  }

  constructor() {
    super();
    this.service = new FuncionarioService();
  }

  abrirConfirmacaoEditar = (funcionario) => {
    this.setState({ showConfirmDialogEditar: true, funcionarioAEditar: funcionario })
  }

  abrirConfirmacaoDeletar = (funcionario) => {
    this.setState({ showConfirmDialogDeletar: true, funcionarioADeletar: funcionario })
  }

  cancelarDelecao = (funcionario) => {
    this.setState({ showConfirmDialogDeletar: false, funcionarioADeletar: funcionario })
  }
  cancelarEdicao = async (funcionario) => {
    await this.buscar()
    this.setState({ showConfirmDialogEditar: false, funcionarioAEditar: funcionario })
  }


  buscar = () => {
    this.service.obterPorNomeTelefone(this.state.busca)
      .then(resposta => {
        this.setState({ funcionarios: resposta.data })

      }).catch(error => {
        console.log(error)
      })

    console.log(this.state.funcionarios)
  }

  voltar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  deletar = () => {
    this.service.deletar(this.state.funcionarioADeletar.id)
      .then(response => {
        const funcionarios = this.state.funcionarios;
        const index = funcionarios.indexOf(this.state.funcionarioADeletar)
        funcionarios.splice(index, 1);
        this.setState({ funcionarios: funcionarios, showConfirmDialogDeletar: false });
        messages.mensagemSucesso("funcionario deletado com sucesso!")
      }).catch(error => {
        if (error.response != null) {
          messages.mensagemErro(error.response.data)
        } else {
          messages.mensagemErro("Erro de conexão com o servidor!")
        }
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
              <FormGroup label="Pesquisar colaborador">
                <div className="input-group">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-11 col-sm-11 col-md-11 col-lg-7 col-xl-8 col-xxl-5">
                    <input maxLength="80" id="search-input" placeholder="Nome/Telefone" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>
            </div>
            <div>
              <FuncionarioTable funcionarios={this.state.funcionarios} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
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
            Deseja excluir o funcionario?
          </Dialog>

          <Dialog

            onChange={e => this.setState({ showConfirmDialogEditar: false })}
            visible={this.state.showConfirmDialogEditar}
            style={{ width: '97vw' }}
            footer={footerDialogEditar}
            modal={true}
            onHide={async () => {
              await this.buscar();
              this.setState({ showConfirmDialogEditar: false })
              console.log(this.state.busca)
            }
            }
          >
            <Card title="Atualize os dados do funcionario">
              <CadastroFuncionario editar={true} state={this.state.funcionarioAEditar} />
            </Card>
          </Dialog>
        </div >



      </>
    )
  }
}

export default ProntuarioFuncionario