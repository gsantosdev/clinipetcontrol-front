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
                <div className="d-flex justify-content-center">
                    <h1 className="display-3">Bem vindo ao CliniPetControl!</h1>
                </div>

                <hr className="my-4" />

            </div>
        )
    }
}

export default Home

