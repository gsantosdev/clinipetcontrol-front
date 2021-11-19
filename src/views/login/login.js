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
            <>
                <div className="d-flex align-items-center justify-content-center mb-5" style={{ backgroundColor: 'ed' }}>
                    <img src="/logo.png" />
                </div>

                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'ed' }}>
                    <div className="col-sm-12 col-lg-8 col-xl-8 col-xxl-6">
                        <Card title="Login">
                            <FormGroup label="Nome: *" htmlFor="exampleInputNome1">
                                <input type="nome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    maxLength="80"
                                    id="exampleInputNome1" aria-describedby="nomeHelp"
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="ExampleInputPassword1">
                                <input type="password" className="form-control"
                                    value={this.state.senha}
                                    maxLength="80"
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    id="exampleInputPassword1" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <div className="d-flex justify-content-center">
                                    <button onClick={this.entrar} className="btn btn-success" style={{ width: '10rem', height: '10 rem' }}>Entrar</button>
                                </div>
                            </FormGroup>
                        </Card>
                    </div>
                </div>
            </>



        )
    }
}

Login.contextType = AuthContext


export default withRouter(Login);