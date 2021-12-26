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
    showConfirmDialogEntrada: false,
    showConfirmDialogSaida: false,
    produtoADeletar: {},
    produtoAEditar: {},
    produtoEntrada: {},
    produtoSaida: {},

    qtdEntrada: '',
    qtdSaida: '',

    message: '',
    quantidade: null,
  }

  constructor(props) {
    super(props);
    this.service = new ProdutoService();
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  componentDidMount() {
    if (this.state.quantidade == null) {
      this.setState({ quantidade: 1 })
    }

    if (this.props.editar) {
      this.setState(this.props.produtoItemAEditar)
      console.log("this.state.produtoItemAEditar: ", this.props)

      this.buscarItemAEditar(this.props.produtoItemAEditar.idProduto)
    }
  }

  buscarItemAEditar = (id) => {
    this.service.obterPorId(id).then(response => {
      this.setState({ produtos: [response.data] })
    }).catch(error => {
      console.log(error)
    })
  }


  buscarPeloId = (id) => {
    this.service.obterPorId(id).then(response => {
      this.setState({ produtos: [response.data] })
    }).catch(error => {
      console.log(error)
    })
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  abrirConfirmacaoEditar = (produto) => {
    this.setState({ showConfirmDialogEditar: true, produtoAEditar: produto })
  }

  abrirConfirmacaoDeletar = (produto) => {
    this.setState({ showConfirmDialogDeletar: true, produtoADeletar: produto })
  }

  abrirConfirmacaoEntrada = (produto) => {
    this.setState({ showConfirmDialogEntrada: true, produtoEntrada: produto })
  }

  abrirConfirmacaoSaida = (produto) => {
    this.setState({ showConfirmDialogSaida: true, produtoSaida: produto })
  }

  cancelarDelecao = (produto) => {
    this.setState({ showConfirmDialogDeletar: false, produtoADeletar: produto })
  }

  cancelarEntrada = (produto) => {
    this.setState({ showConfirmDialogEntrada: false, produtoEntrada: produto })
    this.setState({ qtdEntrada: null })
  }

  cancelarSaida = (produto) => {
    this.setState({ showConfirmDialogSaida: false, produtoSaida: produto })
    this.setState({ qtdSaida: null })

  }

  cancelarEdicao = async (produto) => {
    await this.buscarPeloId(this.state.produtoAEditar.id)
    this.setState({ showConfirmDialogEditar: false, produtoAEditar: produto })
  }

  entradaEstoque = (id, quantidade) => {

    if (quantidade == null || quantidade == 0) {
      messages.mensagemErro("Informe uma quantidade válida");
      return false;
    }

    this.service.entradaEstoque(id, quantidade).then(response => {
      messages.mensagemSucesso("Entrada realizada com sucesso!");
      this.buscarPeloId(id);
      this.cancelarEntrada();
    }).catch(error => {
      messages.mensagemErro(error.response.data)
    })
  }

  baixaEstoque = (id, quantidade) => {

    if (quantidade == null || quantidade == 0) {
      messages.mensagemErro("Informe uma quantidade válida");
      return false;
    }

    this.service.baixaEstoque(id, quantidade).then(response => {
      messages.mensagemSucesso("Baixa realizada com sucesso!");
      this.buscarPeloId(id);
      this.cancelarSaida();
    }).catch(error => {
      messages.mensagemErro(error.response.data)
    })
  }


  buscar = () => {
    this.setState({ produtos: [] })

    if (this.props.telaVenda) {
      console.log("XDXD")
      this.service.obterPorNomeOuMarcaComEstoque(this.state.busca)
        .then(response => {
          this.setState({ produtos: response.data })
        }).catch(error => {
          if (error.response != null) {
            messages.mensagemErro(error.response.data)

          } else {
            messages.mensagemErro("Erro de conexão com o servidor")

          }

        })
    }
    else {
      this.service.obterPorNomeOuMarca(this.state.busca)
        .then(response => {
          this.setState({ produtos: response.data })
        }).catch(error => {
          if (error.response != null) {
            messages.mensagemErro(error.response.data)

          } else {
            messages.mensagemErro("Erro de conexão com o servidor")

          }

        })
    }

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

    const footerDialogEntrada = (
      <div>
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarEntrada} />
      </div>
    );

    const footerDialogSaida = (
      <div>
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarSaida} />
      </div>
    );


    return (
      <>
        <div className="p-3">
          <div className="row">
            <div className="col-12 mb-3">
              <FormGroup label="Pesquisar Produto">
                <div className="input-group">
                  <div style={{ marginLeft: "-1rem" }} className="form-outline col-11 col-sm-11 col-md-11 col-lg-8 col-xl-8 col-xxl-11">
                    <input maxLength="80" id="search-input" placeholder="Nome/Marca" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

            </div>
            {this.props.telaVenda ? this.state.produtos.length > 0 ?
              <div className="col-6 mb-3">
                <FormGroup label="Quantidade">
                  <input type="number" className="form-control"
                    onInput={this.maxLengthCheck}
                    minLength="1"
                    min="1"
                    value={this.state.quantidade}
                    onKeyDown={(evt) => (evt.key === 'e' || evt.key === '0' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
                    name="quantidade"
                    maxLength="7"
                    onChange={this.handleChange} />
                </FormGroup>
              </div> : false
              : false}

            <div>
              <ProdutoTable quantidade={this.state.quantidade} selecionarProduto={this.props.editar ? this.props.editarItemProduto : this.props.selecionarProduto} indexProduto={this.props.indexProduto} telaVenda={this.props.telaVenda} produtos={this.state.produtos} baixaEstoqueAction={this.abrirConfirmacaoSaida} entradaEstoqueAction={this.abrirConfirmacaoEntrada} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
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
              await this.buscarPeloId(this.state.produtoAEditar.id)
              this.setState({ showConfirmDialogEditar: false })


            }}
          >
            <Card title="Atualize os dados do produto">
              <CadastroProduto editar={true} state={this.state.produtoAEditar} />
            </Card>
          </Dialog>

          <Dialog

            onChange={e => this.setState({ showConfirmDialogEntrada: false })}
            visible={this.state.showConfirmDialogEntrada}
            style={{ width: '60vw' }}
            footer={footerDialogEntrada}
            modal={true}
            onHide={async () => {
              await this.buscarPeloId(this.state.produtoEntrada.id)
              this.setState({ showConfirmDialogEntrada: false })
            }}
          >
            <Card title="Entrada de estoque">
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <FormGroup label="Digite a quantidade a dar entrada: " >
                    <input type="number" className="form-control"
                      value={this.state.qtdEntrada}
                      name="qtdEntrada"
                      onInput={this.maxLengthCheck}
                      onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
                      maxLength="7"
                      min="0"
                      onChange={this.handleChange} />

                  </FormGroup>
                </div>

                <div className="col-sm-12 d-flex justify-content-end">
                  <FormGroup>
                    <div className="pt-2">
                      <button onClick={e => {
                        this.entradaEstoque(this.state.produtoEntrada.id, this.state.qtdEntrada)
                      }} type="button" className="btn btn-success">Salvar</button>
                    </div>
                  </FormGroup>

                </div>
              </div>
            </Card>
          </Dialog>

          <Dialog

            onChange={e => this.setState({ showConfirmDialogSaida: false })}
            visible={this.state.showConfirmDialogSaida}
            style={{ width: '60vw' }}
            footer={footerDialogSaida}
            modal={true}
            onHide={async () => {
              await this.buscarPeloId(this.state.produtoSaida.id)
              this.setState({ showConfirmDialogSaida: false })
            }}
          >
            <Card title="Baixa de estoque">
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <FormGroup label="Digite a quantidade a dar baixa: " >
                    <input type="number" className="form-control"
                      value={this.state.qtdSaida}
                      name="qtdSaida"
                      onInput={this.maxLengthCheck}
                      onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
                      maxLength="7"
                      min="0"
                      onChange={this.handleChange} />

                  </FormGroup>
                </div>

                <div className="col-sm-12 d-flex justify-content-end">
                  <FormGroup>
                    <div className="pt-2">
                      <button onClick={e => {
                        this.baixaEstoque(this.state.produtoSaida.id, this.state.qtdSaida)
                      }} type="button" className="btn btn-success">Salvar</button>
                    </div>
                  </FormGroup>
                </div>
              </div>
            </Card>
          </Dialog>
        </div>

      </>
    )
  }
}

export default ProntuarioProduto