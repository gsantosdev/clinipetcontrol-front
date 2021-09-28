import React from 'react';
import { withRouter } from "react-router-dom";
import AuthService from '../../app/service/authService';
import UsuarioService from '../../app/service/usuarioService';
import Card from "../../components/card";
import FormGroup from '../../components/form-group';
import { mensagemErro } from '../../components/toastr';
import { AuthContext } from '../../main/provedorAutenticacao';



class Login extends React.Component {

    state = {
        nome: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    componentDidMount() {
        console.log(AuthService.isUsuarioAutenticado())
        if (AuthService.isUsuarioAutenticado()) {
            this.context.iniciarSessao(AuthService.obterUsuarioAutenticado())
            this.props.history.push('/home')
        }
    }

    entrar = () => {
        this.service.autenticar({
            nome: this.state.nome,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            if (!erro.response) {
                mensagemErro("Erro na conexão com o servidor")
            } else {
                mensagemErro(erro.response.data)
            }
        })
    }


    render() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6" style={{ position: 'relative', left: '200px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Nome: *" htmlFor="exampleInputNome1">
                                            <input type="nome"
                                                value={this.state.nome}
                                                onChange={e => this.setState({ nome: e.target.value })}
                                                className="form-control"
                                                id="exampleInputNome1" aria-describedby="nomeHelp"
                                                placeholder="Digite o Nome" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="ExampleInputPassword1">
                                            <input type="password" className="form-control"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                id="exampleInputPassword1" placeholder="Password" />
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={this.entrar} className="btn btn-success" style={{ width: '10rem', height: '10 rem' }}>Entrar</button>
                                            </div>
                                        </FormGroup>


                                    </fieldset>


                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext


export default withRouter(Login);