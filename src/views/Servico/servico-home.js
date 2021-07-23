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
    servicos: [],
    servicoAEditar: {},
    servicoADeletar: {}
  }

  constructor() {
    super();
    this.service = new ServicoService();
  }

  validar() {
    const msgs = []

    //Definir validacoes
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

    const { nome, observacoes } = this.state;
    const servico = { nome, observacoes };

    this.service.editar(this.state.id, servico)
      .then(response => {
        messages.mensagemSucesso(response)

        //this.props.history.push('/login')
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
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o Serviço")
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


    const { nome, observacoes } = this.state;
    const servico = { nome , observacoes};


    this.service.salvar(servico)
      .then(response => {
        messages.mensagemSucesso(response)
        this.listarServicos()
        //this.limpaCampos()
        //this.props.history.push('/login')
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
            <div className="col-md-3">
              <FormGroup id="inputNome" label="Nome do serviço: *">
                <input type="text" className="form-control"
                  value={this.state.nome}
                  name="nome"
                  onChange={this.handleChange} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup id="inputNome" label="Observações: *">
                <textarea className="form-control"
                  value={this.state.observacoes}
                  name="observacoes"
                  onChange={this.handleChange} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <div className="pt-2">
                  <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                </div>
              </FormGroup>


            </div>
          </div>
        </Card>
        {!this.props.editar ? <Card title="Todos serviços">
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