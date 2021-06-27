import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ClienteService from '../../app/service/clienteService';
import FormGroup from '../../components/form-group';
import ClienteTable from './clienteTable';




class ProntuarioCliente extends React.Component {


  state = {
    busca: '',
    cliente: []
  }

  constructor() {
    super();
    this.service = new ClienteService();
  }

  buscar = () => {
    this.service.obterPorNomeCpfTelefone(this.state.busca)
      .then(resposta => {
        this.setState({ cliente: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }



  render() {

    return (
      <>
        <div className="p-3">
          <div className="d-flex flex-row p-3">
            <div className="col-md-12">
              <FormGroup label="Pesquisar Cliente">
                <div className="input-group">
                  <div className="form-outline">
                    <input id="search-input" placeholder="Nome/Telefone/CPF" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

              <div className="row">
                <div className="col-md-12">
                  <div className="bs-component">
                    <ClienteTable clientes={this.state.cliente} />
                  </div>
                </div>
              </div>
            </div>

          </div>




        </div>



      </>
    )
  }
}

export default ProntuarioCliente