import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cpf } from 'cpf-cnpj-validator';
import { Button as PrimeButton } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { withRouter } from "react-router";
import ClienteService from "../../app/service/clienteService";
import ProdutoService from "../../app/service/produtoService";
import VendaService from "../../app/service/vendaService";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import CpfCnpj from "../../components/inputs/cpfInput";
import * as messages from "../../components/toastr";
import { AuthContext } from "../../main/provedorAutenticacao";
import ProntuarioProduto from "../produto/prontuario-produto";
import ItemProdutoTable from "./item-produto-table";





class VendaProduto extends React.Component {


  state = {
    totalVenda: null,
    itensVenda: [],
    showTelaBuscaProduto: false,
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    cpf: '',
    showCpf: false
  }

  constructor(props) {
    super(props);
    this.clienteService = new ClienteService();
    this.produtoService = new ProdutoService();
    this.vendaService = new VendaService();

  }

  componentDidMount() {
    console.log(this.context.usuarioAutenticado)
  }


  obterValorTotalVenda() {

    this.setState({ totalVenda: 0 })//Seta pra 0 pra passar por toda a lista novamente

    this.state.itensVenda.forEach(item => {

      this.produtoService.obterValorVenda(item.idProduto).then(response => {
        console.log("Valor Produto: ", response.data)

        this.setState({ totalVenda: this.state.totalVenda + response.data });
        console.log("Valor Total: ", this.state.totalVenda)

      });


    })
  }

  validar() {
    const msgs = []

    if (this.state.showCpf) {
      if (!this.state.cpf) {
        msgs.push('O campo CPF é obrigatório.')
      }
      else if (!(cpf.isValid(cpf.strip(this.state.cpf)))) {
        msgs.push('O campo CPF está invalido')
      }
    }

    return msgs
  }

  limparTela = () => {
    this.setState({ itensVenda: [], totalVenda: null, showCpf: false, cpf: '' })

  }

  showCpfInput = () => {
    this.setState({ showCpf: !this.state.showCpf })
  }

  abrirTelaBuscaProduto = () => {
    this.setState({ showTelaBuscaProduto: true })
  }

  abrirConfirmacaoEditar = (produto) => {
    this.setState({ showConfirmDialogEditar: true, produtoItemAEditar: produto })
  }

  abrirConfirmacaoDeletar = () => {
    this.setState({ showConfirmDialogDeletar: true})
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialogDeletar: false })
  }

  cancelarEdicao = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  adicionarProduto = (produto, quantidade) => {
    this.state.itensVenda.push({ idProduto: produto.id, produto: produto, quantidade: quantidade })//Alterar adição de quantidade
    this.setState({ showTelaBuscaProduto: false, itensVenda: this.state.itensVenda })
    this.obterValorTotalVenda();


    console.log("itensVenda:", this.state.itensVenda)
  }


  editarItemProduto = (produto, quantidade) => {
    const itensVenda = this.state.itensVenda;

    const index = itensVenda.indexOf(produto)
    console.log("Itens Venda Antes: ", itensVenda);

    itensVenda.splice(index, 1)

    itensVenda.push({ idProduto: produto.id, produto: produto, quantidade: quantidade });

    console.log("Itens Venda Atualizado: ", itensVenda);

    this.setState({ itensVenda: itensVenda, showConfirmDialogEditar: false })

    this.obterValorTotalVenda();


  }

  deletarItemProduto = (produto) => {
    const itensVenda = this.state.itensVenda;

    const index = itensVenda.indexOf(produto)
    itensVenda.splice(index, 1)
    this.setState({ itensVenda: itensVenda, showConfirmDialogDeletar: false })
    this.obterValorTotalVenda();

  }

  efetuarVenda = () => {

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        messages.mensagemErro(msg)
      });
      return false;
    }

    const { itensVenda } = this.state
    const venda = { itensVenda, status: "CONCLUIDA", idUsuario: this.context.usuarioAutenticado.id, cpf: this.state.cpf }
    console.log(venda);

    this.vendaService.efetuarVendaProduto(venda)
      .then(response => {
        messages.mensagemSucesso(response.data)
        this.limparTela()
      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })

  }

  render() {

    const footerDialogDeletar = (
      <div>
        <PrimeButton label="Confirmar" icon="pi pi-check" onClick={this.deletarItemProduto} />
        <PrimeButton label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    );

    const footerDialogEditar = (
      <div>
        <PrimeButton style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarEdicao} />
      </div>
    );


    return (
      <div className="row" >
        <div className="col-12">
          <div style={{ backgroundColor: '' }}>
            <Card subtitulo title="Itens">
              {Object.keys(this.state.itensVenda).length !== 0 ?
                <div>
                  <ItemProdutoTable editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} itensVenda={this.state.itensVenda} />
                </div>
                : false}
              <div className="d-flex justify-content-center">
                <BootstrapButton onClick={this.abrirTelaBuscaProduto}> Adicionar Produto <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></BootstrapButton>
              </div>
            </Card>
          </div>



          {Object.keys(this.state.itensVenda).length !== 0 ?

            <div className="mt-4 col-sm-12 col-md-6 col-xl-6 col-xxl-6 col-xxl-3">
              <div >
                <input type="checkbox" id="cpf" name="inputCpf"
                  onClick={this.showCpfInput} checked={this.state.showCpf} />
                <label className="ml-2" for="lblCpf">Informar CPF</label>
              </div>

              <FormGroup hidden={!this.state.showCpf} id="inputCpf" label="CPF: *">

                <CpfCnpj
                  className="form-control"
                  value={this.state.cpf}
                  onChange={(e, type) => {
                    this.setState({ cpf: e.target.value, maskCpf: type === "CPF" });
                  }}
                />
              </FormGroup>


            </div> : false}



          {Object.keys(this.state.itensVenda).length !== 0 ?
            <div>
              <div className="d-flex justify-content-end mt-5">
                <h4>Total estimado:  {parseFloat(this.state.totalVenda).toFixed(2) + " R$"} </h4>

              </div>
            </div> : false}
        </div>


        {Object.keys(this.state.itensVenda).length !== 0 ?
          <div className="d-flex justify-content-end mt-5">
            <PrimeButton onClick={this.efetuarVenda}> Efetuar venda <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faCheck} /></PrimeButton>

          </div> : false
        }


        <Dialog
          onChange={e => this.setState({ showTelaBuscaProduto: false })}
          visible={this.state.showTelaBuscaProduto}
          style={{ height: '40vw', width: '50vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showTelaBuscaProduto: false })
          }}
        >
          <Card title="Selecionar Produto">
            <ProntuarioProduto selecionarProduto={this.adicionarProduto} telaVenda />
          </Card>
        </Dialog >

        < Dialog
          onChange={e => this.setState({ showConfirmDialogEditar: false })}
          visible={this.state.showConfirmDialogEditar}
          style={{ height: '40vw', width: '50vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showConfirmDialogEditar: false })
          }}
        >
          <Card title="Editar Produto Selecionado">
          </Card>
          <ProntuarioProduto produtoItemAEditar={this.state.produtoItemAEditar} editar editarItemProduto={this.editarItemProduto} telaVenda />
        </Dialog >

        <Dialog
          visible={this.state.showConfirmDialogDeletar}
          style={{ width: '50vw' }}
          footer={footerDialogDeletar}
          modal={true}
          onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
          Deseja remover o item?
        </Dialog>
      </div >
    )
  }



}

VendaProduto.contextType = AuthContext



export default withRouter(VendaProduto)
