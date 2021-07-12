import React from 'react';
import { withRouter } from 'react-router-dom';
import FormGroup from '../../components/form-group';


class CadastroFuncionario extends React.Component {

  state = {
    id: null,
    nome: '',
    telefone: '',
    email: '',
    sexo: ''
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputNome" label="Nome completo: *">
              <input type="text" className="form-control"
                value={this.nome}
                name="nome"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <FormGroup id="inputTelefone" label="Telefone: *">
              <input type="tel" className="form-control" id="tel" placeholder="(00) 0000-0000"
                name="tel" maxLength="15" pattern="\(\d{2}\)\s*\d{5}-\d{4}"
                value={this.telefone}
                name="telefone"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputEmail" label="Email: *">
              <input type="email" className="form-control"
                value={this.email}
                name="email"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>


        <div className="row">
          <div className="d-flex justify-content-end">
            <div className="p-1">
              <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
            </div>
            <div className="p-1">
              <button hidden={!this.props.editar} onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default withRouter(CadastroFuncionario)