import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { Button } from 'react-bootstrap';
import ClienteService from '../../app/service/clienteService';
import Card from "../../components/card";
import FiltrarData from '../relatorios/filtrarData';
import { gerarPDF } from '../relatorios/impressao';




class RelatorioCliente extends React.Component {


  constructor() {
    super();
    this.clienteService = new ClienteService();
  }

  state = {
    dataInicial: '',
    dataFinal: '',
    filtro: true
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

    const tamanho = ['*', '*', '*', '*'];

    gerarPDF("Todos os clientes cadastrados", dadosAMostrar, colunas, "relatorio_clientes", tamanho);

    this.setState({ dados: [] })
  }


  relatorioTodosClientesAnimais = async () => {
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

    const tamanho = ['*', '*', '*', '*'];

    gerarPDF("Todos os clientes cadastrados", dadosAMostrar, colunas, "relatorio_clientes", tamanho);

    this.setState({ dados: [] })
  }

  render() {
    return (

      <div className="row justify-content-center">
        <div>
          <div className="row">

            <div className="col-6">
              <Button className="col-12 btn btn-info" onClick={e => this.relatorioTodosClientes()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                Listar todos os clientes
              </Button>
            </div>
            <div className="col-6">
              <Button className="col-12 btn btn-info" onClick={e => this.relatorioTodosClientes()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                Listar quantidades de animais por cliente
              </Button>
            </div>
          </div>



        </div>



        <Dialog
          onChange={e => this.setState({ showFiltrarData: false })}
          visible={this.state.showFiltrarData}
          style={{ width: '60vw' }}
          modal={true}
          onHide={async () => {
            this.setState({ showFiltrarData: false })
          }}
        >
          <FiltrarData gerarRelatorio={() => { }} />
        </Dialog>
      </div>


    )
  }
}

export default RelatorioCliente;