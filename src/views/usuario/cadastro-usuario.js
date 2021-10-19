import React from 'react';
import { withRouter } from "react-router-dom";
import UsuarioService from '../../app/service/usuarioService';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';


class CadastroUsuario extends React.Component {

    state = {
        id: null,
        nome: '',
        email: '',
        senha: '',
        tipo: '',
        senhaRepeticao: '',
        tiposUsuario: []
    }

    limpaCampos() {
        Object.keys(this.state).forEach(key => {
            if (key === "tiposUsuario") {
                this.setState({ [key]: [] })
            }
            else {
                this.setState({ [key]: '' })
            }
        })
        this.listarTipos()

    }

    constructor(props) {
        super(props);
        this.service = new UsuarioService();
    }

    componentDidMount() {
        this.listarTipos()
        console.log(this.props.state)
        this.setState(this.props.state)
    }

    async listarTipos() {
        const x = await this.service.getTipos()
        this.setState({ tiposUsuario: x })
    }




    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }



    validar() {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        else if (!this.state.tipo) {
            msgs.push('O campo tipo é obrigatório.')
        }
        else if (this.state.tipo === "Selecione...") {
            msgs.push('O campo tipo é obrigatório.')
        }

        else if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha 2x.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas devem coincidir.')
        }
        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }
        const { nome, senha, tipo } = this.state;
        const usuario = { nome, senha, tipo };


        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso!')
                this.limpaCampos()
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    editar = () => {

        const msgs = this.validar()

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }


        const { nome, senha, tipo } = this.state;
        const usuario = { nome, senha, tipo };

        this.service.editar(this.state.id, usuario)
            .then(response => {
                mensagemSucesso(response)
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="row mb-3">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-6">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input className="form-control" type="text"
                                value={this.state.nome}
                                id="inputNome"
                                maxLength="80"
                                name="nome"
                                onChange={e => this.setState({ nome: e.target.value })}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-12 col-6">
                        <FormGroup id="inputTipos" label="Tipo de Usuário: *">
                            <SelectMenu className="form-control" lista={this.state.tiposUsuario}
                                value={this.state.tipo}

                                name="tipo"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-sm-12 col-md-12 col-6">
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input className="form-control"
                                value={this.state.senha}
                                maxLength="80"
                                type="password"
                                id="inputSenha"
                                name="senha"
                                onChange={e => this.setState({ senha: e.target.value })}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-12 col-md-12 col-6">
                        <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                            <input className="form-control"
                                value={this.state.senhaRepeticao}
                                maxLength="80"
                                type="password"
                                id="inputRepitaSenha"
                                name="senhaRepeticao"
                                onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <div className="d-flex justify-content-end">
                            {console.log("editar", this.props.editar)}
                            <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                        </div>
                    </FormGroup>

                </div>
            </div>


        )
    }
}

export default CadastroUsuario