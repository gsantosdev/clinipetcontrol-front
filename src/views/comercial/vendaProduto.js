import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cpf, cnpj } from 'cpf-cnpj-validator';
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
import { gerarPDF } from '../relatorios/impressao';








class VendaProduto extends React.Component {


  state = {
    totalVenda: null,
    itensVenda: [],
    showTelaBuscaProduto: false,
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    cpfCnpj: '',
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
      console.log(item.quantidade)

      this.produtoService.obterValorVenda(item.idProduto).then(response => {
        console.log("Valor Produto: ", response.data)

        this.setState({ totalVenda: this.state.totalVenda + (response.data * item.quantidade) });
        console.log("Valor Total: ", this.state.totalVenda * item.quantidade)

      });


    })
  }

  validar() {
    const msgs = []

    if (this.state.showCpf) {
      if (!this.state.cpfCnpj) {
        msgs.push('O campo CPF/CNPJ é obrigatório.')
      }
      else if (cpf.strip(this.state.cpfCnpj).length <= 11 && !(cpf.isValid(cpf.strip(this.state.cpfCnpj)))) {
        msgs.push('O CPF está inválido')
      }
      else if (cnpj.strip(this.state.cpfCnpj).length >= 12 && !(cnpj.isValid(cnpj.strip(this.state.cpfCnpj)))) {
        msgs.push('O CNPJ está inválido')
      }
    }

    return msgs
  }

  limparTela = () => {
    this.setState({ itensVenda: [], totalVenda: null, showCpf: false, cpfCnpj: '' })

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
    this.setState({ showConfirmDialogDeletar: true })
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

  gerarNotaVenda = (idVenda, venda, total) => {

    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 10 },
      { text: 'Valor unitário', style: 'tableHeader', fontSize: 10 },
      { text: 'Nome', style: 'tableHeader', fontSize: 10 },
      { text: 'Quantidade', style: 'tableHeader', fontSize: 10 },

    ]

    const dadosAMostrar = venda.itensVenda.map((dado) => {
      return [
        { text: dado.produto.id, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: 'R$' + Number(dado.produto.valorItem).toFixed(2).toString(), style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.produto.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.quantidade, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] }

      ]
    }
    )

    const tamanhoTabelaPrincipal = ['*', '*', '*', '*'];

    const colunasAMais = {
      table: {

        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: '------------', margin: [0, 5, 0, 8], colSpan: 4, alignment: 'center' }, '', '', ''

          ],
          [
            { text: 'Valor total da venda', style: 'tableHeader', fontSize: 12, colSpan: 2 }, '',
            { text: 'R$ ' + Number(total).toFixed(2).toString(), style: 'tableHeader', fontSize: 12, colSpan: 2 }, ''
          ],
        ],
        alignment: "center"
      }
    }

    console.log(colunasAMais)

    gerarPDF("Venda de produto / Código da venda :" + idVenda, dadosAMostrar, colunas, "venda_" + idVenda, tamanhoTabelaPrincipal, "", colunasAMais);

    this.setState({ dados: [] })
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
    const venda = { itensVenda, status: "CONCLUIDA", idUsuario: this.context.usuarioAutenticado.id, cpfCnpj: cpf.strip(this.state.cpfCnpj) }
    console.log(venda);

    this.vendaService.efetuarVendaProduto(venda)
      .then(response => {
        messages.mensagemSucesso(response.data)
        this.gerarNotaVenda(response.data.id, venda, response.data.valorTotal)
        console.log(response)
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
                <label className="ml-2" for="lblCpf">Informar CPF/CNPJ</label>
              </div>

              <FormGroup hidden={!this.state.showCpf} id="inputCpf" label="CPF/CNPJ: *">

                <CpfCnpj
                  className="form-control"
                  value={this.state.cpfCnpj}
                  onChange={(e, type) => {
                    this.setState({ cpfCnpj: e.target.value });
                  }}
                />
              </FormGroup>


            </div> : false}



          {Object.keys(this.state.itensVenda).length !== 0 ?
            <div>
              <div className="d-flex justify-content-end mt-5">
                <h4>Total estimado:  {" R$" + parseFloat(this.state.totalVenda).toFixed(2)} </h4>

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
