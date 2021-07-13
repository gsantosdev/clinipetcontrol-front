import React from "react";

import UsuarioService from "../app/service/usuarioService";

import localStorageService from "../app/service/localstorageService";

class Home extends React.Component {

    state = {
        numeroClientes: 0
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {

        const usuarioLogado = localStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            console.log(usuarioLogado)
            this.props.history.push('/login')
        }
        else {
            // this.usuarioService
            //     .obterSaldoPorUsuario(usuarioLogado.id)
            //     .then(response => {
            //         this.setState({ saldo: response.data })
            //     }).catch(error => {
            //         console.error(error.response)
            //     })
        }


    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                {/* */}
                <p className="lead">Número de clientes cadastrados:  {this.state.numeroClientes}</p>
                <hr className="my-4" />
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/cliente" role="button">
                        <i className="fa fa-users"></i>  Cadastrar Cliente</a>
                </p>
            </div>
        )
    }
}

export default Home

