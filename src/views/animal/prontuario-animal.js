import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AnimalService from '../../app/service/animalService';
import FormGroup from '../../components/form-group';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Card from '../../components/card'
import AnimalTable from './animalTable';

import * as messages from '../../components/toastr'
import CadastroAnimal from './cadastro-animal';




class ProntuarioAnimal extends React.Component {


  state = {
    busca: '',
    animais: [],
    showConfirmDialogDeletar: false,
    showConfirmDialogEditar: false,
    animalADeletar: {},
    animalAEditar: {},
    message: ''
  }

  constructor() {
    super();
    this.service = new AnimalService();
  }

  abrirConfirmacaoEditar = (animal) => {
    this.setState({ showConfirmDialogEditar: true, animalAEditar: animal })
  }

  abrirConfirmacaoDeletar = (animal) => {
    this.setState({ showConfirmDialogDeletar: true, animalADeletar: animal })
  }

  cancelarDelecao = (animal) => {
    this.setState({ showConfirmDialogDeletar: false, animalADeletar: animal })
  }
  cancelarEdicao = async (animal) => {
    await this.buscar()
    this.setState({ showConfirmDialogEditar: false, animalAEditar: animal })
  }


  buscar = () => {
    this.service.obterPorNome(this.state.busca)
      .then(resposta => {
        this.setState({ animais: resposta.data })
      }).catch(error => {
        console.log(error)
      })
  }

  voltar = () => {
    this.setState({ showConfirmDialogEditar: false })
  }

  deletar = () => {
    this.service.deletar(this.state.animalADeletar.id)
      .then(response => {
        const animais = this.state.animais;
        const index = animais.indexOf(this.state.animalADeletar)
        animais.splice(index, 1);//Remover 1 animal a partir da posição X 
        this.setState({ animais: animais, showConfirmDialogDeletar: false });
        messages.mensagemSucesso("Animal deletado com sucesso!")
      }).catch(erro => {
        messages.mensagemErro(erro.response.data)
      })
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
        <Button style={{ background: "red", border: 0 }} label="Fechar" onClick={this.cancelarEdicao} />
      </div>
    );


    return (
      <>
        <div className="p-3">
          <div className="d-flex flex-row mb-3">
            <div className="col-md-12">
              <FormGroup label="Pesquisar Animal">
                <div className="input-group">
                  <div className="form-outline">
                    <input id="search-input" value={this.state.busca} placeholder="Nome do animal" onChange={e => this.setState({ busca: e.target.value })} type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary" onClick={this.buscar}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>

              <div>
                <AnimalTable animais={this.state.animais} editarAction={this.abrirConfirmacaoEditar} deleteAction={this.abrirConfirmacaoDeletar} />
              </div>
            </div>


          </div>

        </div>
        <div>
          <Dialog
            visible={this.state.showConfirmDialogDeletar}
            style={{ width: '50vw' }}
            footer={footerDialogDeletar}
            modal={true}
            onHide={() => this.setState({ showConfirmDialogDeletar: false })}>
            Deseja excluir o animal?
          </Dialog>

          <Dialog
            onChange={e => this.setState({ showConfirmDialogEditar: false })}
            visible={this.state.showConfirmDialogEditar}
            style={{ width: '90vw' }}
            footer={footerDialogEditar}
            modal={true}
            onHide={() => this.cancelarEdicao()}>
            <Card title="Atualize os dados do animal">
              <CadastroAnimal editar={true} state={this.state.animalAEditar} />
            </Card>
          </Dialog>
        </div>



      </>
    )
  }
}

export default ProntuarioAnimal