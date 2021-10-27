import React from 'react';
import { withRouter } from 'react-router-dom';
import ServicoService from '../../app/service/servicoService'
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { Button } from 'primereact/button';
import ServicoTable from './servicoTable';
import { Dialog } from 'primereact/dialog';

import * as messages from '../../components/toastr'



class ServicoHome extends React.Component {

  state = {
    id: null,
    nome: '',
    observacoes: '',
    valorBase: null,
    margemLucro: null,
    servicos: [],
    servicoAEditar: {},
    servicoADeletar: {}
  }

  constructor() {
    super();
    this.service = new ServicoService();
  }

  limpaCampos() {
    this.setState({ nome: '', observacoes: '', valorBase: '', margemLucro: '' })
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
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
    return msgs
  }

  editar = () => {
    const msgs = this.validar()
    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        messages.mensagemErro(msg)
      });
      return false;
    }

    const { nome, observacoes, valorBase, margemLucro } = this.state;
    const servico = { nome, observacoes, valorBase, margemLucro };

    this.service.editar(this.state.id, servico)
      .then(response => {
        messages.mensagemSucesso(response)

      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })
  }
  deletar = () => {
    this.service.deletar(this.state.servicoADeletar.id)
      .then(response => {
        const servicos = this.state.servicos;
        const index = servicos.indexOf(this.state.servicoADeletar)
        console.log(index)
        servicos.splice(index, 1);
        this.setState({ servicos: servicos, showConfirmDialogDeletar: false });
        console.log(servicos)
        messages.mensagemSucesso("Espécie deletada com sucesso!")
      }).catch(erro => {
        messages.mensagemErro(erro.response.data)
      })
  }


  abrirConfirmacaoEditar = (servico) => {
    this.setState({ showConfirmDialogEditar: true, servicoAEditar: servico })
  }

  abrirConfirmacaoDeletar = (servico) => {
    this.setState({ showConfirmDialogDeletar: true, servicoADeletar: servico })
    console.log(servico.id)
  }

  cancelarDelecao = (servico) => {
    this.setState({ showConfirmDialogDeletar: false, servicoADeletar: servico })
  }
  cancelarEdicao = (servico) => {
    this.setState({ showConfirmDialogEditar: false, servicoAEditar: servico })
  }


  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        messages.mensagemErro(msg);
      });
      return false;
    }


    const { nome, observacoes, valorBase, margemLucro } = this.state;
    const servico = { nome, observacoes, valorBase, margemLucro };


    this.service.salvar(servico)
      .then(response => {
        messages.mensagemSucesso(response)
        this.listarServicos()
        this.limpaCampos()
      }).catch(error => {

        messages.mensagemErro(error.response)
      })


  }

  listarServicos = () => {
    this.service.listar()
      .then(resposta => {
        this.setState({ servicos: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  async componentDidMount() {
    this.listarServicos();
    console.log(this.props.state);
    await this.setState(this.props.state);
    console.log(this.state);
  }

  render() {
    const footerDialogDeletar = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
        <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    );

    const footerDialogEditar = (
      <div>
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={async e => {
          await this.listarServicos()
          this.setState({ showConfirmDialogEditar: false })
        }
        }
        />
      </div>
    );
    return (
      <>

        <Card title={!this.props.editar ? "Cadastro de Serviço" : "Atualizar o serviço"}>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
              <FormGroup id="inputNome" label="Nome do serviço: *">
                <input type="text" className="form-control"
                  value={this.state.nome}
                  name="nome"
                  maxLength="80"
                  onChange={this.handleChange} />
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
              <FormGroup id="inputValorBase" label="Valor base (R$): *">
                <input type="number" className="form-control"
                  value={this.state.valorBase}
                  name="valorBase"
                  onInput={this.maxLengthCheck}
                  onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
                  maxLength="7"
                  onChange={this.handleChange} />
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4">
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
            <div className="col-10">
              <FormGroup id="inputObservacoes" label="Observações: ">
                <textarea className="form-control"
                  value={this.state.observacoes}
                  name="observacoes"
                  onChange={this.handleChange} />
              </FormGroup>
            </div>

            <div className="d-flex justify-content-center col-2">
              <FormGroup>
                <div className="pt-2">
                  <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                </div>
              </FormGroup>


            </div>
          </div>
        </Card>
        {!this.props.editar ? <Card title="Listagem de serviços">
          <div className="col-md-12">
            <ServicoTable editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} servicos={this.state.servicos} />
          </div>
        </Card> : null}

        <div>
          <Dialog
            visible={this.state.showConfirmDialogDeletar}
            style={{ width: '50vw' }}
            footer={footerDialogDeletar}
            modal={true}
            onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
            Deseja excluir o serviço?
          </Dialog>
          <Dialog
            onChange={e => this.setState({ showConfirmDialogEditar: false })}
            visible={this.state.showConfirmDialogEditar}
            style={{ width: '90vw' }}
            footer={footerDialogEditar}
            modal={true}
            onHide={async () => {
              await this.listarServicos()
              this.setState({ showConfirmDialogEditar: false })
              console.log(this.state.servicos)
            }}>

            <ServicoHome editar={true} state={this.state.servicoAEditar} />

          </Dialog>
        </div>
      </>
    )
  }
}

export default withRouter(ServicoHome);