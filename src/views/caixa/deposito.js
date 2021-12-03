import React from 'react'
import FormGroup from '../../components/form-group'
import Card from '../../components/card'
import LancamentoService from '../../app/service/lancamentoService'
import { mensagemErro, mensagemAlerta, mensagemSucesso } from '../../components/toastr'
import { AuthContext } from '../../main/provedorAutenticacao'

class Deposito extends React.Component {

  state = {
    descricao: '',
    valor: ''
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  constructor(props) {
    super(props);
    this.lancamentoService = new LancamentoService();
  }

  validar() {
    const msgs = []

    if (!this.state.valor) {
      msgs.push('O campo Valor é obrigatório.')
    }
    else if (this.state.valor === "0") {
      msgs.push('Insira um valor maior que 0.')
    }
    else if (!this.state.descricao) {
      msgs.push('O campo Descrição é obrigatório.')
    }
    return msgs
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

  realizarDeposito = () => {
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg)
      });
      return false;
    }

    const { descricao, valor } = this.state;

    const lancamento = { descricao, valor, tipo: 'DEPOSITO', status: 'CONCLUIDO', idUsuario: this.context.usuarioAutenticado.id };

    this.lancamentoService.salvar(lancamento)
      .then(response => {
        mensagemSucesso(response)
        this.limpaCampos()
        this.props.closeDeposito()
        this.props.getValorCaixa()


        const lancamentosIds = JSON.parse(localStorage.getItem('_lancamento_ids') || '[]');
        console.log("lancamentosIds: ", lancamentosIds);
        lancamentosIds.push(response.data.idLancamento)
        console.log("lancamentosIds: ", lancamentosIds);
        localStorage.setItem("_lancamento_ids", JSON.stringify(lancamentosIds));
        
      }).catch(error => {
        mensagemErro(error.response)

      })



    this.props.getValorCaixa()

  }

  render() {

    return (
      <Card title="Realizar depósito">

        <div className="row mb-3">
          <div className="row">
            <div className="col-6">
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

            <div className="col-6">
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
                  <button onClick={this.realizarDeposito} type="button" className="btn btn-success">Depositar</button>
                </div>
              </FormGroup>

            </div>
          </div>

        </div>
      </Card>

    )
  }




}



Deposito.contextType = AuthContext






export default Deposito