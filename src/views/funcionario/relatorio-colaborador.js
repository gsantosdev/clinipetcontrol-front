import React from 'react';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { gerarPDF } from '../relatorios/impressao';
import ClienteService from '../../app/service/clienteService';
import { Button } from 'react-bootstrap';
import Card from "../../components/card";
import FormGroup from '../../components/form-group'
import moment from 'moment';
import CpfCnpj from '../../components/inputs/cpfInput';
import FuncionarioService from '../../app/service/funcionarioService';



class RelatorioColaborador extends React.Component {


  constructor() {
    super();
    this.colaboradorService = new FuncionarioService();
  }

  state = {
    dataInicial: '',
    dataFinal: '',
    filtro: true
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

    const tamanho = ['*', '*', '*', '*'];


    gerarPDF("Todos os colaboradores cadastrados", dadosAMostrar, colunas, "relatorio_colaboradores", tamanho, "relatorio_colaboradores");

    this.setState({ dados: [] })
  }

  render() {
    return (

      <div className="row justify-content-center">

        <div className="col-6 col-sm-12 col-lg-12 col-xl-6 col-xxl-6 mb-3">
          <Button className="col-12 btn btn-info " onClick={e => this.relatorioTodosColaboradores()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
            Listar todos os colaboradores
          </Button>
        </div>

      </div>

    )
  }
}

export default RelatorioColaborador;