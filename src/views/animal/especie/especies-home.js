import React from 'react';
import { withRouter } from 'react-router-dom';
import EspecieService from '../../../app/service/especieService';
import Card from '../../../components/card';
import FormGroup from '../../../components/form-group';
import { Button } from 'primereact/button';

import EspecieTable from './especieTable';
import { Dialog } from 'primereact/dialog';

import * as messages from '../../../components/toastr'



class EspeciesHome extends React.Component {

  state = {
    id: null,
    nome: '',
    especies: [],
    especieAEditar: {},
    especieADeletar: {}
  }

  constructor() {
    super();
    this.service = new EspecieService();
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

    const { nome } = this.state;
    const especie = { nome };

    this.service.editar(this.state.id, especie)
      .then(response => {
        messages.mensagemSucesso(response)

        //this.props.history.push('/login')
      }).catch(error => {
        messages.mensagemErro(error.response.data)
      })
  }
  deletar =  () => {
    this.service.deletar(this.state.especieADeletar.id)
      .then(response => {
        const especies = this.state.especies;
        const index = especies.indexOf(this.state.especieADeletar)
        console.log(index)
        especies.splice(index, 1);
        this.setState({ especies: especies, showConfirmDialogDeletar: false });
        console.log(especies)
        messages.mensagemSucesso("Espécie deletada com sucesso!")
      }).catch(erro => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar a Espécie")
      })
  }


  abrirConfirmacaoEditar = (especie) => {
    this.setState({ showConfirmDialogEditar: true, especieAEditar: especie })
  }

  abrirConfirmacaoDeletar = (especie) => {
    this.setState({ showConfirmDialogDeletar: true, especieADeletar: especie })
    console.log(especie.id)
  }

  cancelarDelecao = (especie) => {
    this.setState({ showConfirmDialogDeletar: false, especieADeletar: especie })
  }
  cancelarEdicao = (especie) => {
    this.setState({ showConfirmDialogEditar: false, especieAEditar: especie })
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


    const { nome } = this.state;
    const especie = { nome };


    this.service.salvar(especie)
      .then(response => {
        messages.mensagemSucesso(response)
        this.listarEspecies()
        //this.limpaCampos()
        //this.props.history.push('/login')
      }).catch(error => {
        
        messages.mensagemErro(error.response)
      })

  }

  listarEspecies = () => {
    this.service.listar()
      .then(resposta => {
        this.setState({ especies: resposta.data })
      }).catch(error => {
        console.log(error)
      })

  }

  async componentDidMount() {
    this.listarEspecies();
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
          await this.listarEspecies()
          this.setState({ showConfirmDialogEditar: false })
        }
        }
        />
      </div>
    );
    return (
      <>

        <Card title={!this.props.editar ? "Cadastro de Espécies" : "Atualizar a espécie"}>
          <div className="row">
            <div className="col-md-3">
              <FormGroup id="inputNome" label="Nome da espécie: *">
                <input type="text" className="form-control"
                  value={this.state.nome}
                  name="nome"
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
        {!this.props.editar ? <Card title="Todas espécies">
          <div className="col-md-5">
            <EspecieTable editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} especies={this.state.especies} />
          </div>
        </Card> : null}

        <div>
          <Dialog
            visible={this.state.showConfirmDialogDeletar}
            style={{ width: '50vw' }}
            footer={footerDialogDeletar}
            modal={true}
            onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
            Deseja excluir a espécie?
          </Dialog>
          <Dialog
            onChange={e => this.setState({ showConfirmDialogEditar: false })}
            visible={this.state.showConfirmDialogEditar}
            style={{ width: '90vw' }}
            footer={footerDialogEditar}
            modal={true}
            onHide={async () => {
              await this.listarEspecies()
              this.setState({ showConfirmDialogEditar: false })
              console.log(this.state.especies)
            }}>

            <EspeciesHome editar={true} state={this.state.especieAEditar} />

          </Dialog>
        </div>
      </>
    )
  }
}


export default withRouter(EspeciesHome);