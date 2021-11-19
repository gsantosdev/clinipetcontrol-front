import React from 'react';

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts";
import Card from "../../components/card"
import { render } from '@testing-library/react';
import { withRouter } from 'react-router';
import { Impressao } from './impressao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import ClienteService from '../../app/service/clienteService'
import AnimalService from '../../app/service/animalService'
import ColaboradorService from '../../app/service/funcionarioService'


import gerarPDF from "./impressao"
import FuncionarioService from '../../app/service/funcionarioService';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Relatorios extends React.Component {



  constructor() {
    super();
    this.clienteService = new ClienteService();
    this.animalService = new AnimalService();
    this.colaboradorService = new FuncionarioService();

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

    gerarPDF("Todos os animais cadastrados", dadosAMostrar, colunas, "relatorio_animais");

    this.setState({ dados: [] })
  }


  relatorioTodosClientes = async () => {
    await this.clienteService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => console.log("deupau"))


    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 10 },
      { text: 'Nome', style: 'tableHeader', fontSize: 10 },
      { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
      { text: 'Telefone', style: 'tableHeader', fontSize: 10 }
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.email, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.telefone, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },

      ]
    })

    gerarPDF("Todos os clientes cadastrados", dadosAMostrar, colunas, "relatorio_clientes");

    this.setState({ dados: [] })
  }

  relatorioTodosColaboradores = async () => {
    await this.colaboradorService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => console.log("deupau"))


    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 10 },
      { text: 'Nome', style: 'tableHeader', fontSize: 10 },
      { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
      { text: 'Telefone', style: 'tableHeader', fontSize: 10 }
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.email, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.telefone, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },

      ]
    })

    gerarPDF("Todos os colaboradores cadastrados", dadosAMostrar, colunas, "relatorio_colaboradores");

    this.setState({ dados: [] })
  }


  render() {
    return (
      <div className="row">
        <div className="col-6 mb-3">
          <Card title="Clientes">
            <Button className="btn btn-info" onClick={e => this.relatorioTodosClientes()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
              Listar todos os clientes
            </Button>
          </Card>
        </div>
        <div className="col-6">
          <Card title="Animais">
            <Button className="btn btn-info " onClick={e => this.relatorioTodosAnimais()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
              Listar todos os animais
            </Button>
          </Card>
        </div>
        <div className="col-6">
          <Card title="Colaboradores">
            <Button className="btn btn-info " onClick={e => this.relatorioTodosColaboradores()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
              Listar todos os colaboradores
            </Button>
          </Card>
        </div>
      </div>
    )
  }

}
export default withRouter(Relatorios);
