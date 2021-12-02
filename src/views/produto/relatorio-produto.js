import React from 'react';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {gerarPDF} from '../relatorios/impressao';
import ClienteService from '../../app/service/clienteService';
import { Button } from 'react-bootstrap';
import Card from "../../components/card";
import FormGroup from '../../components/form-group'
import moment from 'moment';
import CpfCnpj from '../../components/inputs/cpfInput';
import FuncionarioService from '../../app/service/funcionarioService';
import * as messages from "../../components/toastr"
import ProdutoService from '../../app/service/produtoService';



class RelatorioProduto extends React.Component {


  constructor() {
    super();
    this.produtoService = new ProdutoService();
  }

  state = {
    dataInicial: '',
    dataFinal: '',
    filtro: true
  }
  relatorioTodosProdutosEstoque = async () => {
    await this.produtoService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => messages.mensagemErro(error.response.data))

    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 8 },
      { text: 'Nome', style: 'tableHeader', fontSize: 8 },
      { text: 'Quantidade em estoque', style: 'tableHeader', fontSize: 8 },
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.quantidadeEstoque, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
      ]
    })

    const tamanho = ['*', '*', '*'];


    gerarPDF("Quantidade em estoque de cada produto", dadosAMostrar, colunas, "relatorio_produtos_estoque", tamanho, "relatorio_produtos_estoque");

    this.setState({ dados: [] })
  }

  relatorioTodosProdutosQuantidadeVenda = async () => {
    await this.produtoService.listarQuantidadeVendaProduto()
      .then(response => {
        this.setState({ dados: response.data })
        console.log(this.state.dados)
      })
      .catch(error => messages.mensagemErro(error.response.data))

    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 8 },
      { text: 'Nome', style: 'tableHeader', fontSize: 8 },
      { text: 'Quantidade vendida', style: 'tableHeader', fontSize: 8 },
      { text: 'Valor total vendido', style: 'tableHeader', fontSize: 8 },
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.produto.id, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.produto.nome, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.quantidade, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: 'R$ ' + dado.valorTotal, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
      ]
    })

    const tamanho = ['*', '*', '*', '*'];

    gerarPDF("Quantidade vendida de cada produto", dadosAMostrar, colunas, "relatorio_produtos_venda", tamanho, "relatorio_produtos_venda");

    this.setState({ dados: [] })
  }

  relatorioTodosProdutos = async () => {
    await this.produtoService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => messages.mensagemErro(error.response.data))

    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 8 },
      { text: 'Nome', style: 'tableHeader', fontSize: 8 },
      { text: 'Marca', style: 'tableHeader', fontSize: 8 },
      { text: 'Valor unitário da venda', style: 'tableHeader', fontSize: 8 }
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: dado.marca, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
        { text: 'R$ ' + dado.valorItem, style: 'tableHeader', fontSize: 8, margin: [0, 2, 0, 2] },
      ]
    })

    const tamanho = ['*', '*', '*', '*'];


    gerarPDF("Todos os produtos cadastrados", dadosAMostrar, colunas, "relatorio_produtos", tamanho, "relatorio_produtos");

    this.setState({ dados: [] })
  }

  render() {
    return (

      <div className="row justify-content-center">
       
        <div>
          <Card subtitulo title="Relatórios">
            <div className="col-6 col-sm-12 col-lg-12 col-xl-6 col-xxl-6 mb-3">
              <Card subtitulo title="Produtos">
                <Button className="col-12 btn btn-info mb-2" onClick={e => this.relatorioTodosProdutos()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                  Listar todos os produtos
                </Button>
                <Button className="col-12 btn btn-info mb-2" onClick={e => this.relatorioTodosProdutosEstoque()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                  Listar quantidade em estoque dos produtos
                </Button>
                <Button className="col-12 btn btn-info mb-3" onClick={e => this.relatorioTodosProdutosQuantidadeVenda()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                  Listar quantidade vendida por produto
                </Button>
              </Card>
            </div>

          </Card>


        </div>

      </div>

    )
  }
}

export default RelatorioProduto;