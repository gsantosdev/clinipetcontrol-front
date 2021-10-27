import React from 'react';
import { withRouter } from 'react-router-dom';
import ServicoService from '../../app/service/servicoService'
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import * as messages from '../../components/toastr'
import ProdutoService from '../../app/service/produtoService';



class CadastroProduto extends React.Component {

  state = {
    id: null,
    nome: '',
    marca: '',
    valorBase: null,
    margemLucro: null,
    quantidadeEstoque: null,
    estoqueMinimo: null,
    estoqueMaximo: null
  }

  constructor(props) {
    super(props);
    this.service = new ProdutoService();
  }


  limpaCampos() {
    this.setState({
      nome: '',
      marca: '',
      valorBase: '',
      margemLucro: '',
      quantidadeEstoque: '',
      estoqueMinimo: '',
      estoqueMaximo: ''
    })
  }


  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        messages.mensagemErro(msg);
      });
      return false;
    }


    const { nome, marca, valorBase, margemLucro, quantidadeEstoque, estoqueMinimo, estoqueMaximo } = this.state;
    const produto = { nome, marca, valorBase, margemLucro, quantidadeEstoque, estoqueMinimo, estoqueMaximo };


    this.service.salvar(produto)
      .then(response => {
        messages.mensagemSucesso(response)
        this.limpaCampos();
      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })

  }

  editar = () => {

    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        messages.mensagemErro(msg)
      });
      return false;
    }


    const { nome, marca, valorBase, margemLucro, quantidadeEstoque, estoqueMinimo, estoqueMaximo } = this.state;
    const produto = { nome, marca, valorBase, margemLucro, quantidadeEstoque, estoqueMinimo, estoqueMaximo };


    this.service.editar(this.state.id, produto)
      .then(response => {
        messages.mensagemSucesso(response)
      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })
  }



  validar() {

    const msgs = []

    if (!this.state.nome) {
      msgs.push('O campo Nome é obrigatório.')
    }
    else if (!this.state.valorBase) {
      msgs.push('O campo Valor Base é obrigatório.')
    }
    else if (!this.state.margemLucro) {
      msgs.push('O campo Margem de Lucro é obrigatório.')
    }
    else if (!this.state.quantidadeEstoque) {
      msgs.push('O campo Quantidade em Estoque é obrigatório.')
    }
    else if (!this.state.estoqueMinimo) {
      msgs.push('O campo Quantidade Mínima é obrigatório.')
    }
    else if (this.state.estoqueMinimo > this.state.estoqueMaximo) {
      msgs.push('A quantidade mínima não pode ser maior que a máxima.')
    }
    else if (!this.state.estoqueMaximo) {
      msgs.push('O campo Quantidade Máxima é obrigatório.')

    }
    return msgs;
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }


  componentDidMount() {
    console.log(this.props.state)
    this.setState(this.props.state)

  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-4">
          <FormGroup id="inputNome" label="Nome do produto: *">
            <input type="text" className="form-control"
              value={this.state.nome}
              name="nome"
              maxLength="80"
              onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-2">
          <FormGroup id="inputNome" label="Marca: *">
            <input type="text" className="form-control"
              value={this.state.marca}
              name="marca"
              maxLength="80"
              onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-2">
          <FormGroup id="inputValorBase" label="Valor base (R$): *">
            <input type="number" className="form-control"
              value={this.state.valorBase}
              name="valorBase"
              onInput={this.maxLengthCheck}
              onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
              maxLength="7"
              min="0"
              onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-4">
          <FormGroup id="inputMargemLucro" label="Margem de Lucro (%): *">
            <input type="number" className="form-control"
              value={this.state.margemLucro}
              name="margemLucro"
              onInput={this.maxLengthCheck}
              onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
              maxLength="7"
              onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-4">
          <FormGroup id="inputQuantidadeEstoque" label="Quantidade inicial (Estoque): *">
            <input type="number" className="form-control"
              value={this.state.quantidadeEstoque}
              name="quantidadeEstoque"
              onInput={this.maxLengthCheck}
              onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
              maxLength="7"
              onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div className="col-12 col-lg-6 col-xl-4 col-xxl-4">
          <FormGroup id="inputQuantidadeEstoque" label="Quantidade mínima (Estoque): *">
            <input type="number" className="form-control"
              value={this.state.estoqueMinimo}
              name="estoqueMinimo"
              onInput={this.maxLengthCheck}
              onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
              maxLength="7"
              onChange={this.handleChange} />
          </FormGroup>
        </div>

        <div className="col-12  col-xxl-4">
          <FormGroup id="inputQuantidadeEstoque" label="Quantidade máxima (Estoque): *">
            <input type="number" className="form-control"
              value={this.state.estoqueMaximo}
              name="estoqueMaximo"
              onInput={this.maxLengthCheck}
              onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
              maxLength="7"
              onChange={this.handleChange} />
          </FormGroup>
        </div>

        <div className="d-flex justify-content-end col-">
          <FormGroup>
            <div className="pt-2">
              <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
            </div>
          </FormGroup>
        </div>

      </div>
    )
  }





}


export default CadastroProduto;