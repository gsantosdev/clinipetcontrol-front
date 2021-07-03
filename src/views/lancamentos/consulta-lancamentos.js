import React from 'react'
import { withRouter } from 'react-router-dom'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'


import LancamentoService from '../../app/service/lancamentoService'
import localStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {


    editar = (id) => {
        console.log('editando o lancamento ', id)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = (lancamento) => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: lancamento })
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false });
                messages.mensagemSucesso("Lançamento deletado com sucesso!")
            }).catch(erro => {
                messages.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento")
            })
    }



    state = {
        ano: '',
        mes: '',
        status: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório')
            return false;
        }

        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({ lancamentos: resposta.data })
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                    value={this.state.ano} onChange={e => this.setState({ ano: e.target.value })} id="inputAno"
                                    aria-describedby="anoHelp" placeholder="Digite o Ano" />

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control"
                                    lista={meses} />

                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                    value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })} id="inputDescricao"
                                    aria-describedby="descricaoHelp" placeholder="Digite a Descricão" />

                            </FormGroup>



                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                <SelectMenu
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    className="form-control" lista={tipos} />

                            </FormGroup>

                            <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>


                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.abrirConfirmacao}
                                editarAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header=""
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={footer}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}
                    > Confirma a exclusão deste Lançamento?</Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);