import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ProdutoService from '../../app/service/produtoService';
import FormGroup from '../../components/form-group';
import ProdutoTable from './produto-table';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Card from '../../components/card'

import * as messages from '../../components/toastr'
import CadastroProduto from './cadastro-produto';


class ProntuarioProduto extends React.Component {


  state = {
    busca: '',
    produtos: [],
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    produtoADeletar: {},
    produtoAEditar: {},
    message: ''
  }

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  abrirConfirmacaoEditar = (produto) => {
    this.setState({ showConfirmDialogEditar: true, produtoAEditar: produto })
  }

  abrirConfirmacaoDeletar = (produto) => {
    this.setState({ showConfirmDialogDeletar: true, produtoADeletar: produto })
  }

  cancelarDelecao = (produto) => {
    this.setState({ showConfirmDialogDeletar: false, produtoADeletar: produto })
  }
  cancelarEdicao = async (produto) => {
    await this.buscar()
    this.setState({ showConfirmDialogEditar: false, produtoAEditar: produto })
  }


  buscar = () => {
    this.service.obterPorNome(this.state.busca)
      .then(resposta => {
        this.setState({ produtos: resposta.data })
      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })
  }

  voltar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  deletar = () => {
    this.service.deletar(this.state.produtoADeletar.id)
      .then(response => {
        const produtos = this.state.produtos;
        const index = produtos.indexOf(this.state.produtoADeletar)
        produtos.splice(index, 1);
        this.setState({ produtos: produtos, showConfirmDialogDeletar: false });
        messages.mensagemSucesso("Produto deletado com sucesso!")
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
              <FormGroup label="Pesquisar Produto">
                <div className="input-group">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-11 col-sm-11 col-md-11 col-lg-8 col-xl-8 col-xxl-5">
                    <input maxLength="80" id="search-input" placeholder="Nome/Marca" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

            </div>
            <div>
              <ProdutoTable produtos={this.state.produtos} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
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
            Deseja excluir o produto?
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
            <Card title="Atualize os dados do produto">
              <CadastroProduto editar={true} state={this.state.produtoAEditar} />
            </Card>
          </Dialog>
        </div>



      </>
    )
  }
}

export default ProntuarioProduto