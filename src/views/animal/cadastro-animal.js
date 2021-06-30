import React from 'react'


import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import CpfCnpj from '../../components/inputs/cpfInput'
import SelectMenu from '../../components/selectMenu'
import { mensagemErro, mensagemSucesso } from '../../components/toastr';



class CadastroAnimal extends React.Component {


  state = {
    //TODO
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

  constructor() {
    super();
  }

  validar() {
    const msgs = []

    //Definir validacoes
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


    const animmal = {

    }


  }

  render() {


    return (
      <div className="row mb-3">
        <div className="row">
        </div>
      </div>
    )
  }
}

export default withRouter(CadastroAnimal)