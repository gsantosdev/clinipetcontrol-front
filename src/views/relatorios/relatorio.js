import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import AnimalService from '../../app/service/animalService';
import ProdutoService from '../../app/service/produtoService';
import ClienteService from '../../app/service/clienteService';
import FuncionarioService from '../../app/service/funcionarioService';
import Card from "../../components/card";
import gerarPDF from "./impressao";
import * as messages from "../../components/toastr"



pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Relatorios extends React.Component {



  constructor() {
    super();
    this.clienteService = new ClienteService();
    this.animalService = new AnimalService();
    this.colaboradorService = new FuncionarioService();
    this.produtoService = new ProdutoService();

  }

  state = {
    dados: []
  }

  relatorioTodosAnimais = async () => {
    await this.animalService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => console.log("deupau"))


    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 10 },
      { text: 'Nome', style: 'tableHeader', fontSize: 10 },
      { text: 'Espécie', style: 'tableHeader', fontSize: 10 },
      { text: 'Proprietário', style: 'tableHeader', fontSize: 10 }
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.especie, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.cliente.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
      ]
    })

    const tamanho = ['*', '*', '*', '*'];


    gerarPDF("Todos os animais cadastrados", dadosAMostrar, colunas, "relatorio_animais", tamanho);

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
      <Card title="Relatórios">
        <div className="row">
       
          <div className="col-6 col-sm-12 col-lg-12 col-xl-6 col-xxl-6 mb-3">
            <Card subtitulo title="Colaboradores">
              <Button className="col-12 btn btn-info " onClick={e => this.relatorioTodosColaboradores()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                Listar todos os colaboradores
              </Button>
            </Card>
          </div>
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
          
        </div>
      </Card>

    )
  }

}
export default withRouter(Relatorios);
