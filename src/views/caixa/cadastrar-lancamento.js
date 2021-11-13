import React from 'react';
import { withRouter } from 'react-router-dom';
import FuncionarioService from '../../app/service/funcionarioService';
import FormGroup from '../../components/form-group';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/selectMenu';
import InputMask from "react-input-mask";
import LancamentoService from "../../app/service/lancamentoService"
import { AuthContext } from '../../main/provedorAutenticacao';



class CadastroLancamento extends React.Component {


  constructor(props) {
    super(props);
    this.service = new LancamentoService();
  }

  state = {
    id: null,
    descricao: '',
    valor: '',
    tipo: ''
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }


  limpaCampos() {
    Object.keys(this.state).forEach(key => {
      this.setState({ [key]: '' })
    })
  }


  validar() {
    const msgs = []

    if (!this.state.valor) {
      msgs.push('O campo Valor é obrigatório.')
    }
    else if (this.state.valor === "0") {
      msgs.push('Insira um valor maior que 0.')
    }
    else if (!this.state.tipo) {
      msgs.push('O campo Tipo é obrigatório.')
    }
    else if (!this.state.tipo === "Selecione...") {
      msgs.push('O campo Tipo é obrigatório.')
    }
    else if (!this.state.descricao) {
      msgs.push('O campo Descrição é obrigatório.')
    }
    return msgs
  }

  cadastrar = () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    const { descricao, valor, tipo } = this.state;

    const lancamento = { descricao, valor, tipo, status: 'AGUARDANDO_PAGAMENTO', idUsuario: this.context.usuarioAutenticado.id };

    this.service.salvar(lancamento)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        //this.props.history.push('/login')
      }).catch(error => {
        mensagemErro(error.response.data)
      })
  }

  // editar = () => {

  //   const msgs = this.validar()

  //   if (msgs && msgs.length > 0) {
  //     msgs.forEach((msg, index) => {
  //       mensagemErro(msg)
  //     });
  //     return false;
  //   }

  //   const { descricao, valor, tipo, status } = this.state;
  //   const lancamento = { descricao, valor, tipo, status };

  //   this.service.editar(this.state.id, funcionario)
  //     .then(response => {
  //       mensagemSucesso(response)
  //       //this.props.history.push('/login')
  //     }).catch(error => {
  //       mensagemErro(error.response.data)
  //     })
  // }

  componentDidMount() {
    console.log(this.props.state)
    this.setState(this.props.state)
  }


  render() {
    return (
      <div className="row mb-3">
        <div className="row">
          <div className="col-xl-6 col-xxl-3">
            <FormGroup id="inputValor" label="Valor: *">
              <input type="number" className="form-control"
                value={this.state.valor}
                min="1"
                name="valor"
                onInput={this.maxLengthCheck}
                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
                maxLength="7"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-12 col-lg-12 col-xl-6 col-xxl-3">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu className="form-control" lista={this.service.obterListaTipos()}
                value={this.state.tipo}
                name="tipo"
                onChange={this.handleChange} />
            </FormGroup>
          </div>

          <div className="col-lg-12 col-xl-6 col-xxl-5">
            <FormGroup id="inputDescricao" label="Descrição: *">
              <input type="text" className="form-control"
                value={this.state.descricao}
                maxLength="150"
                name="descricao"
                onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <FormGroup>
              <div className="pt-2">
                <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
              </div>
            </FormGroup>

          </div>

        </div>

      </div>
    )
  }
}

CadastroLancamento.contextType = AuthContext


export default withRouter(CadastroLancamento)