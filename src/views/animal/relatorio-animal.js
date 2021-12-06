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
import AnimalService from '../../app/service/animalService';



class RelatorioAnimal extends React.Component {


  constructor() {
    super();
    this.animalService = new AnimalService();
  }

  state = {
    dataInicial: '',
    dataFinal: '',
    filtro: true
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


  render() {
    return (

      <div className="row justify-content-center">
        <div className="col-6 col-sm-12 col-lg-12 col-xl-6 col-xxl-6 mb-3">
          <Button className="col-12 btn btn-info " onClick={e => this.relatorioTodosAnimais()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
            Listar todos os animais
          </Button>
        </div>


      </div>


    )
  }
}

export default RelatorioAnimal;