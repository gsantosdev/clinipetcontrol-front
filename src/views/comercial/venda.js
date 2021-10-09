import React from "react";

import Card from "../../components/card"
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import FormGroup from "../../components/form-group"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Venda extends React.Component {

  state = {

    venda: {},
    itensVenda: {}



  }

  criaItemVenda() {

  }



  render() {
    return (
      <div className="row">
        <div style={{ backgroundColor: 'red' }} className="col-6">
          <div className="mb-3">
            <FormGroup label="Pesquisar Cliente">
              <div className="input-group">
                <div style={{ marginLeft: "-1rem" }} className="form-outline col-sm-10 col-md-8 col-lg-5 col-xl-11 col-xxl-8">
                  <input id="search-input" placeholder="Nome/CPF" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                </div>
                <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </FormGroup>
          </div>
        </div>
        <div style={{ backgroundColor: '' }} className="d-flex justify-content-center col-6">
          <strong> Dados do cliente</strong>

        </div>
        <div style={{ backgroundColor: 'yellow' }} className="col-8">
          <Card subtitulo title="Itens">
            <div className="d-flex justify-content-center">
              <Button> Adicionar Agendamento <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></Button>
              <div className="d-flex flex-column justify-content-center m-2">OU</div>
              <Button className="btn btn-success"> Adicionar Produto <FontAwesomeIcon className="ml-2" spacing="fa-fw" icon={faPlus} /></Button>

            </div>
          </Card>
        </div>


        <div style={{ backgroundColor: 'green' }} className="col-4">
          <div className="d-flex justify-content-center">


          </div>
        </div>
      </div>
    )
  }



}



export default withRouter(Venda)
